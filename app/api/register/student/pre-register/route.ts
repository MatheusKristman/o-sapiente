import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { prisma } from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return new NextResponse("Informação incompleta, verifique e tente novamente", {
        status: 406,
      });
    }

    const userExists = await prisma.student.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("Usuário já cadastrado!", { status: 405 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        tel: body.tel,
        password: hashedPassword,
      },
    });

    if (body.theme && body.message) {
      await prisma.request.create({
        data: {
          theme: body.theme,
          message: body.message,
          student: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    return NextResponse.json({ id: user.id });
  } catch (error: any) {
    console.log("[STUDENT_PRE_REGISTER_ERROR]", error);

    return new NextResponse("Ocorreu um erro, tente novamente!", {
      status: 400,
    });
  }
}
