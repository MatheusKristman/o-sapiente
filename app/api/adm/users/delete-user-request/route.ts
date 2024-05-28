import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const { userId, requestId } = await req.json();
    const session = getServerSession();

    if (!userId || !requestId) {
      return new Response("Dados inválidos", { status: 400 });
    }

    if (!session) {
      return new Response("Não autorizado", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.accountType !== AccountRole.ADMIN) {
      return new Response("Não autorizado", { status: 401 });
    }

    const requests = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
      include: {
        offers: true,
      },
    });

    if (!requests) {
      return new Response("Solicitação não encontrada", { status: 404 });
    }

    const offerIds = requests.offers.map((offer) => offer.id);

    await prisma.offer.deleteMany({
      where: {
        id: {
          in: offerIds,
        },
      },
    });

    await prisma.request.delete({
      where: {
        id: requestId,
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

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_ADMIN_DELETE_USER_REQUEST]", error);

    return new Response("Ocorreu um erro ao deletar a solicitação do usuário", {
      status: 500,
    });
  }
}
