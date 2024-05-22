import { AccountRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const {
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
      aboutMe,
    } = await body;

    if (!currentUser || !currentUser.email) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    if (themes.length === 0) {
      return new NextResponse(
        "É necessário ter pelo menos 1 tema selecionado",
        { status: 401 },
      );
    }

    const professor = await prisma.user.update({
      where: {
        email: currentUser.email,
        accountType: AccountRole.PROFESSOR,
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
        themes,
        aboutMe,
      },
    });

    if (!professor) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    return NextResponse.json(professor);
  } catch (error) {
    console.log("[UPDATE_ACCOUNT_ERROR]", error);
    return new NextResponse("Ocorreu um erro na atualização do cadastro", {
      status: 400,
    });
  }
}
