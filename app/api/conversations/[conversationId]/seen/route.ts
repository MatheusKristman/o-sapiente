import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new Response("ID Inválido", { status: 401 });
    }

    const lastMessage =
      conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return Response.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: {
          select: {
            email: true,
            firstName: true,
            id: true,
            lastName: true,
          },
        },
        seen: {
          select: {
            email: true,
            firstName: true,
            id: true,
            lastName: true,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [lastMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return Response.json(conversation);
    }

    console.log(updatedMessage);

    await pusherServer.trigger(
      conversationId!,
      "messages:update",
      updatedMessage,
    );

    return new Response("Visualizado com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_CONVERSATION_SEEN]", error);

    return new Response("Ocorreu um erro ao visualizar a mensagem!", {
      status: 500,
    });
  }
}
