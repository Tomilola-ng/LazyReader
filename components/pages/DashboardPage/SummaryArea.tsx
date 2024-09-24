"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import ReactMarkdown from "react-markdown";
import AudioPlayer from "./AudioPlayer";

export default function SummaryArea({
  summaryData,
  audioUrl,
}: {
  summaryData: string;
  audioUrl: string;
}) {
  return (
    <section className="p-4 w-full overflow-hdden relative">
      <h2 className="text-2xl font-bold mb-4">Your Summary</h2>
      <ScrollArea className="mb-4 max-h-[calc(100dvh-10rem)] overflow-y-scroll hide-scrollbar">
        <ReactMarkdown className={"prose dark:prose-invert"}>
          {summaryData}
        </ReactMarkdown>
      </ScrollArea>

      <AudioPlayer audioUrl={audioUrl} />
    </section>
  );
}
