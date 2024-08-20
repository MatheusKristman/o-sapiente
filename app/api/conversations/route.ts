import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AccountRole, PaymentMethod, Status } from "@prisma/client";

import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import EmailAdminNewLesson from "@/emails/EmailAdminNewLesson";
import EmailOfferAccepted from "@/emails/EmailOfferAccepted";
import { EmailStudentLessonBeginNotification } from "@/emails/EmailStudentLessonBeginNotification";

interface IGenerateAdminEmailOptions {
  emailUser: string;
  lessonDate: Date;
  lessonPrice: number;
  certificateRequested: boolean;
  studentName: string;
  studentContact: string;
  professorName: string;
  professorContact: string;
  paymentMethod: string;
}

interface IGenerateProfessorEmailOptions {
  emailUser: string;
  professorEmail: string;
  userName: string;
  studentName: string;
  subject: string;
  message: string;
  url: string;
}

interface IGenerateStudentEmailOptions {
  emailUser: string;
  studentEmail: string;
  userName: string;
  url: string;
  description: string;
  subject: string;
  professorName: string;
  lessonDate: Date;
  lessonPrice: number;
  paymentMethod: string;
  certificateRequested: boolean;
}

function generateAdminEmailOptions({
  emailUser,
  lessonDate,
  lessonPrice,
  certificateRequested,
  studentName,
  studentContact,
  professorName,
  professorContact,
  paymentMethod,
}: IGenerateAdminEmailOptions) {
  const emailHtml = render(
    EmailAdminNewLesson({
      lessonDate,
      lessonPrice,
      certificateRequested,
      studentName,
      studentContact,
      professorName,
      professorContact,
      paymentMethod,
    }),
  );

  const emailAdmin: string = process.env.EMAIL_ADMIN!;

  return {
    from: emailUser,
    bcc: [emailUser, emailAdmin],
    subject: "Nova aula criada - O Sapiente",
    html: emailHtml,
  };
}

function generateProfessorEmailOptions({
  emailUser,
  studentName,
  subject,
  message,
  userName,
  url,
  professorEmail,
}: IGenerateProfessorEmailOptions) {
  const emailHtml = render(
    EmailOfferAccepted({
      studentName,
      subject,
      message,
      userName,
      url,
    }),
  );

  return {
    from: emailUser,
    to: professorEmail,
    subject: "Proposta aceita - O Sapiente",
    html: emailHtml,
  };
}

function generateStudentEmailOptions({
  emailUser,
  studentEmail,
  userName,
  url,
  description,
  subject,
  professorName,
  lessonDate,
  lessonPrice,
  paymentMethod,
  certificateRequested,
}: IGenerateStudentEmailOptions) {
  const emailHtml = render(
    EmailStudentLessonBeginNotification({
      description,
      subject,
      userName,
      url,
      professorName,
      lessonDate,
      lessonPrice,
      paymentMethod,
      certificateRequested,
    }),
  );

  return {
    from: emailUser,
    to: studentEmail,
    subject: "Notificação sobre a sua solicitação - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(request: Request) {
  try {
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { otherUserId, requestId, lessonDate, lessonPrice } = body;
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASEURL_DEV
        : process.env.NEXT_PUBLIC_BASEURL;

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
      const request = await prisma.request.update({
        where: {
          id: requestId,
        },
        data: {
          isOfferAccepted: true,
          status: Status.inProgress,
          beginLessonDate: new Date(),
          paymentMethod: PaymentMethod.agreed,
          lessonDate,
          lessonPrice,
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
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              tel: true,
              accountType: true,
            },
          },
        },
      });

      if (!request) {
        return new Response("Ocorreu um erro ao atualizar a solicitação", {
          status: 400,
        });
      }

      singleConversation.users.map((user) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            "conversation:new",
            singleConversation,
          );
        }
      });

      const student = request.users.filter(
        (user) => user.accountType === AccountRole.STUDENT,
      )[0];
      const professor = request.users.filter(
        (user) => user.accountType === AccountRole.PROFESSOR,
      )[0];

      const adminOptions = generateAdminEmailOptions({
        emailUser,
        lessonDate,
        lessonPrice,
        certificateRequested: request.certificateRequested,
        studentName: `${student.firstName} ${student.lastName}`,
        studentContact: student.tel!,
        professorName: `${professor.firstName} ${professor.lastName}`,
        professorContact: professor.tel!,
        paymentMethod: "A Combinar",
      });
      const professorOptions = generateProfessorEmailOptions({
        emailUser,
        professorEmail: professor.email,
        url: `${baseUrl}/painel-de-controle/professor/${professor.id}/mensagens/${singleConversation.id}`,
        userName: professor.firstName,
        message: request.description,
        subject: request.subject,
        studentName: `${student.firstName} ${student.lastName}`,
      });
      const studentOptions = generateStudentEmailOptions({
        emailUser,
        studentEmail: student.email,
        userName: student.firstName,
        url: `${baseUrl}/painel-de-controle/aluno/${student.id}/mensagens/${singleConversation.id}`,
        description: request.description,
        subject: request.subject,
        professorName: `${professor.firstName} ${professor.lastName}`,
        lessonDate: request.lessonDate!,
        lessonPrice: request.lessonPrice!,
        paymentMethod: "A Combinar",
        certificateRequested: request.certificateRequested,
      });

      await transport.sendMail(adminOptions);
      await transport.sendMail(professorOptions);
      await transport.sendMail(studentOptions);

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

    const requestUpdated = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        isOfferAccepted: true,
        status: Status.inProgress,
        beginLessonDate: new Date(),
        lessonDate,
        lessonPrice,
        paymentMethod: PaymentMethod.agreed,
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
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            tel: true,
            accountType: true,
          },
        },
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    const student = requestUpdated.users.filter(
      (user) => user.accountType === AccountRole.STUDENT,
    )[0];
    const professor = requestUpdated.users.filter(
      (user) => user.accountType === AccountRole.PROFESSOR,
    )[0];

    const adminOptions = generateAdminEmailOptions({
      emailUser,
      lessonDate,
      lessonPrice,
      certificateRequested: requestUpdated.certificateRequested,
      studentName: `${student.firstName} ${student.lastName}`,
      studentContact: student.tel!,
      professorName: `${professor.firstName} ${professor.lastName}`,
      professorContact: professor.tel!,
      paymentMethod: "A Combinar",
    });
    const professorOptions = generateProfessorEmailOptions({
      emailUser,
      professorEmail: professor.email,
      url: `${baseUrl}/painel-de-controle/professor/${professor.id}/mensagens/${newConversation.id}`,
      userName: professor.firstName,
      message: requestUpdated.description,
      subject: requestUpdated.subject,
      studentName: `${student.firstName} ${student.lastName}`,
    });
    const studentOptions = generateStudentEmailOptions({
      emailUser,
      studentEmail: student.email,
      userName: student.firstName,
      url: `${baseUrl}/painel-de-controle/aluno/${student.id}/mensagens/${newConversation.id}`,
      description: requestUpdated.description,
      subject: requestUpdated.subject,
      professorName: `${professor.firstName} ${professor.lastName}`,
      lessonDate: requestUpdated.lessonDate!,
      lessonPrice: requestUpdated.lessonPrice!,
      paymentMethod: "A Combinar",
      certificateRequested: requestUpdated.certificateRequested,
    });

    await transport.sendMail(adminOptions);
    await transport.sendMail(professorOptions);
    await transport.sendMail(studentOptions);

    return Response.json({ id: newConversation.id });
  } catch (error) {
    console.log("[ERROR_CONVERSATION]", error);

    return new Response("Erro interno", { status: 500 });
  }
}
