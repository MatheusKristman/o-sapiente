import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const admin = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.accountType !== AccountRole.ADMIN) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const subjects = await prisma.subject.findMany({});

    return Response.json(subjects, { status: 200 });
  } catch (error) {
    console.log("[ERROR_TO_GET_SUBJECTS]", error);

    return new Response("Ocorreu um erro ao resgatar as matérias", {
      status: 500,
    });
  }
}
