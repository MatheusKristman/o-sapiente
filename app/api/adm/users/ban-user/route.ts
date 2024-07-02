import { AccountRole, Status } from "@prisma/client";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import EmailUserBaned from "@/emails/EmailUserBaned";
import { prisma } from "@/libs/prismadb";
import EmailRequestDeleted from "@/emails/EmailRequestDeleted";

export async function POST(req: Request) {
  try {
    const { adminId, userId } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);

    if (!userId || !adminId) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const admin = await prisma.user.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin || admin.accountType !== AccountRole.ADMIN) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const userSelected = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        requests: true,
      },
    });

    if (!userSelected) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: userSelected.id,
          },
        },
      },
    });

    if (conversations.length > 0) {
      const conversationIds = conversations.map(
        (conversation) => conversation.id,
      );

      const messages = await prisma.message.findMany({
        where: {
          conversationId: {
            in: conversationIds,
          },
        },
      });

      if (messages.length > 0) {
        await prisma.message.deleteMany({
          where: {
            conversationId: {
              in: conversationIds,
            },
          },
        });
      }

      await prisma.conversation.deleteMany({
        where: {
          users: {
            some: {
              id: userSelected.id,
            },
          },
        },
      });
    }

    if (userSelected.accountType === AccountRole.STUDENT) {
      const requestIds = userSelected.requests.map((request) => request.id);

      await prisma.request.deleteMany({
        where: {
          id: {
            in: requestIds,
          },
        },
      });

      const transport = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const emailHtml = render(
        EmailRequestDeleted({
          userName: `${userSelected.firstName} ${userSelected.lastName}`,
        }),
      );

      const options = {
        from: emailUser,
        to: userSelected.email,
        subject: "Solicitação removida - O Sapiente",
        html: emailHtml,
      };

      await transport.sendMail(options);
    }

    if (userSelected.accountType === AccountRole.PROFESSOR) {
      await prisma.request.updateMany({
        where: {
          users: {
            some: {
              id: userSelected.id,
            },
          },
        },
        data: {
          status: Status.searchingProfessor,
          isConcluded: false,
          isOfferAccepted: false,
          beginLessonDate: null,
          finishLessonDate: null,
          lessonDate: null,
          lessonPrice: null,
          certificateRequested: false,
          conversationId: null,
          usersIdsVotedToFinish: [],
        },
      });

      await prisma.user.update({
        where: {
          id: userSelected.id,
        },
        data: {
          requests: {
            set: [],
          },
        },
      });
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const emailHtml = render(
      EmailUserBaned({
        userName: `${deletedUser.firstName} ${deletedUser.lastName}`,
        banDate: new Date(),
      }),
    );

    const options = {
      from: emailUser,
      to: deletedUser.email,
      subject: "Conta banida - O Sapiente",
      html: emailHtml,
    };

    await transport.sendMail(options);

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          accountType: AccountRole.ADMIN,
        },
      },
      include: {
        requests: {
          select: {
            id: true,
            subject: true,
            description: true,
            createdAt: true,
            status: true,
            beginLessonDate: true,
            lessonDate: true,
            lessonPrice: true,
            certificateRequested: true,
            users: true,
          },
        },
      },
    });

    const newRequests = await prisma.request.findMany({
      include: {
        users: true,
      },
    });

    return Response.json({ users, requests: newRequests }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_ADMIN_BAN_USER]", error);

    return new Response("Ocorreu um erro ao banir o usuário", { status: 400 });
  }
}
