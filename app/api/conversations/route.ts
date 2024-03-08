import getCurrentUser from "@/app/action/getCurrentUser";

import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, requestId, members } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Não autorizado", { status: 400 });
    }

    if (!members || members.length < 2) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        requestId,
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return Response.json(singleConversation);
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
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return Response.json(newConversation);
  } catch (error) {
    console.log("[ERROR_CONVERSATION]", error);

    return new Response("Erro interno", { status: 500 });
  }
}
