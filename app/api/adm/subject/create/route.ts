import { prisma } from "@/libs/prismadb";
import getCurrentUser from "@/app/action/getCurrentUser";
import { AccountRole } from "@prisma/client";

function checkIfArrayIsUnique(arr: string[]) {
  return arr.length !== new Set(arr).size;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { main, lang, subs } = body;
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.accountType !== AccountRole.ADMIN) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (checkIfArrayIsUnique(subs)) {
      return new Response(
        "Opções tem itens duplicados, verifique e tente novamente",
        { status: 401 },
      );
    }

    if (!main || !lang || subs.length === 0) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
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
      return new Response("Matéria já está cadastrada", { status: 401 });
    }

    if (optionsExists) {
      return new Response("Opções já estão cadastradas", { status: 401 });
    }

    await prisma.subject.create({
      data: {
        main,
        lang,
        subs,
      },
    });

    const subjects = await prisma.subject.findMany({});

    return Response.json(subjects, { status: 200 });
  } catch (error: any) {
    console.log("[ERROR_CREATE_SUBJECT]", error);
    return new Response("Ocorreu um erro na criação das matérias", error);
  }
}
