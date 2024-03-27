import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { User } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Usuário não encontrado", { status: 401 });
    }

    const { message, editedMessage } = await req.json();

    if (!editedMessage || !message?.id) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: message.id,
      },
      data: {
        content: editedMessage,
      },
      include: {
        conversation: true,
        sender: true,
        seen: true,
      },
    });

    if (!updatedMessage) {
      return new Response("Erro ao localizar a mensagem", { status: 404 });
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
      return new Response("Erro ao localizar a conversa", { status: 404 });
    }

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

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

    return new Response("Mensagem editada com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_EDIT_MESSAGE]", error);

    return new Response("Ocorreu um erro ao editar a mensagem", {
      status: 500,
    });
  }
}
