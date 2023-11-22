import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = await body;

    if (!email) {
      return new NextResponse("Dados invalidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const teacherUser = await prisma.professor.findFirst({
      where: {
        email,
      },
    });

    console.log(teacherUser)

    if (!teacherUser) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const requestData = await prisma.request.findMany({
      where: {
        theme: {
          in: teacherUser.themes,
        },
      },
    });

    console.log("Request Data: ", requestData)

    if (requestData) {
      return NextResponse.json(requestData);
    }

    console.log("PASSEI AQUI")
    const studentUser = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!studentUser) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const userRequests = await prisma.request.findMany({
      where: {
        studentId: studentUser.id,
      },
    });

    if(userRequests) {
      return NextResponse.json(userRequests);
    }
  } catch (error) {
    console.log("[ERROR_GET_REQUEST]", error);
    return new NextResponse("Ocorreu um erro na solicitação do pedido", {
      status: 400,
    });
  }
}
