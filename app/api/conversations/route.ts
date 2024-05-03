import getCurrentUser from "@/app/action/getCurrentUser";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { Status } from "@prisma/client";
import { EmailAdminNewLesson } from "@/emails/EmailAdminNewLesson";

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

export async function POST(request: Request) {
  try {
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      otherUserId,
      requestId,
      lessonDate,
      lessonPrice,
      certificateRequested,
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Não autorizado", { status: 400 });
    }

    if (!otherUserId || !requestId) {
      return new Response("Dados inválidos", { status: 404 });
    }

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, otherUserId],
            },
          },
          {
            userIds: {
              equals: [otherUserId, currentUser.id],
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
          id: requestId,
        },
        data: {
          isOfferAccepted: true,
          status: Status.inProgress,
          beginLessonDate: new Date(),
          lessonDate,
          lessonPrice,
          users: {
            connect: {
              id: otherUserId,
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
        lessonDate,
        lessonPrice,
        certificateRequested: JSON.parse(certificateRequested),
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

      return Response.json({ id: singleConversation.id });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        request: {
          connect: {
            id: requestId,
          },
        },
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: otherUserId,
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
        id: requestId,
      },
      data: {
        isOfferAccepted: true,
        status: Status.inProgress,
        beginLessonDate: new Date(),
        users: {
          connect: {
            id: otherUserId,
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
      lessonDate,
      lessonPrice,
      certificateRequested: JSON.parse(certificateRequested),
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

    return Response.json({ id: newConversation.id });
  } catch (error) {
    console.log("[ERROR_CONVERSATION]", error);

    return new Response("Erro interno", { status: 500 });
  }
}
