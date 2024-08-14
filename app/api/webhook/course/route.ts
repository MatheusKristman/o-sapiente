import EmailAdminCourseNotification from "@/emails/EmailAdminCourseNotification";
import EmailCoursePaymentConfirm from "@/emails/EmailCoursePaymentConfirm";
import EmailCoursePaymentFailed from "@/emails/EmailCoursePaymentFailed";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

interface IAdminEmailOptions {
  emailUser: string;
  courseName: string;
  tel: string;
  name: string;
  email: string;
}

interface IEmailOptions {
  emailUser: string;
  courseName: string;
  name: string;
  courseAmount: string;
  paymentMethod: string;
  installments: string;
}

interface IErrorEmailOptions {
  emailUser: string;
  courseName: string;
  name: string;
}

function generateAdminEmailOptions({
  emailUser,
  courseName,
  tel,
  name,
  email,
}: IAdminEmailOptions) {
  const emailHtml = render(
    EmailAdminCourseNotification({
      courseName,
      tel,
      name,
      email,
    }),
  );

  return {
    from: emailUser,
    to: emailUser,
    subject: "Notificação de compra do curso - O Sapiente",
    html: emailHtml,
  };
}

function generateEmailOptions({
  emailUser,
  name,
  courseName,
  courseAmount,
  paymentMethod,
  installments,
}: IEmailOptions) {
  const emailHtml = render(
    EmailCoursePaymentConfirm({
      paymentMethod,
      name,
      courseName,
      courseAmount,
      installments,
    }),
  );

  return {
    from: emailUser,
    to: emailUser,
    subject: "Pagamento do curso confirmado - O Sapiente",
    html: emailHtml,
  };
}

function generateErrorEmailOptions({
  emailUser,
  name,
  courseName,
}: IErrorEmailOptions) {
  const emailHtml = render(
    EmailCoursePaymentFailed({
      name,
      courseName,
    }),
  );

  return {
    from: emailUser,
    to: emailUser,
    subject: "Pagamento do curso negado - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    if (body.type === "order.paid") {
      const courseName = body.data.items[0].description;
      const courseAmount = body.data.items[0].amount;
      const paymentMethod = body.data.charges[0].payment_method;
      const installments = body.data.charges[0].last_transaction.installments;
      const clientEmail = body.data.customer.email;
      const clientName = body.data.customer.name;
      const clientTel = body.data.customer.phones.home_phone;

      const adminOptions = generateAdminEmailOptions({
        emailUser,
        email: clientEmail,
        name: clientName,
        tel: clientTel,
        courseName,
      });
      const emailOptions = generateEmailOptions({
        emailUser,
        courseName,
        name: clientName,
        courseAmount,
        installments,
        paymentMethod,
      });

      await transport.sendMail(adminOptions);
      await transport.sendMail(emailOptions);

      return new Response("Webhook de pagamento do curso confirmado.", {
        status: 200,
      });
    }

    if (
      body.type === "order.payment_failed" ||
      body.type === "order.canceled"
    ) {
      const courseName = body.data.items[0].description;
      const clientName = body.data.customer.name;

      const errorEmailOptions = generateErrorEmailOptions({
        emailUser,
        name: clientName,
        courseName,
      });

      await transport.sendMail(errorEmailOptions);

      return new Response("Webhook de pagamento negado", { status: 200 });
    }
  } catch (error) {
    console.log("[ERROR_ON_WEBHOOK]", error);

    return new Response("Ocorreu um erro no webhook", { status: 500 });
  }
}
