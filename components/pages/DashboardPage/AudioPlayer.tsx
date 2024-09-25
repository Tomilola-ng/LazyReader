"use client";

import { useState, useEffect, useRef } from "react";
import { LoaderIcon, PauseCircleIcon, PlayCircleIcon } from "lucide-react";

function LoadingOverlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the audio element
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set loading state when audio is loading
      setIsLoading(true);
      audio.oncanplay = () => {
        setIsLoading(false);
      };

      // When audio ends, reset play state
      audio.onended = () => {
        setIsPlaying(false);
      };

      return () => {
        // Clean up the audio instance when component unmounts or url changes
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="absolute bottom-6 mx-6 rounded-full textBg flexCenter gap-x-2 w-[90%] px-4 py-2 transition-all text-sm"
      onClick={togglePlayPause}
      disabled={isLoading}
    >
      {isLoading && <LoadingOverlay />}
      {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
      {isPlaying ? "Pause Summary" : "Play Summary"}
    </button>
  );
}
