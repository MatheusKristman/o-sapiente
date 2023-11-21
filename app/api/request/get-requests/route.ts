import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, message, email } = await body;

    if (!subject || !message || !email) {
      return new NextResponse("Dados invalidos, verifique e tente novamente", { status: 401 });
    }

    const user = await prisma.student.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    await prisma.request.create({
      data: {
        theme: subject,
        message: message,
        student: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({ sended: true });
  } catch (error) {
    console.log("[ERROR_POST_REQUEST]", error);
    return new NextResponse("Ocorreu um erro na solicitação do pedido", { status: 400 });
  }
}
