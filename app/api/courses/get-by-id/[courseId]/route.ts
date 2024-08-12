import { prisma } from "@/libs/prismadb";

export async function GET(res: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId;

    if (!courseId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return new Response("Curso não encontrado", { status: 404 });
    }

    return Response.json(course, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_GET_COURSE_BY_ID]", error);

    return new Response("Ocorreu um erro ao resgatar informações do curso", { status: 500 });
  }
}
