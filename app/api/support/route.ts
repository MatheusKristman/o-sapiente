import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import EmailSupport from "@/emails/EmailSupport";

export async function POST(req: Request) {
  try {
    const { subject, message } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const emailHtml = render(
      EmailSupport({
        message,
      }),
    );

    const options = {
      from: emailUser,
      to: emailUser,
      subject: `Nova mensagem de suporte - Assunto: ${subject} - O Sapiente`,
      html: emailHtml,
    };

    await transport.sendMail(options);

    return Response.json(
      { message: "Mensagem enviada para o suporte, aguarde o contato" },
      { status: 200 },
    );
  } catch (error) {
    console.log("[ERROR_ON_SUPPORT]", error);

    return new Response("Ocorreu um error ao solicitar suporte", {
      status: 500,
    });
  }
}
