import bcrypt from "bcrypt";

import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { theme, message, email, password } = body;

    if (!email || !password || !theme || !message) {
      return new NextResponse(
        "Credenciais inválidas! Verifique e tente novamente",
        { status: 404 },
      );
    }

    const user = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse(
        "Credenciais inválidas! Verifique e tente novamente",
        { status: 404 },
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return new NextResponse(
        "Credenciais inválidas! Verifique e tente novamente",
        { status: 406 },
      );
    }

    await prisma.request.create({
      data: {
        theme,
        message,
        student: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({
      email,
      password,
      message: "Solicitação enviada com sucesso!",
    });
  } catch (error: any) {
    console.log(error, "HAS-THEME-AND-MESSAGE-ERROR");

    return new NextResponse(
      "Ocorreu um erro durante o login, tente novamente",
      { status: 400 },
    );
  }
}
