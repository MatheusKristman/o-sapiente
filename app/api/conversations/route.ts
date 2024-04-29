import getCurrentUser from "@/app/action/getCurrentUser";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { Status } from "@prisma/client";
import { EmailAdminNewLesson } from "@/emails/EmailAdminNewLesson";

export async function POST(request: Request) {
    try {
        const emailHost: string = process.env.EMAIL_SMTP!;
        const emailUser: string = process.env.EMAIL_USER!;
        const emailPass: string = process.env.EMAIL_PASS!;
        const emailPort: number = Number(process.env.EMAIL_PORT!);
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { otherUserId, requestId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new Response("Não autorizado", { status: 400 });
        }

        if (!otherUserId || !requestId) {
            return new Response("Dados inválidos", { status: 404 });
        }

        const transport = nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const emailHtml = render(EmailAdminNewLesson());

        const options = {
            from: emailUser,
            to: emailUser,
            subject: "Nova aula criada - O Sapiente",
            html: emailHtml,
        };

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, otherUserId],
                        },
                    },
                    {
                        userIds: {
                            equals: [otherUserId, currentUser.id],
                        },
                    },
                ],
            },
            include: {
                users: true,
            },
        });

        const singleConversation = existingConversation[0];

        if (singleConversation) {
            await prisma.request.update({
                where: {
                    id: requestId,
                },
                data: {
                    isOfferAccepted: true,
                    status: Status.inProgress,
                    beginLessonDate: new Date(),
                    users: {
                        connect: {
                            id: otherUserId,
                        },
                    },
                    conversation: {
                        connect: {
                            id: singleConversation.id,
                        },
                    },
                },
            });

            singleConversation.users.map((user) => {
                if (user.email) {
                    pusherServer.trigger(
                        user.email,
                        "conversation:new",
                        singleConversation,
                    );
                }
            });

            transport.sendMail(options, (error) => {
                if (error) {
                    console.log("[ERROR_ON_CONVERSATION]", error);

                    return new Response(
                        "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
                        {
                            status: 400,
                        },
                    );
                }
            });

            return Response.json({ id: singleConversation.id });
        }

        const newConversation = await prisma.conversation.create({
            data: {
                request: {
                    connect: {
                        id: requestId,
                    },
                },
                users: {
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: otherUserId,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        });

        if (!newConversation) {
            return new Response("Ocorreu um erro na criação da conversa", {
                status: 401,
            });
        }

        await prisma.request.update({
            where: {
                id: requestId,
            },
            data: {
                isOfferAccepted: true,
                status: Status.inProgress,
                beginLessonDate: new Date(),
                users: {
                    connect: {
                        id: otherUserId,
                    },
                },
                conversation: {
                    connect: {
                        id: newConversation.id,
                    },
                },
            },
        });

        newConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(
                    user.email,
                    "conversation:new",
                    newConversation,
                );
            }
        });

        transport.sendMail(options, (error) => {
            if (error) {
                console.log("[ERROR_ON_CONVERSATION]", error);

                return new Response(
                    "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
                    {
                        status: 400,
                    },
                );
            }
        });

        return Response.json({ id: newConversation.id });
    } catch (error) {
        console.log("[ERROR_CONVERSATION]", error);

        return new Response("Erro interno", { status: 500 });
    }
}
