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
  email: string;
  courseAmount: string;
  paymentMethod: string;
  installments: string;
}

interface IErrorEmailOptions {
  emailUser: string;
  courseName: string;
  name: string;
  email: string;
}

function generateAdminEmailOptions({ emailUser, courseName, tel, name, email }: IAdminEmailOptions) {
  const emailTest = process.env.EMAIL_TEST!;

  const emailHtml = render(
    EmailAdminCourseNotification({
      courseName,
      tel,
      name,
      email,
    })
  );

  return {
    from: emailUser,
    to: [emailUser, emailTest],
    subject: "Notificação de compra do curso - O Sapiente",
    html: emailHtml,
  };
}

function generateEmailOptions({
  emailUser,
  name,
  email,
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
    })
  );

  return {
    from: emailUser,
    to: email,
    subject: "Pagamento do curso confirmado - O Sapiente",
    html: emailHtml,
  };
}

function generateErrorEmailOptions({ emailUser, name, email, courseName }: IErrorEmailOptions) {
  const emailHtml = render(
    EmailCoursePaymentFailed({
      name,
      courseName,
    })
  );

  return {
    from: emailUser,
    to: email,
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

    console.log(body);
    console.log(body.data.items);
    console.log(body.data.customer.phones);
    console.log(body.data.charges);

    if (body.type === "order.paid") {
      const courseName = body.data.items[0].description;
      const courseAmount = body.data.items[0].amount;
      const paymentMethod = body.data.charges[0].payment_method;
      const installments = body.data.charges[0].last_transaction.installments;
      const clientEmail = body.data.customer.email;
      const clientName = body.data.customer.name;
      const clientTel = `+${body.data.customer.phones.home_phone.country_code} (${body.data.customer.phones.home_phone.area_code}) ${body.data.customer.phones.home_phone.number}`;

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
        email: clientEmail,
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

    if (body.type === "order.payment_failed" || body.type === "order.canceled") {
      const courseName = body.data.items[0].description;
      const clientName = body.data.customer.name;
      const clientEmail = body.data.customer.email;

      const errorEmailOptions = generateErrorEmailOptions({
        emailUser,
        name: clientName,
        email: clientEmail,
        courseName,
      });

      await transport.sendMail(errorEmailOptions);

      return new Response("Webhook de pagamento negado", { status: 200 });
    }

    return new Response("Webhook de pagamento executado, sem evento", {
      status: 200,
    });
  } catch (error) {
    console.log("[ERROR_ON_WEBHOOK]", error);

    return new Response("Ocorreu um erro no webhook", { status: 500 });
  }
}
