import bcrypt from "bcrypt";

import { prisma } from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const { newPassword, newPasswordConfirm, id } = await req.json();

    if (!id) {
      return new Response("Dados inválidos", { status: 401 });
    }

    if (newPasswordConfirm !== newPassword) {
      return new Response(
        "As senhas não coincidem, verifique e tente novamente",
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (!user) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    return Response.json({ changed: "true" }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_RECOVER_PASSWORD]", error);

    return new Response("Ocorreu um erro ao recuperar a senha", {
      status: 500,
    });
  }
}
