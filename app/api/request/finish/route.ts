import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { AccountRole, Status } from "@prisma/client";

import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import EmailFinishingLessonNotification from "@/emails/EmailFinishingLessonNotification";
import { RequestWithUsersAndOffers } from "@/types";
import EmailAdminLessonFinishing from "@/emails/EmailAdminLessonFinishing";
import EmailProfessorLessonFinishPaymentNotification from "@/emails/EmailProfessorPaymentAvailableNotification";
import EmailProfessorLessonFinishNotification from "@/emails/EmailProfessorLessonFinishNotification";
import EmailStudentLessonFinishNotification from "@/emails/EmailStudentLessonFinishNotification";

export async function PUT(req: Request) {
  try {
    const { requestId } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const currentUser = await getCurrentUser();
    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASEURL_DEV!
        : process.env.NEXT_PUBLIC_BASEURL!;

    let requests;
    let isProfessor = false;

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
        requests.filter(
          (request: RequestWithUsersAndOffers) => request.id === requestId,
        ).length === 0
      ) {
        return new Response("Solicitação inválida", {
          status: 401,
        });
      }
    }

    if (currentUser.accountType === AccountRole.PROFESSOR) {
      isProfessor = true;

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

    const student = requestUpdated.users.filter(
      (user) => user.accountType === AccountRole.STUDENT,
    )[0];
    const professor = requestUpdated.users.filter(
      (user) => user.accountType === AccountRole.PROFESSOR,
    )[0];

    const newRequests = requests.filter((request) => request.id !== requestId);

    newRequests.push(requestUpdated);

    const otherUser = requestUpdated.users.filter(
      (user) => user.id !== currentUser.id,
    )[0];

    if (requestFiltered.usersIdsVotedToFinish.length === 1) {
      const professor = requestUpdated.users.filter(
        (user) => user.accountType === AccountRole.PROFESSOR,
      )[0];
      let payment: number;

      if (requestUpdated.certificateRequested) {
        payment =
          professor.paymentRetrievable + (requestUpdated.lessonPrice! + 20);
      } else {
        payment = professor.paymentRetrievable + requestUpdated.lessonPrice!;
      }

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
          { status: 401 },
        );
      }

      if (requestUpdated.lessonPrice! > 0) {
        const professorEmailHtml = render(
          EmailProfessorLessonFinishPaymentNotification({
            name: `${professorUpdated.firstName} ${professorUpdated.lastName}`,
            lessonPrice: requestUpdated.lessonPrice!,
            baseUrl: `${baseUrl}/painel-de-controle/professor/${professorUpdated.id}/resumo`,
          }),
        );

        const professorOptions = {
          from: emailUser,
          to: professorUpdated.email,
          subject:
            "Notificação de pagamento disponível para resgate - O Sapiente",
          html: professorEmailHtml,
        };

        await transport.sendMail(professorOptions);
      } else {
        const professorEmailHtml = render(
          EmailProfessorLessonFinishNotification({
            name: professorUpdated.firstName,
            subject: requestUpdated.subject,
            description: requestUpdated.description,
            studentName: `${student.firstName} ${student.lastName}`,
            beginLessonDate: requestUpdated.beginLessonDate!,
            finishLessonDate: requestUpdated.finishLessonDate!,
          }),
        );

        const professorOptions = {
          from: emailUser,
          to: professorUpdated.email,
          subject: "Notificação de finalização da aula - O Sapiente",
          html: professorEmailHtml,
        };

        await transport.sendMail(professorOptions);
      }

      const studentEmailHtml = render(
        EmailStudentLessonFinishNotification({
          name: student.firstName,
          subject: requestUpdated.subject,
          description: requestUpdated.description,
          professorName: `${professorUpdated.firstName} ${professorUpdated.lastName}`,
          beginLessonDate: requestUpdated.beginLessonDate!,
          finishLessonDate: requestUpdated.finishLessonDate!,
        }),
      );

      const studentOptions = {
        from: emailUser,
        to: student.email,
        subject: "Notificação de finalização da aula - O Sapiente",
        html: studentEmailHtml,
      };

      await transport.sendMail(studentOptions);

      const adminEmailHtml = render(
        EmailAdminLessonFinishing({
          baseUrl: `${baseUrl}/painel-de-controle/admin/geral`,
          lessonDate: requestUpdated.lessonDate!,
          finishLessonDate: requestUpdated.finishLessonDate!,
          lessonPrice: requestUpdated.lessonPrice!,
          certificateRequested: requestUpdated.certificateRequested,
          studentName: `${student.firstName} ${student.lastName}`,
          studentContact: student.tel!,
          professorName: `${professor.firstName} ${professor.lastName}`,
          professorContact: professor.tel!,
          status: "Finalizado",
          userWhoVoted: `${currentUser.firstName} ${currentUser.lastName}`,
        }),
      );

      const adminOptions = {
        from: emailUser,
        to: emailUser,
        subject: "Status da aula atualizado - O Sapiente",
        html: adminEmailHtml,
      };

      await transport.sendMail(adminOptions);
    }

    if (requestFiltered.usersIdsVotedToFinish.length === 0) {
      const emailHtml = render(
        EmailFinishingLessonNotification({
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          otherUserName: `${currentUser.firstName} ${currentUser.lastName}`,
          baseUrl,
        }),
      );

      const adminEmailHtml = render(
        EmailAdminLessonFinishing({
          baseUrl: `${baseUrl}/painel-de-controle/admin/geral`,
          lessonDate: requestUpdated.lessonDate!,
          lessonPrice: requestUpdated.lessonPrice!,
          certificateRequested: requestUpdated.certificateRequested,
          studentName: `${student.firstName} ${student.lastName}`,
          studentContact: student.tel!,
          professorName: `${professor.firstName} ${professor.lastName}`,
          professorContact: professor.tel!,
          status: "Finalizando",
          userWhoVoted: `${currentUser.firstName} ${currentUser.lastName}`,
        }),
      );

      const options = {
        from: emailUser,
        to: otherUser.email,
        subject: "Atualização do status da aula - O Sapiente",
        html: emailHtml,
      };

      const adminOptions = {
        from: emailUser,
        to: emailUser,
        subject: "Status da aula atualizado - O Sapiente",
        html: adminEmailHtml,
      };

      await transport.sendMail(options);
      await transport.sendMail(adminOptions);
    }

    return Response.json({ newRequests, isProfessor }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_FINISH_REQUEST]", error);
    return new Response("Ocorreu um erro ao finalizar a solicitação", {
      status: 500,
    });
  }
}
