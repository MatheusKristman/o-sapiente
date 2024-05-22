import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const { messageId } = await req.json();

    if (!messageId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        content: "[Mensagem excluída]",
        isDeleted: true,
      },
      include: {
        conversation: true,
        sender: true,
        seen: true,
      },
    });

    if (!updatedMessage) {
      return new Response("Erro ao localizar a mensagem", {
        status: 404,
      });
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: updatedMessage.conversationId,
      },
      data: {
        lastMessageAt: new Date(),
      },
      include: {
        users: true,
        messages: true,
      },
    });

    if (!updatedConversation) {
      return new Response("Erro ao localizar a conversa", {
        status: 404,
      });
    }

    const lastMessage =
      updatedConversation.messages[
      updatedConversation.messages.length - 1
      ];

    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(user.email, "conversation:update", {
        id: updatedConversation.id,
        messages: [lastMessage],
      });
    });

    await pusherServer.trigger(
      updatedConversation.id,
      "messages:update",
      updatedMessage,
    );

    return new Response("Mensagem deletada com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_DELETE_MESSAGE]", error);

    return new Response("Ocorreu um erro ao deletar a mensagem", {
      status: 500,
    });
  }
}
