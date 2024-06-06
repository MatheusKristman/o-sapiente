import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { addDays } from "date-fns";

import { prisma } from "@/libs/prismadb";
import EmailProfessorPlanPayed from "@/emails/EmailProfessorPlanPayed";

interface IGenerateEmailOptions {
  emailUser: string;
  emailToSend: string;
  userName: string;
  planActivationDate: Date;
  planValidationDate: Date;
}

function generateEmailOptions({
  emailUser,
  emailToSend,
  userName,
  planActivationDate,
  planValidationDate,
}: IGenerateEmailOptions) {
  const emailHtml = render(
    EmailProfessorPlanPayed({
      userName,
      planActivationDate,
      planValidationDate,
    })
  );

  return {
    from: emailUser,
    to: emailToSend,
    subject: "Pagamento do plano confirmado - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(req: Request) {
  try {
    //TODO: (NÃO PRIORIDADE) confirmar se o Rogério deseja criar um plano pelo pagarme para esses pagamentos dos planos ou manter com a criação de order
    const body = await req.json();

    if (body.type === "order.paid") {
      const planId = body.data.items[0].code;
      const customerId = body.data.customer.code;
      const emailHost: string = process.env.EMAIL_SMTP!;
      const emailUser: string = process.env.EMAIL_USER!;
      const emailPass: string = process.env.EMAIL_PASS!;
      const emailPort: number = Number(process.env.EMAIL_PORT!);

      const plan = await prisma.plan.findUnique({
        where: {
          id: planId,
        },
      });

      if (!plan) {
        return new Response("Ocorreu um erro na aprovação do pagamento do plano", { status: 401 });
      }

      const userUpdated = await prisma.user.update({
        where: {
          id: customerId,
        },
        data: {
          plan: {
            connect: {
              id: plan.id,
            },
          },
          planActivationDate: new Date(),
          planValidationDate: addDays(new Date(), 30),
        },
      });

      if (!userUpdated) {
        return new Response("Ocorreu um erro ao achar o professor dentro do webhook do plano", { status: 404 });
      }

      const transport = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const options = generateEmailOptions({
        emailUser,
        emailToSend: userUpdated.email,
        userName: `${userUpdated.firstName} ${userUpdated.lastName}`,
        planActivationDate: userUpdated.planActivationDate!,
        planValidationDate: userUpdated.planValidationDate!,
      });

      transport.sendMail(options, (error) => {
        if (error) {
          console.log("[ERROR_WEBHOOK_PLAN]", error);

          return new Response("Ocorreu um erro no envio do e-mail de confirmação de pagamento do plano", {
            status: 400,
          });
        }
      });

      return new Response("Webhook de planos executado com sucesso", { status: 200 });
    }

    if (body.type === "order.payment_failed" || body.type === "order.canceled") {
      const customerId: string = body.data.customer.code;

      const userUpdated = await prisma.user.update({
        where: {
          id: customerId,
        },
        data: {
          plan: {
            disconnect: true,
          },
          planActivationDate: null,
          planValidationDate: null,
        },
      });

      return new Response("Webhook de pagamento do plano negado", {
        status: 200,
      });
    }

    return new Response("Webhook de pagamento executado, sem evento", { status: 200 });
  } catch (error) {
    console.log("[ERROR_WEBHOOK_PLAN]", error);

    return new Response("Ocorreu um erro no webhook do pagamento do plano", {
      status: 500,
    });
  }
}
