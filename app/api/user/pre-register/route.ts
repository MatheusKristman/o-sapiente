import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { AccountRole } from "@prisma/client";

import { prisma } from "@/libs/prismadb";
import EmailConfirmAccount from "@/emails/EmailConfirmAccount";
import EmailRequestNotification from "@/emails/EmailRequestNotification";

interface IGenerateOptions {
  emailUser: string;
  professorEmails: string[];
  message: string;
  studentName: string;
  subject: string;
  linkUrl: string;
}

function generateOptions({ emailUser, professorEmails, message, studentName, subject, linkUrl }: IGenerateOptions) {
  const emailHtml = render(
    EmailRequestNotification({
      message,
      studentName,
      subject,
      linkUrl,
    })
  );

  return {
    from: emailUser,
    bcc: professorEmails,
    subject: "Nova Solicitação de Aluno Criada - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(req: Request) {
  try {
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      tel,
      password,
      passwordConfirm,
      accountType,
    } = body;
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASEURL_DEV
        : process.env.NEXT_PUBLIC_BASEURL;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !tel ||
      !password ||
      !passwordConfirm ||
      !accountType
    ) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("Usuário já está cadastrado", {
        status: 405,
      });
    }

    if (password !== passwordConfirm) {
      return new NextResponse(
        "Senhas não coincidem, verifique e tente novamente",
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let user;

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    if (accountType === "Admin") {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          tel,
          password: hashedPassword,
          accountType: AccountRole.ADMIN,
          isConfirmed: true,
        },
      });
    }

    if (accountType === "Student") {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          tel,
          password: hashedPassword,
          accountType: AccountRole.STUDENT,
        },
      });

      if (body.subject && body.description) {
        const newRequest = await prisma.request.create({
          data: {
            subject: body.subject,
            description: body.description,
            users: {
              connect: {
                id: user.id,
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

        const professors = await prisma.user.findMany({
          where: {
            accountType: AccountRole.PROFESSOR,
          },
        });

        const professorEmails = professors
          .filter((professor) => professor.accountType === "PROFESSOR")
          .map((professor) => professor.email);

        const professorOptions = generateOptions({
          emailUser,
          professorEmails,
          message: body.description,
          subject: body.subject,
          studentName: `${newRequest.users[0].firstName} ${newRequest.users[0].lastName}`,
          linkUrl: `${baseUrl}/`,
        });

        await transport.sendMail(professorOptions);
      }

      const emailHtml = render(
        EmailConfirmAccount({
          userName: `${user.firstName} ${user.lastName}`,
          url: `${baseUrl}/?id=${user.id}&confirmed=true&type=student`,
        }),
      );

      const options = {
        from: emailUser,
        to: user.email,
        subject: "Confirme sua conta - O Sapiente",
        html: emailHtml,
      };

      await transport.sendMail(options);

      console.log(emailUser);
      console.log(emailPass);
      console.log(options);
    }

    if (accountType === "Professor") {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          tel,
          password: hashedPassword,
          accountType: AccountRole.PROFESSOR,
        },
      });

      const emailHtml = render(
        EmailConfirmAccount({
          userName: `${user.firstName} ${user.lastName}`,
          url: `${baseUrl}/?id=${user.id}&confirmed=true&type=professor`,
        }),
      );

      const options = {
        from: emailUser,
        to: user.email,
        subject: "Confirme sua conta - O Sapiente",
        html: emailHtml,
      };

      await transport.sendMail(options);

      console.log(emailUser);
      console.log(emailPass);
      console.log(options);
    }

    if (!user) {
      return new NextResponse(
        "Ocorreu um erro durante a criação da conta, tente novamente",
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({ id: user.id });
  } catch (error: any) {
    console.log("[ERROR_PROFESSOR_PRE_REGISTER]", error);
    return new NextResponse(
      "Ocorreu um erro durante o cadastro, tente novamente!",
      {
        status: 400,
      },
    );
  }
}
