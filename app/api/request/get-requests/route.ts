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

    if (teacherUser) {
      const requestData = await prisma.request.findMany({
        where: {
          theme: {
            in: teacherUser.themes,
          },
        },
      });
  
      if (requestData) {
        
        const requestDataWithStudentInfo: {
          id: string;
          theme: string;
          message: string;
          createdAt: Date;
          updatedAt: Date;
          studentId: string;
          firstName?: string;
          lastName?: string;
          profilePhoto?: string;
        }[] = [];
        
        if (requestData && requestData.length > 0) {
          for (const request of requestData) {
            const studentInfo = await prisma.student.findUnique({
              where: {
                id: request.studentId,
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
      }
    }

    const studentUser = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if(studentUser){
      const userRequests = await prisma.request.findMany({
        where: {
          studentId: studentUser.id,
        },
      });
  
      if(userRequests) {

        const requestDataWithStudentInfo: {
          id: string;
          theme: string;
          message: string;
          createdAt: Date;
          updatedAt: Date;
          studentId: string;
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
      }
    }

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
