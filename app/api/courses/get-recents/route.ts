import { prisma } from "@/libs/prismadb";
import { Course } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const courses = await prisma.course.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isAd: false,
      },
    });

    const lengthNeeded = 10;

    let newCourses: Course[] = [];

    if (courses.length !== 0 && courses.length < lengthNeeded) {
      while (newCourses.length < lengthNeeded) {
        newCourses = newCourses.concat(courses);
      }
    } else {
      newCourses = courses;
    }

    newCourses = newCourses.slice(0, lengthNeeded);

    return Response.json(newCourses, { status: 200 });
  } catch (error) {
    console.log("[ERROR_GET_COURSES]", error);

    return new Response("Ocorreu um erro ao solicitar os cursos", {
      status: 500,
    });
  }
}
