import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient, ElevenLabs } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY,
});

export async function GET(req: NextRequest) {
  try {
    const voices = await client.voices.getAll();
    return NextResponse.json({
      message: "Eleven Labs API is accessible",
      voices,
    });
  } catch (error) {
    console.error("Error accessing Eleven Labs API:", error);
    return NextResponse.json({
      message: "Failed to access Eleven Labs API",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text") as string;

    if (!text) {
      return NextResponse.json({
        message: "No text was provided.",
        status: 400,
      });
    }

    const response = await client.textToSpeech.convert("pMsXgVXv3BLzUgSXRplE", {
      optimize_streaming_latency: ElevenLabs.OptimizeStreamingLatency.Zero,
      output_format: ElevenLabs.OutputFormat.Mp32205032,
      text,
      voice_settings: {
        stability: 0.1,
        similarity_boost: 0.3,
        style: 0.2,
      },
    });

    if (!response) {
      console.error("No response received from Eleven Labs API");
      return NextResponse.json({
        message: "Failed to generate audio.",
        status: 500,
      });
    }

    const chunks = [];
    for await (const chunk of response) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    console.log(
      "Audio generated successfully. Buffer size:",
      audioBuffer.length
    );

    const audioResponse = new NextResponse(audioBuffer);

    audioResponse.headers.set("Content-Type", "audio/mpeg");
    audioResponse.headers.set("Content-Length", audioBuffer.length.toString());

    return audioResponse;
  } catch (error) {
    console.error("Detailed error in API route:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json({
      message: "An error occurred while processing your request",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    });
  }
}
