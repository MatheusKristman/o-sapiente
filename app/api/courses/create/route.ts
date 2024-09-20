import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseName, themes, benefits, price } = await req.json();

    if (!courseName || !price) {
      return new NextResponse("Dados inválidos", { status: 401 });
    }

    const course = await prisma.course.create({
      data: {
        courseName,
        courseImage: "",
        themes: themes && themes.length > 0 ? themes : [],
        benefits: benefits && benefits.length > 0 ? benefits : [],
        price: price * 100,
      },
    });

    if (!course) {
      return new NextResponse("Ocorreu um erro ao adicionar um novo curso", {
        status: 400,
      });
    }

    const newCourses = await prisma.course.findMany();

    if (!newCourses) {
      return new NextResponse("Ocorreu um erro ao resgatar os cursos criados", {
        status: 400,
      });
    }

    return NextResponse.json({ newCourses }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_COURSE]", error);

    return new NextResponse("Ocorreu um erro ao adicionar um novo curso", {
      status: 500,
    });
  }
}
