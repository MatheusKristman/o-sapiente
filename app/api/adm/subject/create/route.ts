import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { main, lang, subs } = body;

    // TODO verificar erro de subs duplicadas tanto quando é enviado quanto para ver se ja tem cadastrado

    if (!main || !lang || subs.length === 0) {
      return new NextResponse("Dados inválidos, verifique e tente novamente");
    }

    const subjectExists = await prisma.subject.findFirst({
      where: {
        main,
      },
    });

    if (subjectExists) {
      return new NextResponse("Matéria já está cadastrada");
    }

    const newSubject = await prisma.subject.create({
      data: {
        main,
        lang,
        subs,
      },
    });

    return NextResponse.json(newSubject);
  } catch (error: any) {
    console.log("[ERROR_CREATE_SUBJECT]", error);
    return new NextResponse("Ocorreu um erro na criação das matérias", error);
  }
}
