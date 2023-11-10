import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, tel, password, passwordConfirm } = body;

    if (!firstName || !lastName || !email || !tel || !password || !passwordConfirm) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", { status: 401 });
    }

    const userExists = await prisma.professor.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("Usuário já está cadastrado", { status: 405 });
    }

    if (password !== passwordConfirm) {
      return new NextResponse("Senhas não coincidem, verifique e tente novamente", { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.professor.create({
      data: {
        firstName,
        lastName,
        email,
        tel,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ id: user.id });
  } catch (error: any) {
    console.log("[ERROR_PROFESSOR_PRE_REGISTER]", error);
    return new NextResponse("Ocorreu um erro durante o cadastro, tente novamente!", {
      status: 400,
    });
  }
}
