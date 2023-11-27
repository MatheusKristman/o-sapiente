import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, newPassword, newPasswordConfirm, profileType } = await body;

    if (!email) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    if (newPassword !== newPasswordConfirm) {
      return new NextResponse("Senhas não coincidem, verifique e tente novamente", { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        email,
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
