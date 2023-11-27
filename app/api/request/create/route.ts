import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, description, email } = await body;

    if (!subject || !description || !email) {
      return new NextResponse("Dados invalidos, verifique e tente novamente", { status: 401 });
    }

    const student = await prisma.user.findFirst({
      where: {
        email,
        accountType: AccountRole.STUDENT,
      },
    });

    if (!student) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const newRequest = await prisma.request.create({
      data: {
        subject,
        description,
        userIds: [student.id],
      },
    });

    await prisma.user.update({
      where: {
        email,
        accountType: AccountRole.STUDENT,
      },
      data: {
        requestIds: {
          push: newRequest.id,
        },
      },
    });

    return NextResponse.json({ sended: true });
  } catch (error) {
    console.log("[ERROR_POST_REQUEST]", error);
    return new NextResponse("Ocorreu um erro na solicitação do pedido", { status: 400 });
  }
}
