
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AccountRole } from "@prisma/client";

import { prisma } from "@/libs/prismadb";
import EmailConfirmAccount from "@/emails/EmailConfirmAccount";

export async function PATCH(req: NextRequest) {
  try {
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const body = await req.formData();
    const themes: string[] = JSON.parse(
      body.get("themes") as unknown as string,
    );
    const aboutMe: string = body.get("aboutMe") as string;
    const id: string = body.get("id") as string;
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASEURL_DEV
        : process.env.NEXT_PUBLIC_BASEURL;

    let updatedProfessor = null;

    if (themes.length === 0 || !aboutMe || !id) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    updatedProfessor = await prisma.user.update({
      where: {
        id,
        accountType: AccountRole.PROFESSOR,
      },
      data: {
        themes,
        aboutMe,
      },
    });

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
    const emailHtml = render(
      EmailConfirmAccount({
        userName: `${updatedProfessor.firstName} ${updatedProfessor.lastName}`,
        url: `${baseUrl}/?id=${updatedProfessor.id}&confirmed=true&type=professor`
      })
    );

    const options = {
      from: emailUser,
      to: updatedProfessor.email,
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
          }
        );
      }
    });

    return NextResponse.json({
      firstName: updatedProfessor.firstName,
      lastName: updatedProfessor.lastName,
      profilePhoto: updatedProfessor.profilePhoto,
      themes: updatedProfessor.themes,
      accountType: updatedProfessor.accountType,
    });
  } catch (error) {
    console.log("[ERROR_ON_SAVE_PROFESSOR_PROFILE]", error);

    return new NextResponse("Ocorreu um erro durante o cadastro do professor", {
      status: 400,
    });
  }
}
