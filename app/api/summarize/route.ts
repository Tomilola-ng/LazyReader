import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

async function fetchFileContent(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.arrayBuffer();
}

export async function POST(req: NextRequest) {
  try {
    const { file } = await req.json();

    if (!file || !file.url) {
      return NextResponse.json(
        { message: "No file URL provided." },
        { status: 400 }
      );
    }

    // Fetch the file content
    const fileContent = await fetchFileContent(file.url);

    // Convert ArrayBuffer to Uint8Array
    const fileData = new Uint8Array(fileContent);

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type || "application/pdf",
          data: Buffer.from(fileData).toString('base64')
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

    return NextResponse.json({
      message: "File summarized successfully.",
      file: {
        key: file.key,
        name: file.name,
        url: file.url,
      },
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