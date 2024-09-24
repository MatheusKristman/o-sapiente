import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const {
      courseName,
      themes,
      benefits,
      price,
      lessonsCount,
      hoursCount,
      isAd,
    } = await req.json();

    if (!courseName || !price || !lessonsCount || !hoursCount || !isAd) {
      return new NextResponse("Dados inválidos", { status: 401 });
    }

    const courses = await prisma.course.findMany();
    const adQuantity = courses.filter((course) => course.isAd).length;

    if (adQuantity === 2 && isAd === "on") {
      return new NextResponse(
        "Quantidade de anúncios ultrapassando o limite definido, retire outro curso dos anúncios para poder adicionar o atual",
        { status: 401 },
      );
    }

    const course = await prisma.course.create({
      data: {
        courseName,
        themes: themes && themes.length > 0 ? themes : [],
        benefits: benefits && benefits.length > 0 ? benefits : [],
        lessonsCount: Number(lessonsCount),
        hoursCount: Number(hoursCount),
        price: price * 100,
        isAd: isAd === "on",
      },
    });

    if (!course) {
      return new NextResponse("Ocorreu um erro ao adicionar um novo curso", {
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
