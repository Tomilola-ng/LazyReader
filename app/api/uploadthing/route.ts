/**
 * This is API route to upload files to UploadThing
 * https://uploadthing.com/docs/api/upload
 */

import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

interface FileEsque extends Blob {
  name: string;
  customId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({
        message: "No file was uploaded.",
        status: 400,
      });
    }

    // const filePath = file.name;

    // const uploadResponse = await utapi.uploadFiles([filePath]);

    // if (!uploadResponse.file) {
    //   return NextResponse.json({
    //     message: "Failed to upload file.",
    //     status: 500,
    //   });
    // }

    // return NextResponse.json({
    //   message: "File uploaded successfully.",
    //   file: uploadResponse.file,
    //   status: 200,
    // });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({
      message: "An error occurred while processing your request",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    });
  }
}
