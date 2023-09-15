import S3 from "aws-sdk/clients/s3";
import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/libs/prismadb";

export async function POST(req: Request) {
  const s3 = new S3({
    region: "sa-east-1",
    accessKeyId: process.env.NEXT_S3_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_S3_PUBLIC_SECRET_KEY,
    signatureVersion: "v4",
  });

  try {
    const data = await req.formData();
    const file: File | null = data.get("ProfilePhoto") as unknown as File;
    const id: string = data.get("id") as string;

    if (!file) {
      return new NextResponse("Foto de perfil não enviada, tente novamente", {
        status: 404,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileParams = {
      Bucket: `${process.env.NEXT_S3_PUBLIC_BUCKET_NAME}/profile`,
      Key: file.name,
      Expires: 600,
      ContentType: file.type,
    };

    const user = await prisma.student.update({
      where: {
        id,
      },
      data: {
        profilePhoto: `${process.env.NEXT_S3_PUBLIC_URL}/profile/${file.name}`,
      },
    });

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios.put(url, buffer, {
      headers: {
        "Content-type": String(file.type),
      },
    });

    return new NextResponse("Foto enviada com sucesso", { status: 200 });
  } catch (error: any) {
    console.log(error, "PROFILE_PHOTO");

    return new NextResponse("Ocorreu um erro, tente novamente!", {
      status: 400,
    });
  }
}
