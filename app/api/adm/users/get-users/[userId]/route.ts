import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const userIsAdmin = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userIsAdmin || userIsAdmin.accountType !== AccountRole.ADMIN) {
      return new Response("Não autorizado", { status: 400 });
    }

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

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_GET_USERS_ADM]", error);

    return new Response("Ocorreu um erro ao resgatar os usuários cadastrados", {
      status: 500,
    });
  }
}
