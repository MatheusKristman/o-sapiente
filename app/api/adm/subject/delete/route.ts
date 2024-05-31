import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { subjectId } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.accountType !== AccountRole.ADMIN) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (!subjectId) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const subjectExists = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });

    if (!subjectExists) {
      return new Response("Matéria não encontrada", { status: 404 });
    }

    await prisma.subject.delete({
      where: {
        id: subjectId,
      },
    });

    const subjects = await prisma.subject.findMany({});

    return Response.json(subjects, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_ADMIN_SUBJECT_DELETE]", error);

    return new Response("Ocorreu um erro ao deletar a matéria", {
      status: 500,
    });
  }
}
