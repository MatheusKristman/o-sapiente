import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
      zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null,
    };
  },
});

export const ourFileRouter = {

  profilePhotoUploader: f({ image: { maxFileSize: "2MB" } })
    .input(
      z.object({
        id: z.string().min(1, "É preciso passar o ID do usuário"),
      }),
    )
    .middleware(async ({ req, input }) => {
      return { userId: input.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          profilePhoto: file.url,
        },
      });

      return {};
    }),
  archiveMessage: f({ pdf: { maxFileSize: "2MB" } })
    .input(
      z.object({
        conversationId: z.string().min(1, "É preciso passar o ID da conversa"),
      }),
    )
    .middleware(async ({ req, input }) => {
      const session = await getServerSession();

      if (!session || !session?.user) {
        throw new UploadThingError("Não autorizado");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email!,
        },
      });

      if (!user) {
        throw new UploadThingError("Usuário não encontrado");
      }

      return { userId: user.id, conversationId: input.conversationId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const newMessage = await prisma.message.create({
        data: {
          content: file.url,
          imageUrl: "",
          fileUrl: file.url,
          fileName: file.name,
          videoUrl: "",
          conversation: {
            connect: {
              id: metadata.conversationId,
            },
          },
          sender: {
            connect: {
              id: metadata.userId,
            },
          },
          seen: {
            connect: {
              id: metadata.userId,
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
          id: metadata.conversationId,
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

      await pusherServer.trigger(
        metadata.conversationId,
        "messages:new",
        newMessage,
      );

      const lastMessage =
        updatedConversation.messages[updatedConversation.messages.length - 1];

      updatedConversation.users.forEach((user) => {
        pusherServer.trigger(user.email!, "conversation:update", {
          id: metadata.conversationId,
          messages: [lastMessage],
        });
      });

      return {};
    }),
  imageMessage: f({ image: { maxFileSize: "2MB" } })
    .input(
      z.object({
        conversationId: z.string().min(1, "É preciso passar o ID da conversa"),
      }),
    )
    .middleware(async ({ req, input }) => {
      const session = await getServerSession();

      if (!session || !session?.user) {
        throw new UploadThingError("Não autorizado");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email!,
        },
      });

      if (!user) {
        throw new UploadThingError("Usuário não encontrado");
      }

      return { userId: user.id, conversationId: input.conversationId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const newMessage = await prisma.message.create({
        data: {
          content: file.url,
          imageUrl: file.url,
          fileUrl: "",
          fileName: "",
          videoUrl: "",
          conversation: {
            connect: {
              id: metadata.conversationId,
            },
          },
          sender: {
            connect: {
              id: metadata.userId,
            },
          },
          seen: {
            connect: {
              id: metadata.userId,
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
          id: metadata.conversationId,
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

      await pusherServer.trigger(
        metadata.conversationId,
        "messages:new",
        newMessage,
      );

      const lastMessage =
        updatedConversation.messages[updatedConversation.messages.length - 1];

      updatedConversation.users.forEach((user) => {
        pusherServer.trigger(user.email!, "conversation:update", {
          id: metadata.conversationId,
          messages: [lastMessage],
        });
      });

      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
