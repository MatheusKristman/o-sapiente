import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { AccountRole, Status } from "@prisma/client";

import EmailRequestSupport from "@/emails/EmailRequestSupport";
import { prisma } from "@/libs/prismadb";
import getCurrentUser from "@/app/action/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { requestId: string } },
) {
  try {
    const { subject, message } = await req.json();
    const requestId = params.requestId;
    const currentUser = await getCurrentUser();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const emailAdmin: string = process.env.EMAIL_ADMIN!;
    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
    let requests;

    if (!currentUser) {
      return new Response("Usuário não encontrado", { status: 401 });
    }

    if (!subject || !message || !requestId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const currentRequest = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!currentRequest) {
      return new Response("Solicitação não encontrada");
    }

    const request = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: Status.support,
        previousStatus: currentRequest.status,
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            tel: true,
          },
        },
      },
    });

    if (!request) {
      return new Response("Solicitação não encontrada", { status: 404 });
    }

    const emailHtml = render(
      EmailRequestSupport({
        message,
        lessonDate: request.lessonDate,
        lessonPrice: request.lessonPrice,
        certificateRequested: request.certificateRequested,
        studentName: `${request.users[0].firstName} ${request.users[0].lastName}`,
        studentContact: request.users[0].tel!,
        professorName: `${request.users[1].firstName} ${request.users[1].lastName}`,
        professorContact: request.users[1].tel!,
      }),
    );

    const options = {
      from: emailUser,
      bcc: [emailUser, emailAdmin],
      subject: `Nova mensagem de suporte - Assunto: ${subject} - O Sapiente`,
      html: emailHtml,
    };

    await transport.sendMail(options);

    if (currentUser.accountType === AccountRole.PROFESSOR) {
      requests = await prisma.request.findMany({
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              tel: true,
              accountType: true,
              profilePhoto: true,
              subjectIds: true,
              requestIds: true,
              seenMessageIds: true,
            },
          },
          usersVotedToFinish: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              tel: true,
              accountType: true,
              profilePhoto: true,
              subjectIds: true,
              requestIds: true,
              seenMessageIds: true,
            },
          },
          offers: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  profilePhoto: true,
                },
              },
            },
          },
        },
      });

      if (!requests) {
        return new Response("Nenhuma solicitação foi encontrada", {
          status: 404,
        });
      }

      return Response.json(
        {
          requests,
          message: "Mensagem enviada para o suporte, aguarde o contato",
        },
        { status: 200 },
      );
    }

    if (currentUser.accountType === AccountRole.STUDENT) {
      requests = await prisma.request.findMany({
        where: {
          userIds: {
            has: currentUser.id,
          },
        },
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              accountType: true,
              profilePhoto: true,
              subjectIds: true,
              requestIds: true,
              seenMessageIds: true,
            },
          },
          offers: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  profilePhoto: true,
                },
              },
            },
          },
        },
      });

      if (!requests) {
        return new Response("Nenhuma solicitação foi encontrada", {
          status: 404,
        });
      }

      return Response.json(
        {
          requests,
          message: "Mensagem enviada para o suporte, aguarde o contato",
        },
        { status: 200 },
      );
    }

    return new Response("Não autorizado", {
      status: 401,
    });
  } catch (error) {
    console.log("[ERROR_ON_REQUEST_SUPPORT]", error);

    return new Response("Ocorreu um erro ao enviar mensagem de suporte", {
      status: 500,
    });
  }
}
