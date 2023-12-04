import { prisma } from "@/libs/prismadb";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metodo não permitido" });
    }

    try {
        const { content, fileUrl, email } = req.body;
        const { requestId } = req.query;

        const profile = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!profile) {
            return res.status(401).json({ error: "Não autorizado" });
        }

        if (!requestId) {
            return res.status(401).json({ error: "ID da solicitação não encontrada" });
        }

        if (!content) {
            return res.status(400).json({ error: "Conteudo não encontrado" });
        }

        const request = await prisma.request.findFirst({
            where: {
                id: requestId as string,
            },
        });

        if (!request) {
            return res.status(404).json({ message: "Solicitação não encontrada" });
        }

        const message = await prisma.message.create({
            data: {
                content,
                fileUrl,
                requestId: request.id,
                senderId: profile.id,
                seenIds: [profile.id],
            },
            include: {
                sender: true,
            },
        });

        const requestKey = `chat:${requestId}:messages`;

        res?.socket?.server?.io?.emit(requestKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("MESSAGES_POST", error);
        return res.status(500).json({ message: "Ocorreu um erro durante o envio da mensagem" });
    }
}
