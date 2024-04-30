import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import { prisma } from "@/libs/prismadb";
import { EmailForgotPassword } from "@/emails/EmailForgotPassword";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);

    if (!email) {
      return new Response("E-mail inválido", { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return Response.json(
        { message: "E-mail não cadastrado" },
        { status: 404 },
      );
    }

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const emailHtml = render(EmailForgotPassword());

    const options = {
      from: emailUser,
      to: email,
      subject: "Nova aula criada - O Sapiente",
      html: emailHtml,
    };

    transport.sendMail(options, (error) => {
      if (error) {
        console.log("[ERROR_ON_CONFIRMATION_EMAIL]", error);

        return new Response(
          "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
          {
            status: 400,
          },
        );
      }
    });

    return Response.json(
      { message: "E-mail enviado para recuperar a senha" },
      { status: 200 },
    );
  } catch (error) {
    console.log("[ERROR_ON_FORGOT_PASSWORD]", error);
    return new Response("Ocorreu um erro ao recuperar a senha", {
      status: 500,
    });
  }
}
