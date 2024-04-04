import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = await body;

    if (!email) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const teacherUser = await prisma.user.findFirst({
      where: {
        email,
        accountType: AccountRole.PROFESSOR,
      },
    });

    if (teacherUser) {
      const request = await prisma.request.findMany({
        include: {
          users: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              accountType: true,
              profilePhoto: true,
              subjectIds: true,
              requestIds: true,
              seenMessageIds: true,
            },
          },
          offers: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  profilePhoto: true,
                },
              },
            },
          },
        },
      });

      if (request) {
        return NextResponse.json(request);
      } else {
        return new NextResponse("Nenhuma solicitação foi encontrada", {
          status: 404,
        });
      }
    }

    const studentUser = await prisma.user.findUnique({
      where: {
        email,
        accountType: AccountRole.STUDENT,
      },
    });

    if (studentUser) {
      const request = await prisma.request.findMany({
        where: {
          userIds: {
            has: studentUser.id,
          },
        },
        include: {
          users: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              accountType: true,
              profilePhoto: true,
              subjectIds: true,
              requestIds: true,
              seenMessageIds: true,
            },
          },
          offers: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  profilePhoto: true,
                },
              },
            },
          },
        },
      });

      if (request) {
        return NextResponse.json(request);
      } else {
        return new NextResponse("Nenhuma solicitação foi encontrada", {
          status: 404,
        });
      }
    }

    //Teste
    if (!studentUser && !teacherUser) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }
  } catch (error) {
    console.log("[ERROR_GET_REQUEST]", error);
    return new NextResponse("Ocorreu um erro na solicitação do pedido", {
      status: 400,
    });
  }
}
