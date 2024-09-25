import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function POST(req: NextRequest) {
  
  try {
    const { file } = await req.json();

    if (!file) {
      return NextResponse.json(
        { message: "No file URL provided." },
        { status: 400 }
      );
    }

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: "application/pdf",
          fileUri: file,
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
