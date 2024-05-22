import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { AccountRole } from "@prisma/client";

import getSession from "@/app/action/getSession";
import { prisma } from "@/libs/prismadb";
import EmailOfferNotification from "@/emails/EmailOfferNotification";

interface IGenerateOptions {
  emailUser: string;
  studentEmail: string;
  userName: string;
  message: string;
  professorName: string;
  subject: string;
  linkUrl: string;
}

function generateOptions({
  emailUser,
  studentEmail,
  userName,
  message,
  professorName,
  subject,
  linkUrl,
}: IGenerateOptions) {
  const emailHtml = render(
    EmailOfferNotification({
      userName,
      message,
      professorName,
      subject,
      linkUrl,
    })
  );

  return {
    from: emailUser,
    to: studentEmail,
    subject: "Proposta Recebida - O Sapiente",
    html: emailHtml,
  };
}

export async function POST(req: Request) {
  try {
    const { lessonDate, lessonPrice, details, requestId, isLink } =
      await req.json();
    const session = await getSession();
    const emailHost: string = process.env.EMAIL_SMTP!;
    const emailUser: string = process.env.EMAIL_USER!;
    const emailPass: string = process.env.EMAIL_PASS!;
    const emailPort: number = Number(process.env.EMAIL_PORT!);
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASEURL_DEV
        : process.env.NEXT_PUBLIC_BASEURL;
    const transport = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    if (isLink && requestId) {
      if (!session?.user?.email || !lessonDate || !lessonPrice) {
        return new Response("Dados inválidos", { status: 404 });
      }

      const currentUser = await prisma.user.findFirst({
        where: {
          email: session.user.email,
          accountType: AccountRole.PROFESSOR,
        },
      });

      if (!currentUser) {
        return new Response("Usuário não encontrado", { status: 404 });
      }

      const offerCreated = await prisma.offer.create({
        data: {
          lessonDate,
          lessonPrice,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
          request: {
            connect: {
              id: requestId,
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          request: {
            select: {
              subject: true,
              users: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      const link = `${baseUrl}/proposta?offerId=${offerCreated.id}&studentId=${offerCreated.request.users[0].id}`;

      await prisma.offer.update({
        where: {
          id: offerCreated.id,
        },
        data: {
          offerLink: link,
        },
      });

      const options = generateOptions({
        emailUser,
        studentEmail: offerCreated.request.users[0].email,
        userName: `${offerCreated.request.users[0].firstName} ${offerCreated.request.users[0].lastName}`,
        message: "Enviou um link de proposta",
        subject: offerCreated.request.subject,
        professorName: `${offerCreated.user.firstName} ${offerCreated.user.lastName}`,
        linkUrl: `${baseUrl}/painel-de-controle/aluno/${offerCreated.request.users[0].id}/resumo`,
      });

      transport.sendMail(options, (error) => {
        if (error) {
          console.log("[ERROR_ON_OFFER_CREATE]", error);

          return new Response(
            "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
            {
              status: 400,
            }
          );
        }
      });

      return Response.json({ link }, { status: 200 });
    }

    if (
      !session?.user?.email ||
      !lessonDate ||
      !lessonPrice ||
      !details ||
      !requestId
    ) {
      return new Response("Dados inválidos", { status: 404 });
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
        accountType: AccountRole.PROFESSOR,
      },
    });

    if (!currentUser) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const offer = await prisma.offer.create({
      data: {
        lessonDate,
        lessonPrice,
        details,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        request: {
          connect: {
            id: requestId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        request: {
          select: {
            subject: true,
            users: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    console.log(offer.request.users);

    const options = generateOptions({
      emailUser,
      studentEmail: offer.request.users[0].email,
      userName: `${offer.request.users[0].firstName} ${offer.request.users[0].lastName}`,
      message: offer.details!,
      subject: offer.request.subject,
      professorName: `${offer.user.firstName} ${offer.user.lastName}`,
      linkUrl: `${baseUrl}/painel-de-controle/aluno/${offer.request.users[0].id}/resumo`,
    });

    transport.sendMail(options, (error) => {
      if (error) {
        console.log("[ERROR_ON_OFFER_CREATE]", error);

        return new Response(
          "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
          {
            status: 400,
          }
        );
      }
    });

    return Response.json(offer, {
      status: 200,
    });
  } catch (error) {
    console.log("[ERROR_CREATE_OFFER]", error);

    return new Response("Erro ao criar oferta", { status: 500 });
  }
}
