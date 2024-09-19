import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "user1" }); // Fake auth function

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "2GB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url); // This is where you get the file URL
      return { uploadedBy: metadata.userId, fileUrl: file.url }; // Return the URL if needed
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
