import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { offerId: string } },
) {
  try {
    const offerId = params.offerId;
    const currentUser = await getCurrentUser();

    if (!offerId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    if (!currentUser) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        request: true,
      },
    });

    if (!offer) {
      return new Response("Proposta não encontrada", { status: 404 });
    }

    return Response.json(
      { id: offer.id, otherUserId: offer.userId, requestId: offer.requestId },
      { status: 200 },
    );
  } catch (error) {
    console.log("[ERROR_GET_OFFER]", error);

    return new Response("Ocorreu um erro ao resgatar a solicitação", {
      status: 500,
    });
  }
}
