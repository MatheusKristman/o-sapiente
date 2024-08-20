import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import EmailContact from "@/emails/EmailContact";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const emailAdmin: string = process.env.EMAIL_ADMIN!;

    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const emailHtml = render(EmailContact({ message, name, email }));

    const options = {
      from: emailUser,
      bcc: [emailUser, emailAdmin],
      subject: "Nova mensagem de contato - O Sapiente",
      html: emailHtml,
    };

    await transport.sendMail(options);

    return Response.json(
      { message: "Mensagem enviada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.log("[ERROR_ON_CONTACT]", error);
    return new Response("Ocorreu um erro ao enviar a mensagem de contato", {
      status: 500,
    });
  }
}
