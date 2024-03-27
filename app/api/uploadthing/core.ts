import { prisma } from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
  imageMessage: f({ image: { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerSession();

      if (!session || !session?.user) {
        throw new UploadThingError("Não autorizado");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email!,
        },
      });

      if (!user) {
        throw new UploadThingError("Usuário não encontrado");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
