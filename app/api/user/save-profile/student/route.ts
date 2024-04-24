import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function PATCH(req: Request) {
    try {
        const data = await req.formData();
        const id: string = data.get("id") as string;

        const student = await prisma.user.findFirst({
            where: {
                id,
                accountType: AccountRole.STUDENT,
            },
        });

        if (!student) {
            return new NextResponse("Usuário não encontrado", { status: 404 });
        }

        return NextResponse.json({
            firstName: student.firstName,
            lastName: student.lastName,
            profilePhoto: student.profilePhoto,
            accountType: student.accountType,
        });
    } catch (error: any) {
        console.log(error, "PROFILE_PHOTO");

        return new NextResponse("Ocorreu um erro, tente novamente!", {
            status: 400,
        });
    }
}
