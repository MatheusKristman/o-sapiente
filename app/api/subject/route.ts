import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lang = searchParams.get("lang");

    if (lang !== "br") {
      // ir adicionando de acordo que for adicionando linguagens
      return new NextResponse("Selecione uma linguagem válida");
    }

    const subjects = await prisma.subject.findMany({
      where: {
        lang,
      },
    });

    if (!subjects) {
      return new NextResponse("Não possui matérias cadastradas no momento", {
        status: 404,
      });
    }

    return NextResponse.json(subjects);
  } catch (error: any) {
    console.log("[ERROR_GET_SUBJECT]", error);
    return new NextResponse("Ocorreu um erro na requisição das matérias", {
      status: 400,
    });
  }
}
