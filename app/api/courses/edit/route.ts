import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const {
      courseId,
      courseName,
      themes,
      benefits,
      price,
      lessonsCount,
      hoursCount,
      isAd,
    } = await req.json();

    if (
      !courseId ||
      !courseName ||
      !price ||
      !lessonsCount ||
      !hoursCount ||
      !isAd
    ) {
      return new NextResponse("Dados inválidos", { status: 401 });
    }

    const courses = await prisma.course.findMany();
    const adQuantity = courses.filter((course) => course.isAd).length;

    if (adQuantity === 2 && isAd === "on") {
      return new NextResponse(
        "Quantidade de anúncios ultrapassando o limite definido",
        { status: 401 },
      );
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        courseName,
        themes: themes && themes.length > 0 ? themes : [],
        benefits: benefits && benefits.length > 0 ? benefits : [],
        price: price * 100,
        lessonsCount: Number(lessonsCount),
        hoursCount: Number(hoursCount),
        isAd: isAd === "on",
      },
    });

    if (!course) {
      return new NextResponse("Ocorreu um erro ao editar o curso", {
        status: 400,
      });
    }

    return NextResponse.json({ id: course.id }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_COURSE]", error);

    return new NextResponse("Ocorreu um erro ao adicionar um novo curso", {
      status: 500,
    });
  }
}
