import getSession from "@/app/action/getSession";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { lessonDate, lessonPrice, details, requestId, isLink } =
      await req.json();
    const session = await getSession();

    if (isLink && requestId) {
      if (!session?.user?.email || !lessonDate || !lessonPrice) {
        return new Response("Dados inválidos", { status: 404 });
      }

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_BASEURL_DEV
          : process.env.NEXT_PUBLIC_BASEURL;

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
          request: {
            select: {
              users: {
                select: {
                  id: true,
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
    });

    return Response.json(offer, {
      status: 200,
    });
  } catch (error) {
    console.log("[ERROR_CREATE_OFFER]", error);

    return new Response("Erro ao criar oferta", { status: 500 });
  }
}
