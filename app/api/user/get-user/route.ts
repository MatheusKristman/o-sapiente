import { prisma } from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    if (session.user && session.user.email) {
      const student = await prisma.student.findUnique({
        where: {
          email: session.user.email,
        },
      });

      const professor = await prisma.professor.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (student) {
<<<<<<< Updated upstream
        return NextResponse.json({ id: student.id, type: student.accountType });
=======
        return NextResponse.json({
          id: student.id,
          type: student.accountType,
          firstName: student.firstName,
          lastName: student.lastName,
          profilePhoto: student.profilePhoto,
          email: student.email,
          tel: student.tel,
          birth: student.birth,
          cep: student.cep,
          city: student.city,
          address: student.address,
          addressNumber: student.addressNumber,
          state: student.state,
          district: student.district,
          complement: student.complement,
        });
>>>>>>> Stashed changes
      }

      if (professor) {
        return NextResponse.json({
          id: professor.id,
          type: professor.accountType,
        });
      }
    }
  } catch (error: any) {
    console.log(error, "GET-USER-ERROR");

    return new NextResponse(
      "Ocorreu um erro durante a requisição, tente novamente",
      { status: 400 },
    );
  }
}
