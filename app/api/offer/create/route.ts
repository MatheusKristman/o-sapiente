import getSession from "@/app/action/getSession";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { message, requestId } = await req.json();
    const session = await getSession();

    if (!session?.user?.email || !message || !requestId) {
      return new Response("Dados inválidos", { status: 404 });
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
        accountType: AccountRole.PROFESSOR,
      },
    });

    if (!currentUser) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const offer = await prisma.offer.create({
      data: {
        message,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        request: {
          connect: {
            id: requestId,
          },
        },
      },
    });

    return Response.json(offer, {
      status: 200,
    });
  } catch (error) {
    console.log("[ERROR_CREATE_OFFER]");

    return new Response("Erro ao criar oferta", { status: 500 });
  }
}
