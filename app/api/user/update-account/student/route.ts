import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      firstName,
      lastName,
      birth,
      city,
      state,
      address,
      addressNumber,
      ddd,
      cel,
      district,
      complement,
    } = await body;

    if (!email) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    const student = await prisma.student.update({
      where: {
        email,
      },
      data: {
        firstName,
        lastName,
        birth,
        city,
        state,
        address,
        addressNumber,
        tel: `(${ddd}) ${cel}`,
        district,
        complement,
      },
    });

    if (!student) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.log("[UPDATE_ACCOUNT_ERROR]", error);
    return new NextResponse("Ocorreu um erro na atualização do cadastro", { status: 400 });
  }
}
