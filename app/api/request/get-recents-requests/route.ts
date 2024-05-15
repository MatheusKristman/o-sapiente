import { prisma } from "@/libs/prismadb";
import { RequestWithUsersAndOffers } from "@/types";

export async function GET() {
  try {
    const requests = await prisma.request.findMany({
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

    let newRequests: RequestWithUsersAndOffers[] = [];

    if (requests.length !== 0 && requests.length < lengthNeeded) {
      while (newRequests.length < lengthNeeded) {
        console.log("teste recents requests");
        newRequests = newRequests.concat(requests);
      }
    }

    newRequests = newRequests.slice(0, lengthNeeded);

    return Response.json(newRequests, { status: 200 });
  } catch (error) {
    console.log("[ERROR_GET_RECENTS_REQUESTS]", error);

    return new Response("Ocorreu um erro ao receber as solicitações recentes", {
      status: 500,
    });
  }
}
