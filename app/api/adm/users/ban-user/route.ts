import { prisma } from "@/libs/prismadb";
import { AccountRole, Status } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { adminId, userId } = await req.json();

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

    if (userSelected.accountType === AccountRole.STUDENT) {
      const requestIds = userSelected.requests.map((request) => request.id);

      await prisma.request.deleteMany({
        where: {
          id: {
            in: requestIds,
          },
        },
      });
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

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

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
