import { prisma } from "@/libs/prismadb";

interface IParams {
  requestId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const { requestId } = params;

    if (!requestId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const request = await prisma.request.findUnique({
      where: {
        id: requestId,
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
      },
    });

    if (!request) {
      return new Response("Solicitação não encontrada", { status: 404 });
    }

    return Response.json(request);
  } catch (error) {
    console.log("[ERROR_GET_REQUEST_BY_ID]", error);

    return new Response("Ocorreu um erro na requisição da solicitação", {
      status: 500,
    });
  }
}
