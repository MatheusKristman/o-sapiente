import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, confirmed, type } = await body;

    if (!id || !confirmed || !type) {
      return new NextResponse("Dados inválidos", { status: 401 });
    }

    if (type === "student") {
      await prisma.student.update({
        where: {
          id,
        },
        data: {
          isConfirmed: JSON.parse(confirmed),
        },
      });
    }

    if (type === "professor") {
      await prisma.professor.update({
        where: {
          id,
        },
        data: {
          isConfirmed: JSON.parse(confirmed),
        },
      });
    }

    return NextResponse.json({ message: "Conta confirmada com sucesso" });
  } catch (error) {
    console.log("[ERROR_ON_CONFIRMATION_ACCOUNT]", error);

    return new NextResponse(
      "Ocorreu um erro durante a confirmação da conta, tente novamente mais tarde",
      { status: 400 },
    );
  }
}
