import { prisma } from "@/libs/prismadb";

const getMessages = async (conversationId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        console.log(
            messages[messages.length - 1].content,
            "| carregou mensagem da função",
        );

        return messages;
    } catch (error) {
        return [];
    }
};

export default getMessages;
