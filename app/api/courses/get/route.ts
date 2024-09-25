import { prisma } from "@/libs/prismadb";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const courses = await prisma.course.findMany();

    return Response.json(courses, { status: 200 });
  } catch (error) {
    console.log("[ERROR_GET_COURSES]", error);

    return new Response("Ocorreu um erro ao solicitar os cursos", {
      status: 500,
    });
  }
}
