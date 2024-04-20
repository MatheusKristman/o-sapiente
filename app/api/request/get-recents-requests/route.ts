import { prisma } from "@/libs/prismadb";

export async function GET() {
    try {
        let requests = await prisma.request.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc",
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

        const lengthNeeded = 10;

        if (requests.length < lengthNeeded) {
            while (requests.length < lengthNeeded) {
                requests = requests.concat(requests);
            }
        }

        requests = requests.slice(0, lengthNeeded);

        return Response.json(requests, { status: 200 });
    } catch (error) {
        console.log("[ERROR_GET_RECENTS_REQUESTS]", error);

        return new Response(
            "Ocorreu um erro ao receber as solicitações recentes",
            { status: 500 },
        );
    }
}
