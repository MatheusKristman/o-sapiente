import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        planActivationDate: null,
        planValidationDate: null,
        plan: {
          disconnect: true,
        },
      },
    });

    return new Response("Plano de 30 dias expirado!", { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_PLAN_EXPIRED]", error);

    return new Response("Ocorreu um erro ao expirar o plano", { status: 500 });
  }
}
