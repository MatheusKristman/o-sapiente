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
      const requestData = await prisma.request.findMany({
        where: {
          subject: {
            in: teacherUser.themes,
          },
        },
      });

      if (requestData) {
        const requestDataWithStudentInfo: {
          id: string;
          subject: string;
          description: string;
          createdAt: Date;
          updatedAt: Date;
          userIds: string[];
          firstName?: string;
          lastName?: string;
          profilePhoto?: string;
        }[] = [];

        if (requestData && requestData.length > 0) {
          for (const request of requestData) {
            const studentInfo = await prisma.user.findUnique({
              where: {
                id: request.userIds[0],
                accountType: AccountRole.STUDENT,
              },
            });

            requestDataWithStudentInfo.push({
              ...request,
              firstName: studentInfo?.firstName,
              lastName: studentInfo?.lastName,
              profilePhoto: studentInfo?.profilePhoto ?? undefined,
            });
          }

          return NextResponse.json(requestDataWithStudentInfo);
        }
      } else {
        return new NextResponse("Nenhuma solicitação foi encontrada", { status: 404 });
      }
    }

    const studentUser = await prisma.user.findUnique({
      where: {
        email,
        accountType: AccountRole.STUDENT,
      },
    });

    if (studentUser) {
      const userRequests = await prisma.request.findMany({
        where: {
          userIds: {
            has: studentUser.id,
          },
        },
      });

      if (userRequests) {
        const requestDataWithStudentInfo: {
          id: string;
          subject: string;
          description: string;
          createdAt: Date;
          updatedAt: Date;
          userIds: string[];
          firstName?: string;
          lastName?: string;
          profilePhoto?: string;
        }[] = [];

        if (userRequests && userRequests.length > 0) {
          for (const request of userRequests) {
            requestDataWithStudentInfo.push({
              ...request,
              firstName: studentUser?.firstName,
              lastName: studentUser?.lastName,
              profilePhoto: studentUser?.profilePhoto ?? undefined,
            });
          }

          return NextResponse.json(requestDataWithStudentInfo);
        }
      } else {
        return new NextResponse("Nenhuma solicitação foi encontrada", { status: 404 });
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
