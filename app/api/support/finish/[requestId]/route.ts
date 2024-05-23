import { AccountRole } from "@prisma/client";

import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";

export async function PUT(
  req: Request,
  { params }: { params: { requestId: string } },
) {
  try {
    const { previousStatus } = await req.json();
    const currentUser = await getCurrentUser();
    const requestId = params.requestId;
    let requests;

    if (!currentUser) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: previousStatus,
        previousStatus: null,
      },
    });

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

      return Response.json({ requests, message: "" }, { status: 200 });
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

      return Response.json(requests, { status: 200 });
    }

    return new Response("Não autorizado", { status: 401 });
  } catch (error) {
    console.log("[ERROR_ON_SUPPORT_FINISH]", error);

    return new Response(
      "Ocorreu um erro ao finalizar o suporte da solicitação",
      { status: 500 },
    );
  }
}
