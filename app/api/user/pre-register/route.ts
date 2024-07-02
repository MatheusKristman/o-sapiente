import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { AccountRole } from "@prisma/client";

import { prisma } from "@/libs/prismadb";
import EmailConfirmAccount from "@/emails/EmailConfirmAccount";

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
        await prisma.request.create({
          data: {
            subject: body.subject,
            description: body.description,
            users: {
              connect: {
                id: user.id,
              },
            },
          },
        });
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

      transport.sendMail(options, (error) => {
        if (error) {
          console.log("[ERROR_ON_CONFIRMATION_ACCOUNT_EMAIL]", error);

          return new NextResponse(
            "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
            {
              status: 400,
            },
          );
        }
      });

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

      transport.sendMail(options, (error) => {
        if (error) {
          console.log("[ERROR_ON_CONFIRMATION_ACCOUNT_EMAIL]", error);

          return new NextResponse(
            "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
            {
              status: 400,
            },
          );
        }
      });

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
