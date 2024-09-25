/**
 * This is API route to upload files to UploadThing
 * https://uploadthing.com/docs/api/upload
 */

import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file was uploaded.", status: 400 }, { status: 400 });
    }

    const fileWithPath = new File([file], file.name, { type: file.type }) as any;
    fileWithPath.path = file.name;

    const uploadResponse = await utapi.uploadFiles([fileWithPath]);

    if (!uploadResponse[0].data) {
      return NextResponse.json({ message: "Failed to upload file.", status: 500 }, { status: 500 });
    }

    return NextResponse.json({
      message: "File uploaded successfully.",
      file: {
        key: uploadResponse[0].data.key,
        name: uploadResponse[0].data.name,
        url: uploadResponse[0].data.url,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({
      message: "An error occurred while processing your request",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    }, { status: 500 });
  }
}
