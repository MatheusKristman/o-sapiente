import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";
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
      themes,
      aboutMe: resume,
    } = await body;

    if (!email) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    if (themes.length === 0) {
      return new NextResponse("É necessario ter pelo menos 1 tema selecionado", { status: 401 });
    }

    const professor = await prisma.user.update({
      where: {
        email,
        accountType: AccountRole.PROFESSOR,
      },
      data: {
        firstName,
        lastName,
        birth,
        city: city === "Cidade" ? "" : city,
        state: state === "Estado" ? "" : state,
        address,
        addressNumber,
        tel: `(${ddd}) ${cel}`,
        district,
        complement,
        themes,
        resume,
      },
    });

    if (!professor) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    return NextResponse.json(professor);
  } catch (error) {
    console.log("[UPDATE_ACCOUNT_ERROR]", error);
    return new NextResponse("Ocorreu um erro na atualização do cadastro", { status: 400 });
  }
}
