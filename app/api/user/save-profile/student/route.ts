import S3 from "aws-sdk/clients/s3";
import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function PATCH(req: Request) {
  // try {
  //   const s3 = new S3({
  //     region: "sa-east-1",
  //     accessKeyId: process.env.NEXT_S3_PUBLIC_ACCESS_KEY,
  //     secretAccessKey: process.env.NEXT_S3_PUBLIC_SECRET_KEY,
  //     signatureVersion: "v4",
  //   });
  //
  //   const data = await req.formData();
  //   const file: File | null = data.get("profilePhoto") as unknown as File;
  //   const id: string = data.get("id") as string;
  //
  //   if (!file) {
  //     const student = await prisma.user.findFirst({
  //       where: {
  //         id,
  //         accountType: AccountRole.STUDENT,
  //       },
  //     });
  //
  //     if (!student) {
  //       return new NextResponse(
  //         "Aluno não encontrado, verifique e tente novamente",
  //         {
  //           status: 404,
  //         },
  //       );
  //     }
  //
  //     return NextResponse.json({
  //       firstName: student.firstName,
  //       lastName: student.lastName,
  //       profilePhoto: student.profilePhoto,
  //       type: "student",
  //     });
  //   }
  //
  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);
  //
  //   let errorOnS3 = false;
  //
  //   const fileParams = {
  //     Bucket: `${process.env.NEXT_S3_PUBLIC_BUCKET_NAME}/profile`,
  //     Key: file.creditCvc,
  //     Expires: 600,
  //     ContentType: file.type,
  //   };
  //
  //   const url = await s3.getSignedUrlPromise("putObject", fileParams);
  //
  //   const student = await prisma.user.update({
  //     where: {
  //       id,
  //       accountType: AccountRole.STUDENT,
  //     },
  //     data: {
  //       profilePhoto: `${process.env.NEXT_S3_PUBLIC_URL}/profile/${file.creditCvc}`,
  //     },
  //   });
  //
  //   if (!student) {
  //     return new NextResponse("Usuário não encontrado", { status: 404 });
  //   }
  //
  //   await axios
  //     .put(url, buffer, {
  //       headers: {
  //         "Content-type": String(file.type),
  //       },
  //     })
  //     .then(() => {
  //       errorOnS3 = false;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error) {
  //         errorOnS3 = true;
  //       }
  //     });
  //
  //   if (errorOnS3) {
  //     console.log("erro no s3");
  //     await prisma.user.update({
  //       where: {
  //         id,
  //         accountType: AccountRole.STUDENT,
  //       },
  //       data: {
  //         profilePhoto: "",
  //       },
  //     });
  //
  //     return new NextResponse(
  //       "Ocorreu um erro durante o envio, tente novamente!",
  //       { status: 424 },
  //     );
  //   }
  //
  //   return NextResponse.json({
  //     firstName: student.firstName,
  //     lastName: student.lastName,
  //     profilePhoto: student.profilePhoto,
  //     accountType: student.accountType,
  //   });
  // } catch (error: any) {
  //   console.log(error, "PROFILE_PHOTO");
  //
  //   return new NextResponse("Ocorreu um erro, tente novamente!", {
  //     status: 400,
  //   });
  // }

  // TODO: atualizar rota para uploadthing
  return new Response("Atualizar rota save-profile", { status: 500 });
}
