// PAGAMENTO CRIADO
// webhook:  {
//   id: 'hook_4Bw5xoEDS1H0MZn6',
//   account: { id: 'acc_b2QpJ4JfYGIjPNa4', name: 'O Sapiente - test' },
//   type: 'order.created',
//   created_at: '2024-05-14T20:48:04.527Z',
//   data: {
//     id: 'or_ynKJoQ5SD8u2ogR0',
//     code: 'YJ4RB5XAW0',
//     amount: 1000,
//     currency: 'BRL',
//     closed: true,
//     items: [ [Object] ],
//     customer: {
//       id: 'cus_Ga4nprOIq5fwpXZM',
//       name: 'Matheus Kristman',
//       email: 'kristman058@gmail.com',
//       code: '663181530801d826e599d1b4',
//       document: '46283551858',
//       type: 'individual',
//       delinquent: false,
//       address: [Object],
//       created_at: '2024-05-09T18:28:53',
//       updated_at: '2024-05-14T20:48:03',
//       birthdate: '1998-01-31T02:00:00',
//       phones: [Object]
//     },
//     status: 'failed',
//     created_at: '2024-05-14T20:48:03',
//     updated_at: '2024-05-14T20:48:04',
//     closed_at: '2024-05-14T20:48:03',
//     charges: [ [Object] ],
//     checkouts: []
//   }
// }

import getCurrentUser from "@/app/action/getCurrentUser";
import { EmailAdminNewLesson } from "@/emails/EmailAdminNewLesson";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { Status } from "@prisma/client";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

// DEPOIS DO PAGAMENTO
// webhook:  {
//   id: 'hook_qrXp4n8c2I1wJnb3',
//   account: { id: 'acc_b2QpJ4JfYGIjPNa4', name: 'O Sapiente - test' },
//   type: 'order.payment_failed',
//   created_at: '2024-05-14T20:48:04.51Z',
//   data: {
//     id: 'or_ynKJoQ5SD8u2ogR0',
//     code: 'YJ4RB5XAW0',
//     amount: 1000,
//     currency: 'BRL',
//     closed: true,
//     items: [ [Object] ],
//     customer: {
//       id: 'cus_Ga4nprOIq5fwpXZM',
//       name: 'Matheus Kristman',
//       email: 'kristman058@gmail.com',
//       code: '663181530801d826e599d1b4',
//       document: '46283551858',
//       type: 'individual',
//       delinquent: false,
//       address: [Object],
//       created_at: '2024-05-09T18:28:53',
//       updated_at: '2024-05-14T20:48:03',
//       birthdate: '1998-01-31T02:00:00',
//       phones: [Object]
//     },
//     status: 'failed',
//     created_at: '2024-05-14T20:48:03',
//     updated_at: '2024-05-14T20:48:04',
//     closed_at: '2024-05-14T20:48:03',
//     charges: [ [Object] ],
//     checkouts: []
//   }
// }

interface IGenerateEmailOptions {
  emailUser: string;
  lessonDate: Date;
  lessonPrice: number;
  certificateRequested: boolean;
  studentName: string;
  studentContact: string;
  professorName: string;
  professorContact: string;
}

