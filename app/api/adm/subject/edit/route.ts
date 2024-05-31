import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { subjectId, main, subs, lang } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.accountType !== AccountRole.ADMIN) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (!subjectId || !main || !subs || subs.length === 0 || !lang) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const subjectExists = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });

    if (!subjectExists) {
      return new Response("Matéria não encontrada", { status: 404 });
    }

    await prisma.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        main,
        subs,
        lang,
      },
    });

    const newSubjects = await prisma.subject.findMany({});

    return Response.json({ subjects: newSubjects }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_ADMIN_SUBJECT_EDIT]", error);

    return new Response("Ocorreu um erro ao editar a matéria", { status: 500 });
  }
}
