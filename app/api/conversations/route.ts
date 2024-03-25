import getCurrentUser from "@/app/action/getCurrentUser";

import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { otherUserId, requestId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Não autorizado", { status: 400 });
    }

    if (!otherUserId || !requestId) {
      return new Response("Dados inválidos", { status: 404 });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        requestId,
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

    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        isOfferAccepted: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return Response.json({ id: newConversation.id });
  } catch (error) {
    console.log("[ERROR_CONVERSATION]", error);

    return new Response("Erro interno", { status: 500 });
  }
}
