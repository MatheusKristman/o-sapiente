import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { AccountRole, Status } from "@prisma/client";
import { EmailFinishingLessonNotification } from "@/emails/EmailFinishingLessonNotification";
import { RequestWithUsersAndOffers } from "@/types";

export async function PUT(req: Request) {
  //TODO: ajustar para o retorno das solicitações ser igual ao do get-requests, pois é tanto o professor quanto o aluno que usa a request
  try {
    const { requestId } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const currentUser = await getCurrentUser();

    let requests;

    if (!currentUser?.id) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    if (currentUser.accountType === AccountRole.STUDENT) {
      requests = await prisma.request.findMany({
        where: {
          userIds: {
            has: currentUser.id,
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

      if (
        requests.some(
          (request: RequestWithUsersAndOffers) => request.id !== requestId
        )
      ) {
        console.log("requests: ", requests);
        return new Response("Solicitação inválida, não foi encontrada.", {
          status: 401,
        });
      }
    }

    if (currentUser.accountType === AccountRole.PROFESSOR) {
      requests = await prisma.request.findMany({
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
    }

    if (!requests) {
      return new Response("Ocorreu um erro ao resgatar as solicitações", {
        status: 404,
      });
    }

    const requestFiltered = requests.filter(
      (request) => request.id === requestId
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
            paymentRetrievable: true,
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

    const newRequests = requests.filter((request) => request.id !== requestId);

    newRequests.push(requestUpdated);

    const otherUser = requestUpdated.users.filter(
      (user) => user.id !== currentUser.id
    )[0];

    if (requestFiltered.usersIdsVotedToFinish.length === 1) {
      const professor = requestUpdated.users.filter(
        (user) => user.accountType === AccountRole.PROFESSOR
      )[0];

      const payment =
        professor.paymentRetrievable + requestUpdated.lessonPrice!;

      const professorUpdated = await prisma.user.update({
        where: {
          id: professor.id,
        },
        data: {
          paymentRetrievable: payment,
        },
      });

      if (!professorUpdated) {
        return new Response(
          "Ocorreu um erro ao enviar o valor para o professor",
          { status: 401 }
        );
      }
    }

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const emailHtml = render(
      EmailFinishingLessonNotification({
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        otherUserName: `${otherUser.firstName} ${otherUser.lastName}`,
      })
    );

    const options = {
      from: emailUser,
      to: emailUser,
      subject: "Nova mensagem de contato - O Sapiente",
      html: emailHtml,
    };

    await transport.sendMail(options);

    return Response.json(newRequests, { status: 200 });
  } catch (error) {
    console.log("[ERROR_FINISH_REQUEST]", error);
    return new Response("Ocorreu um erro ao finalizar a solicitação", {
      status: 500,
    });
  }
}
