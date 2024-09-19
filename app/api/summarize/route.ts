import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const fileManager = new GoogleAIFileManager(
  process.env.GEMINI_API_KEY as string
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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

    const filePath = path.join(process.cwd(), "tmp", file.name);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: file.type,
      displayName: file.name,
    });

    if (!uploadResponse.file) {
      return NextResponse.json({
        message: "Failed to upload file.",
        status: 500,
      });
    }

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: "Can you give a detailed summary of this ebook?" },
    ]);

    const summary = result.response.text();

    if (!summary) {
      return NextResponse.json({
        message: "Failed to generate summary.",
        status: 500,
      });
    }

    // Remove the file after use
    // fs.unlinkSync(filePath);

    return NextResponse.json({
      message: "File summarized successfully.",
      summary,
      status: 200,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({
      message: "An error occurred while processing your request",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    });
  }
}
