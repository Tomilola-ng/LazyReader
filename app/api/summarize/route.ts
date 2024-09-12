import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const file = formData.get("file") as File; // Extracting the file from the formData

    if (!file) {
      return NextResponse.json(
        { message: "No file was uploaded." },
        { status: 400 }
      );
    }
    const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });

    // Create the file upload request
    const fileResponse = await openai.files.create({
      file: new File([fileBlob], file.name, { type: file.type }),
      purpose: "assistants", // Specify the purpose of the file
    });

    const completionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes ebooks.",
        },
        {
          role: "user",
          content:
            "Please summarize the following ebook content based on its headings. Provide the summary in markdown format.",
        },
        {
          role: "user",
          content: `Please summarize the content of the file with ID: ${fileResponse.id}`,
        },
      ],
    });

    const summary = completionResponse;
    console.log("Summary:", summary);

    return NextResponse.json(
      {
        message: "File summarized successfully.",
        summary,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "=============================================",
      "Error processing request:",
      error
    );
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
