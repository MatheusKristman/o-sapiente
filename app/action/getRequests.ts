import { prisma } from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { AccountRole } from "@prisma/client";

const getRequests = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return [];
    }

    const teacherUser = await prisma.user.findFirst({
      where: {
        email: currentUser.email,
        accountType: AccountRole.PROFESSOR,
      },
    });

    if (teacherUser) {
      const request = await prisma.request.findMany({
        where: {
          users: {
            some: {
              id: {
                equals: currentUser.id,
              },
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

      if (request) {
        return request;
      } else {
        return [];
      }
    }

    const studentUser = await prisma.user.findUnique({
      where: {
        email: currentUser.email,
        accountType: AccountRole.STUDENT,
      },
    });

    if (studentUser) {
      const request = await prisma.request.findMany({
        where: {
          userIds: {
            has: studentUser.id,
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

      if (request) {
        return request;
      } else {
        return [];
      }
    }

    return [];
  } catch (error) {
    console.log("[ERROR_GET_REQUEST]", error);
    return [];
  }
};

export default getRequests;
