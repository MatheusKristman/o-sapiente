import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import { EmailRequestSupport } from "@/emails/EmailRequestSupport";
import { prisma } from "@/libs/prismadb";
import { Status } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const { subject, message } = await req.json();
    const requestId = params.requestId;
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

    if (!subject || !message || !requestId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const request = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: Status.support,
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            tel: true,
          },
        },
      },
    });

    if (!request) {
      return new Response("Solicitação não encontrada", { status: 404 });
    }

    const emailHtml = render(
      EmailRequestSupport({
        message,
        lessonDate: request.lessonDate,
        lessonPrice: request.lessonPrice,
        certificateRequested: request.certificateRequested,
        studentName: `${request.users[0].firstName} ${request.users[0].lastName}`,
        studentContact: request.users[0].tel!,
        professorName: `${request.users[1].firstName} ${request.users[1].lastName}`,
        professorContact: request.users[1].tel!,
      })
    );

    const options = {
      from: emailUser,
      to: emailUser,
      subject: `Nova mensagem de suporte - Assunto: ${subject} - O Sapiente`,
      html: emailHtml,
    };

    transport.sendMail(options, (error) => {
      if (error) {
        console.log("[ERROR_ON_CONVERSATION]", error);

        return new Response(
          "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
          {
            status: 400,
          }
        );
      }
    });

    return Response.json(
      { message: "Mensagem enviada para o suporte, aguarde o contato" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR_ON_REQUEST_SUPPORT]", error);

    return new Response("Ocorreu um erro ao enviar mensagem de suporte", {
      status: 500,
    });
  }
}
