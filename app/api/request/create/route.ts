import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { subject, description, email } = await body;

        if (!subject || !description || !email) {
            return new NextResponse(
                "Dados inválidos, verifique e tente novamente",
                { status: 401 },
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
                accountType: AccountRole.STUDENT,
            },
        });

        if (!user) {
            return new NextResponse("Usuário não encontrado", { status: 404 });
        }

        await prisma.request.create({
            data: {
                subject,
                description,
                userIds: [user.id],
            },
        });

        const newRequests = await prisma.request.findMany({
            where: {
                userIds: {
                    has: user.id,
                },
            },
            include: {
                users: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        accountType: true,
                        profilePhoto: true,
                        subjectIds: true,
                        requestIds: true,
                        seenMessageIds: true,
                    },
                },
                offers: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                profilePhoto: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({ sended: true, requests: newRequests });
    } catch (error) {
        console.log("[ERROR_POST_REQUEST]", error);
        return new NextResponse("Ocorreu um erro na solicitação do pedido", {
            status: 400,
        });
    }
}
