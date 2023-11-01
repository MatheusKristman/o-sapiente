import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lang = searchParams.get("lang");
    const allSubs: string[] = [];

    if (lang !== "br") {
      // ir adicionando de acordo que for adicionando linguagens
      return new NextResponse("Selecione uma linguagem válida", { status: 401 });
    }

    const subjects = await prisma.subject.findMany({
      where: {
        lang,
      },
    });

    if (!subjects) {
      return new NextResponse("Não possui matérias cadastradas no momento", { status: 404 });
    }

    subjects.map((subject) => {
      allSubs.push(...subject.subs);
    });

    return NextResponse.json(allSubs);
  } catch (error: any) {
    console.log("[ERROR_GET_ALL_SUBS]", error);
    return new NextResponse("Ocorreu um erro na requisição das opções das matérias", {
      status: 400,
    });
  }
}
