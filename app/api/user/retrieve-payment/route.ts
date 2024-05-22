import { User } from "@prisma/client";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import getCurrentUser from "@/app/action/getCurrentUser";
import EmailRetrievablePaymentRequest from "@/emails/EmailRetrievablePaymentRequest";
import { prisma } from "@/libs/prismadb";

//TODO: (NÃO PRIORIDADE) - criar um histórico de resgate caso ocorra algum erro

export async function POST(req: Request) {
  try {
    const { pixCode }: { pixCode: string } = await req.json();
    const currentUser: User | null = await getCurrentUser();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (currentUser.paymentRetrievable === 0) {
      return new Response("Não autorizado", { status: 401 });
    }

    const paymentValue: number = currentUser.paymentRetrievable;
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        pixCode,
        paymentRetrievable: 0,
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
      EmailRetrievablePaymentRequest({
        pixCode,
        paymentRequest: paymentValue,
        professorName: `${currentUser.firstName} ${currentUser.lastName}`,
        professorEmail: currentUser.email,
        professorCel: currentUser.tel!,
      })
    );

    const options = {
      from: emailUser,
      to: emailUser,
      subject: `Nova solicitação de resgate - O Sapiente`,
      html: emailHtml,
    };

    transport.sendMail(options, (error) => {
      if (error) {
        console.log("[ERROR_RETRIEVE_PAYMENT]", error);

        return new Response(
          "Ocorreu um erro no envio do e-mail de solicitação de resgate",
          {
            status: 400,
          }
        );
      }
    });

    return Response.json({ pixCode }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_RETRIEVE_PAYMENT]", error);

    return new Response("Ocorreu um erro ao solicitar o resgate do valor", {
      status: 500,
    });
  }
}
