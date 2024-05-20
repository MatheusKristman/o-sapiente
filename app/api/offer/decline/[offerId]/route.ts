import nodemailer from "nodemailer";

import { prisma } from "@/libs/prismadb";
import { render } from "@react-email/render";
import { EmailOfferDeclined } from "@/emails/EmailOfferDeclined";
import getCurrentUser from "@/app/action/getCurrentUser";

interface IGenerateOptions {
  emailUser: string;
  userName: string;
  professorEmail: string;
  message: string;
  studentName: string;
  subject: string;
}

function generateOptions({
  emailUser,
  userName,
  professorEmail,
  message,
  studentName,
  subject,
}: IGenerateOptions) {
  const emailHtml = render(
    EmailOfferDeclined({
      userName,
      message,
      studentName,
      subject,
    }),
  );

  return {
    from: emailUser,
    to: professorEmail,
    subject: "Proposta Recusada - O Sapiente",
    html: emailHtml,
  };
}

export async function PUT(
  req: Request,
  { params }: { params: { offerId: string } },
) {
  try {
    const { offerId } = params;
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
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
      include: {
        request: true,
      },
    });

    if (!offer) {
      return new Response("Proposta não encontrada", { status: 404 });
    }

    const professor = await prisma.user.findUnique({
      where: {
        id: offer.userId,
      },
    });

    if (!professor) {
      return new Response(
        "Professor não encontrado, verifique e tente novamente",
        { status: 404 },
      );
    }

    const options = generateOptions({
      emailUser,
      userName: professor.firstName,
      professorEmail: professor.email,
      message: offer.request.description,
      studentName: `${currentUser.firstName} ${currentUser.lastName}`,
      subject: offer.request.subject,
    });

    transport.sendMail(options, (error) => {
      if (error) {
        console.log("[ERROR_DECLINE_OFFER]", error);

        return new Response("Ocorreu um erro no envio do e-mail", {
          status: 400,
        });
      }
    });

    await prisma.offer.delete({
      where: {
        id: offerId,
      },
    });

    return new Response("Proposta recusada com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_DECLINE_OFFER]", error);

    return new Response("Ocorreu um erro ao recusar a proposta", {
      status: 500,
    });
  }
}
