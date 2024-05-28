import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { adminId, userId } = await req.json();

    if (!userId || !adminId) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const admin = await prisma.user.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin || admin.accountType !== AccountRole.ADMIN) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          accountType: AccountRole.ADMIN,
        },
      },
      include: {
        requests: {
          select: {
            id: true,
            subject: true,
            description: true,
            createdAt: true,
            status: true,
            beginLessonDate: true,
            lessonDate: true,
            lessonPrice: true,
            certificateRequested: true,
            users: true,
          },
        },
      },
    });

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_ADMIN_BAN_USER]", error);

    return new Response("Ocorreu um erro ao banir o usuário", { status: 400 });
  }
}
