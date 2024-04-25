import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { Status } from "@prisma/client";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { requestId } = body;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new Response("Usuário não encontrado", { status: 404 });
        }

        const requests = await prisma.request.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        tel: true,
                        accountType: true,
                        profilePhoto: true,
                        subjectIds: true,
                        requestIds: true,
                        seenMessageIds: true,
                    },
                },
                usersVotedToFinish: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        tel: true,
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

        const requestFiltered = requests.filter(
            (request) => request.id === requestId,
        )[0];

        if (
            requestFiltered.usersIdsVotedToFinish.length === 2 ||
            requestFiltered.isConcluded
        ) {
            return new Response("Solicitação já foi finalizada", {
                status: 401,
            });
        }

        const requestUpdated = await prisma.request.update({
            where: {
                id: requestId,
            },
            data: {
                isConcluded: requestFiltered.usersIdsVotedToFinish.length === 1,
                status:
                    requestFiltered.usersIdsVotedToFinish.length === 1
                        ? Status.finished
                        : Status.finishing,
                finishLessonDate:
                    requestFiltered.usersIdsVotedToFinish.length === 1
                        ? new Date()
                        : null,
                usersVotedToFinish: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                users: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        tel: true,
                        accountType: true,
                        profilePhoto: true,
                        subjectIds: true,
                        requestIds: true,
                        seenMessageIds: true,
                    },
                },
                usersVotedToFinish: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        tel: true,
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

        if (!requestUpdated) {
            return new Response("Ocorreu um erro ao finalizara a solicitação", {
                status: 400,
            });
        }

        const newRequests = requests.filter(
            (request) => request.id !== requestId,
        );

        newRequests.push(requestUpdated);

        console.log(newRequests);

        return Response.json(newRequests, { status: 200 });
    } catch (error) {
        console.log("[ERROR_FINISH_REQUEST]", error);
        return new Response("Ocorreu um erro ao finalizar a solicitação", {
            status: 500,
        });
    }
}