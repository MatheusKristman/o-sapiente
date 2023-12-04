import { prisma } from "@/libs/prismadb";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { messageId, requestId, email } = req.query;
        const { content } = req.body;

        if (!email) {
            return res.status(401).json({ error: "Não autorizado" });
        }

        const profile = await prisma.user.findUnique({
            where: {
                email: email as string,
            },
        });

        if (!profile) {
            return res.status(401).json({ error: "Não autorizado" });
        }

        if (!requestId) {
            return res.status(401).json({ error: "ID da solicitação não encontrado" });
        }

        const request = await prisma.request.findFirst({
            where: {
                id: requestId as string,
            },
        });

        if (!request) {
            return res.status(404).json({ error: "Solicitação não encontrada" });
        }

        let message = await prisma.message.findFirst({
            where: {
                id: messageId as string,
                requestId: requestId as string,
            },
            include: {
                sender: true,
            },
        });

        if (!message) {
            return res.status(404).json({ error: "Mensagem não encontrada" });
        }

        const isMessageOwner = message.senderId === profile.id;

        if (!isMessageOwner) {
            return res.status(401).json({ error: "Não autorizado" });
        }

        // criar função para deletar mensagem
        // criar função para editar a mensagem

        const updateKey = `chat:${requestId}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGES_ID]", error);
        return res
            .status(500)
            .json({ error: "Ocorreu um erro durante a requisição das mensagens" });
    }
}
