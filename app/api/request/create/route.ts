import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { AccountRole } from "@prisma/client";

import { prisma } from "@/libs/prismadb";
import EmailRequestNotification from "@/emails/EmailRequestNotification";
import EmailAdminNewRequest from "@/emails/EmailAdminNewRequest";

interface IGenerateOptions {
  emailUser: string;
  professorEmails: string[];
  message: string;
  studentName: string;
  subject: string;
  linkUrl: string;
}

interface IGenerateAdminOptions {
  emailUser: string;
  studentName: string;
  studentContact: string;
  subject: string;
  description: string;
}

function generateOptions({
  emailUser,
  professorEmails,
  message,
  studentName,
  subject,
  linkUrl,
}: IGenerateOptions) {
  const emailHtml = render(
    EmailRequestNotification({
      message,
      studentName,
      subject,
      linkUrl,
    }),
  );

  return {
    from: emailUser,
    bcc: professorEmails,
    subject: "Nova Solicitação de Aluno Criada - O Sapiente",
    html: emailHtml,
  };
}

function generateAdminOptions({
  emailUser,
  studentName,
  studentContact,
  subject,
  description,
}: IGenerateAdminOptions) {
  const emailHtml = render(
    EmailAdminNewRequest({
      studentName,
      studentContact,
      subject,
      description,
    }),
  );

  const emailAdmin: string = process.env.EMAIL_ADMIN!;

  return {
    from: emailUser,
    bcc: [emailUser, emailAdmin],
    subject: "Nova Solicitação de Aluno Criada - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { subject, description, email } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASEURL_DEV
        : process.env.NEXT_PUBLIC_BASEURL;
    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    if (!subject || !description || !email) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email,
            accountType: AccountRole.STUDENT,
          },
          {
            accountType: AccountRole.PROFESSOR,
          },
        ],
      },
    });

    if (!users) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const student = users.filter((user) => user.accountType === "STUDENT")[0];

    const newRequest = await prisma.request.create({
      data: {
        subject,
        description,
        users: {
          connect: {
            id: student.id,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            tel: true,
          },
        },
      },
    });

    const newRequests = await prisma.request.findMany({
      where: {
        userIds: {
          has: student.id,
        },
      },
      include: {
        users: {
          select: {
            id: true,
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

    // const professorEmails = users
    //   .filter((user) => user.accountType === "PROFESSOR")
    //   .map((professor) => professor.email);

    // const professorOptions = generateOptions({
    //   emailUser,
    //   professorEmails,
    //   message: description,
    //   subject,
    //   studentName: `${newRequest.users[0].firstName} ${newRequest.users[0].lastName}`,
    //   linkUrl: `${baseUrl}/`,
    // });

    // await transport.sendMail(professorOptions);

    // const options = generateAdminOptions({
    //   emailUser,
    //   studentName: `${newRequest.users[0].firstName} ${newRequest.users[0].lastName}`,
    //   studentContact: `${newRequest.users[0].tel}`,
    //   subject: newRequest.subject,
    //   description: newRequest.description,
    // });

    // await transport.sendMail(options);

    return NextResponse.json({ sended: true, requests: newRequests });
  } catch (error) {
    console.log("[ERROR_POST_REQUEST]", error);
    return new NextResponse("Ocorreu um erro na solicitação do pedido", {
      status: 400,
    });
  }
}
