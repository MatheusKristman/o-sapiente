import { prisma } from "@/libs/prismadb";

export async function PUT(req: Request) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return new Response("Dados inválidos", { status: 404 });
    }

    const courseRemoved = await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    if (!courseRemoved) {
      return new Response("Ocorreu um error ao deletar o curso", {
        status: 400,
      });
    }

    const coursesUpdated = await prisma.course.findMany({});

    return Response.json({ courses: coursesUpdated }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_DELETE_COURSE]", error);

    return new Response("Ocorreu um erro ao deletar o curso", {
      status: 500,
    });
  }
}
