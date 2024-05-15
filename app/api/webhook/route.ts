// TODO: rota de webhook temporária para teste

import nodemailer from "nodemailer";
import { AccountRole, Status } from "@prisma/client";
import { render } from "@react-email/render";

import { EmailAdminNewLesson } from "@/emails/EmailAdminNewLesson";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

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

    if (body.type === "order.paid") {
      const offerId = body.data.items[0].code;
      const metadata = body.data.customer.metadata;

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
            certificateRequested: JSON.parse(metadata.certificateRequested),
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
                accountType: true,
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

        const student = request.users.filter(
          (user) => user.accountType === AccountRole.STUDENT
        )[0];
        const professor = request.users.filter(
          (user) => user.accountType === AccountRole.PROFESSOR
        )[0];

        const options = generateEmailOptions({
          emailUser,
          lessonDate: offer.lessonDate,
          lessonPrice: offer.lessonPrice,
          certificateRequested: JSON.parse(metadata.certificateRequested),
          studentName: `${student.firstName} ${student.lastName}`,
          studentContact: student.tel!,
          professorName: `${professor.firstName} ${professor.lastName}`,
          professorContact: professor.tel!,
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
          certificateRequested: JSON.parse(metadata.certificateRequested),
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
              accountType: true,
            },
          },
        },
      });

      newConversation.users.map((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      const student = requestUpdated.users.filter(
        (user) => user.accountType === AccountRole.STUDENT
      )[0];
      const professor = requestUpdated.users.filter(
        (user) => user.accountType === AccountRole.PROFESSOR
      )[0];

      const options = generateEmailOptions({
        emailUser,
        lessonDate: offer.lessonDate,
        lessonPrice: offer.lessonPrice,
        certificateRequested: JSON.parse(metadata.certificateRequested),
        studentName: `${student.firstName} ${student.lastName}`,
        studentContact: student.tel!,
        professorName: `${professor.firstName} ${professor.lastName}`,
        professorContact: professor.tel!,
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
