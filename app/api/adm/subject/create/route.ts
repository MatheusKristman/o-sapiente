import { NextResponse } from "next/server";

import { prisma } from "@/libs/prismadb";

function checkIfArrayIsUnique(arr: string[]) {
  return arr.length !== new Set(arr).size;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { main, lang, subs } = body;

    if (checkIfArrayIsUnique(subs)) {
      return new NextResponse(
        "Opções tem itens duplicados, verifique e tente novamente",
      );
    }

    if (!main || !lang || subs.length === 0) {
      return new NextResponse("Dados inválidos, verifique e tente novamente");
    }

    const subjectExists = await prisma.subject.findFirst({
      where: {
        main,
      },
    });

    const optionsExists = await prisma.subject.findFirst({
      where: {
        subs: {
          hasSome: subs,
        },
      },
    });

    if (subjectExists) {
      return new NextResponse("Matéria já está cadastrada");
    }

    if (optionsExists) {
      return new NextResponse("Opções já estão cadastradas");
    }

    await prisma.subject.create({
      data: {
        main,
        lang,
        subs,
      },
    });

    const subjects = await prisma.subject.findMany({});

    return NextResponse.json(subjects);
  } catch (error: any) {
    console.log("[ERROR_CREATE_SUBJECT]", error);
    return new NextResponse("Ocorreu um erro na criação das matérias", error);
  }
}
