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
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (!user) {
        return new NextResponse("Usuário não encontrado", { status: 404 });
      }

      return NextResponse.json({
        id: user.id,
        type: user.accountType,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.profilePhoto,
        email: user.email,
        tel: user.tel,
        birth: user.birth,
        cep: user.cep,
        city: user.city,
        address: user.address,
        addressNumber: user.addressNumber,
        state: user.state,
        district: user.district,
        complement: user.complement,
        themes: user.themes,
        aboutMe: user.aboutMe,
      });
    }
  } catch (error: any) {
    console.log(error, "GET-USER-ERROR");

    return new NextResponse("Ocorreu um erro durante a requisição, tente novamente", {
      status: 400,
    });
  }
}
