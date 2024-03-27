import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { message, image, video, conversationId } = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    if (!conversationId) {
      return new Response("ID Inválido", { status: 404 });
    }

    const newMessage = await prisma.message.create({
      data: {
        content: message,
        imageUrl: image,
        videoUrl: video,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return Response.json(newMessage);
  } catch (error) {
    console.log("[ERROR_MESSAGE]", error);

    return new Response("Ocorreu um erro no envio da mensagem", {
      status: 500,
    });
  }
}
