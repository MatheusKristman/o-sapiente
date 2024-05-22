import { isAfter } from "date-fns";

import { prisma } from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const { passwordRequested, passwordDate, userId } = await req.json();

    const passwordRequestedConverted = JSON.parse(passwordRequested);

    if (
      !passwordRequestedConverted ||
      isAfter(new Date(), new Date(passwordDate)) ||
      !userId
    ) {
      return new Response("Solicitação Inválida", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user && !user.passwordRecoverRequested) {
      return Response.json({ confirmed: false }, { status: 200 });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordRecoverRequested: !passwordRequestedConverted,
      },
    });

    return Response.json({ confirmed: true }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CONFIRM_FORGOT_PASSWORD]", error);

    return new Response(
      "Ocorreu um erro ao confirmar a solicitação da troca de senha",
      { status: 500 },
    );
  }
}