function generateEmailOptions({
  emailUser,
  lessonDate,
  lessonPrice,
  certificateRequested,
  studentName,
  studentContact,
  professorName,
  professorContact,
}: IGenerateEmailOptions) {
  const emailHtml = render(
    EmailAdminNewLesson({
      lessonDate,
      lessonPrice,
      certificateRequested,
      studentName,
      studentContact,
      professorName,
      professorContact,
    })
  );

  return {
    from: emailUser,
    to: emailUser,
    subject: "Nova aula criada - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body.data.items[0]);

    if (body.type === "order.paid") {
      const offerId = body.data.items[0].code;
      const metadata = body.data.charges[0].last_transaction.metadata;
      const emailHost: string = process.env.EMAIL_SMTP!;
      const emailUser: string = process.env.EMAIL_USER!;
      const emailPass: string = process.env.EMAIL_PASS!;
      const emailPort: number = Number(process.env.EMAIL_PORT!);

      const transport = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const offer = await prisma.offer.findUnique({
        where: {
          id: offerId,
        },
        include: {
          request: true,
        },
      });

      if (!offer) {
        return new Response("Ocorreu um erro ao confirmar o pagamento");
      }

      const existingConversation = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [offer.request.userIds[0], offer.userId],
              },
            },
            {
              userIds: {
                equals: [offer.userId, offer.request.userIds[0]],
              },
            },
          ],
        },
        include: {
          users: true,
        },
      });

      const singleConversation = existingConversation[0];

      if (singleConversation) {
        const request = await prisma.request.update({
          where: {
            id: offer.requestId,
          },
          data: {
            isOfferAccepted: true,
            status: Status.inProgress,
            beginLessonDate: new Date(),
            lessonDate: offer.lessonDate,
            lessonPrice: offer.lessonPrice,
            certificateRequested: metadata.certificateRequested,
            users: {
              connect: {
                id: offer.userId,
              },
            },
            conversation: {
              connect: {
                id: singleConversation.id,
              },
            },
          },
          include: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                tel: true,
              },
            },
          },
        });

        if (!request) {
          return new Response("Ocorreu um erro ao atualizar a solicitação", {
            status: 400,
          });
        }

        singleConversation.users.map((user) => {
          if (user.email) {
            pusherServer.trigger(
              user.email,
              "conversation:new",
              singleConversation
            );
          }
        });

        const options = generateEmailOptions({
          emailUser,
          lessonDate: offer.lessonDate,
          lessonPrice: offer.lessonPrice,
          certificateRequested: JSON.parse(metadata.certificateRequested),
          studentName: `${request.users[0].firstName} ${request.users[0].lastName}`,
          studentContact: request.users[0].tel!,
          professorName: `${request.users[1].firstName} ${request.users[1].lastName}`,
          professorContact: request.users[1].tel!,
        });

        transport.sendMail(options, (error) => {
          if (error) {
            console.log("[ERROR_ON_CONVERSATION]", error);

            return new Response(
              "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
              {
                status: 400,
              }
            );
          }
        });

        return new Response("Webhook de pagamento da aula confirmado.", {
          status: 200,
        });
      }

      const newConversation = await prisma.conversation.create({
        data: {
          request: {
            connect: {
              id: offer.requestId,
            },
          },
          users: {
            connect: [
              {
                id: offer.request.userIds[0],
              },
              {
                id: offer.userId,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      if (!newConversation) {
        return new Response("Ocorreu um erro na criação da conversa", {
          status: 401,
        });
      }

      const requestUpdated = await prisma.request.update({
        where: {
          id: offer.requestId,
        },
        data: {
          isOfferAccepted: true,
          status: Status.inProgress,
          beginLessonDate: new Date(),
          certificateRequested: metadata.certificateRequested,
          users: {
            connect: {
              id: offer.userId,
            },
          },
          conversation: {
            connect: {
              id: newConversation.id,
            },
          },
        },
        include: {
          users: {
            select: {
              firstName: true,
              lastName: true,
              tel: true,
            },
          },
        },
      });

      newConversation.users.map((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      const options = generateEmailOptions({
        emailUser,
        lessonDate: offer.lessonDate,
        lessonPrice: offer.lessonPrice,
        certificateRequested: JSON.parse(metadata.certificateRequested),
        studentName: `${requestUpdated.users[0].firstName} ${requestUpdated.users[0].lastName}`,
        studentContact: requestUpdated.users[0].tel!,
        professorName: `${requestUpdated.users[1].firstName} ${requestUpdated.users[1].lastName}`,
        professorContact: requestUpdated.users[1].tel!,
      });

      transport.sendMail(options, (error) => {
        if (error) {
          console.log("[ERROR_ON_CONVERSATION]", error);

          return new Response(
            "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
            {
              status: 400,
            }
          );
        }
      });

      return new Response("Webhook de pagamento da aula confirmado.", {
        status: 200,
      });
    }

    if (
      body.type === "order.payment_failed" ||
      body.type === "order.canceled"
    ) {
      const offerId = body.data.items[0].code;

      const offer = await prisma.offer.findUnique({
        where: {
          id: offerId,
        },
        include: {
          request: true,
        },
      });

      if (!offer) {
        return new Response("Ocorreu um erro ao negar o pagamento", {
          status: 401,
        });
      }

      const request = await prisma.request.update({
        where: {
          id: offer.requestId,
        },
        data: {
          isOfferAccepted: false,
          status: Status.searchingProfessor,
          beginLessonDate: null,
          lessonDate: null,
          lessonPrice: null,
          certificateRequested: false,
        },
      });

      if (!request) {
        return new Response("Ocorreu um erro ao negar o pagamento", {
          status: 401,
        });
      }

      return new Response("Webhook de pagamento negado", { status: 200 });
    }
  } catch (error) {
    console.log("[ERROR_ON_WEBHOOK]", error);

    return new Response("Ocorreu um erro no webhook", { status: 500 });
  }
}
