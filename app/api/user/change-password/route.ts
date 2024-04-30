import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { newPassword, newPasswordConfirm } = await body;
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.email) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    if (newPassword !== newPasswordConfirm) {
      return new NextResponse(
        "Senhas não coincidem, verifique e tente novamente",
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        email: currentUser.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ passwordUpdated: true });
  } catch (error) {
    console.log("[CHANGE_PASSWORD_ERROR]", error);
    return new NextResponse(
      "Ocorreu um erro durante a troca da senha, tente novamente mais tarde",
      { status: 400 },
    );
  }
}
