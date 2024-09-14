"use client";

import { useState } from "react";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleAudioEnded = () => setIsPlaying(false);
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <>
      <button
        className="absolute bottom-6 mx-6 rounded-full textBg flexCenter gap-x-2 w-[90%] px-4 py-2 transition-all text-sm"
        onClick={togglePlayPause}
      >
        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
        {isPlaying ? "Pause Summary" : "Play Summary"}
      </button>
      <audio
        src={audioUrl}
        controls={false}
        onEnded={handleAudioEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      ></audio>
    </>
  );
}
