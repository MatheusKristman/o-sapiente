import { NextResponse, NextRequest } from "next/server";
import { Message } from "@prisma/client";

import { prisma } from "@/libs/prismadb";

const MESSAGES_BATCH = 10;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const requestId = searchParams.get("requestId");
        const profileId = searchParams.get("profileId");

        if (!profileId) {
            return new NextResponse("ID do perfil não encontrado", { status: 404 });
        }

        const profile = await prisma.user.findUnique({
            where: {
                id: profileId,
            },
        });

        if (!profile) {
            return new NextResponse("Não autorizado", { status: 401 });
        }

        if (!requestId) {
            return new NextResponse("ID da solicitação não encontrado", { status: 404 });
        }

        let messages: Message[] = [];

        if (cursor) {
            messages = await prisma.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    requestId,
                },
                include: {
                    sender: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        } else {
            messages = await prisma.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    requestId,
                },
                include: {
                    sender: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }

        let nextCursor = null;

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor,
        });
    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Ocorreu um erro durante a requisição das mensagens", {
            status: 500,
        });
    }
}
