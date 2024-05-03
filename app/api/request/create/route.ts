import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";
import { EmailRequestNotification } from "@/emails/EmailRequestNotification";

interface IGenerateOptions {
  emailUser: string;
  userName: string;
  professorEmail: string;
  message: string;
  studentName: string;
  subject: string;
  linkUrl: string;
}

function generateOptions({
  emailUser,
  userName,
  professorEmail,
  message,
  studentName,
  subject,
  linkUrl,
}: IGenerateOptions) {
  const emailHtml = render(
    EmailRequestNotification({
      userName,
      message,
      studentName,
      subject,
      linkUrl,
    })
  );

  return {
    from: emailUser,
    to: professorEmail,
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

    const user = await prisma.user.findFirst({
      where: {
        email,
        accountType: AccountRole.STUDENT,
      },
    });

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const newRequest = await prisma.request.create({
      data: {
        subject,
        description,
        userIds: [user.id],
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
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

    const professors = await prisma.user.findMany({
      where: {
        accountType: AccountRole.PROFESSOR,
      },
    });

    professors.map(async (professor) => {
      try {
        const options = generateOptions({
          emailUser,
          userName: `${professor.firstName} ${professor.lastName}`,
          professorEmail: professor.email,
          message: description,
          subject,
          studentName: `${newRequest.users[0].firstName} ${newRequest.users[0].lastName}`,
          linkUrl: `${baseUrl}/painel-de-controle/professor/${professor.id}/resumo`,
        });

        await transport.sendMail(options);
      } catch (error) {
        console.log("[ERROR_POST_REQUEST]", error);

        return new NextResponse("Ocorreu um erro ao enviar o e-mail", {
          status: 400,
        });
      }
    });

    return NextResponse.json({ sended: true, requests: newRequests });
  } catch (error) {
    console.log("[ERROR_POST_REQUEST]", error);
    return new NextResponse("Ocorreu um erro na solicitação do pedido", {
      status: 400,
    });
  }
}
