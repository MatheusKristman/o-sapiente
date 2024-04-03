import S3 from "aws-sdk/clients/s3";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { prisma } from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  try {
    const s3 = new S3({
      region: "sa-east-1",
      accessKeyId: process.env.NEXT_S3_PUBLIC_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_S3_PUBLIC_SECRET_KEY,
      signatureVersion: "v4",
    });

    const data = await req.formData();
    const file: File | null = data.get("profilePhoto") as unknown as File;
    const email: string = data.get("email") as string;
    const profileType: string = data.get("profileType") as string;

    if (!file) {
      return new NextResponse("Foto não encontrada, verifique e tente novamente", { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let errorOnS3 = false;

    const fileParams = {
      Bucket: `${process.env.NEXT_S3_PUBLIC_BUCKET_NAME}/profile`,
      Key: file.creditCvc,
      Expires: 600,
      ContentType: file.type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios
      .put(url, buffer, {
        headers: {
          "Content-type": String(file.type),
        },
      })
      .then(() => {
        errorOnS3 = false;
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          errorOnS3 = true;
        }
      });

    if (errorOnS3) {
      return new NextResponse("Ocorreu um erro durante o envio, tente novamente!", { status: 424 });
    }

    let user;

    user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        profilePhoto: `${process.env.NEXT_S3_PUBLIC_URL}/profile/${file.creditCvc}`,
      },
    });

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    return NextResponse.json({
      profilePhoto: user.profilePhoto,
    });
  } catch (error: any) {
    console.log(error, "PROFILE_PHOTO_UPDATE");

    return new NextResponse("Ocorreu um erro, tente novamente!", {
      status: 400,
    });
  }
}
