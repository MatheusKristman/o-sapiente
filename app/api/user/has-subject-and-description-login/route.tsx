import { NextResponse } from "next/server";
import { AccountRole } from "@prisma/client";
import bcrypt from "bcrypt";

import { prisma } from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, description, email, password } = body;

    if (!email || !password || !subject || !description) {
      return new NextResponse("Credenciais inválidas! Verifique e tente novamente", {
        status: 404,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
        accountType: AccountRole.STUDENT,
      },
    });

    if (!user) {
      return new NextResponse("Credenciais inválidas! Verifique e tente novamente", {
        status: 404,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return new NextResponse("Credenciais inválidas! Verifique e tente novamente", {
        status: 406,
      });
    }

    await prisma.request.create({
      data: {
        subject,
        description,
        userIds: [user.id],
      },
    });

    return NextResponse.json({
      id: user.id,
      email,
      password,
      message: "Solicitação enviada com sucesso!",
    });
  } catch (error: any) {
    console.log(error, "HAS-THEME-AND-MESSAGE-ERROR");

    return new NextResponse("Ocorreu um erro durante o login, tente novamente", { status: 400 });
  }
}
