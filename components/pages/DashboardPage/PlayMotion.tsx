"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface FuturisticAudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function FuturisticAudioPlayer({
  isPlaying,
  onTogglePlay,
}: FuturisticAudioPlayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-900">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 rounded-full border-4 border-blue-500"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={
              isPlaying
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }
                : { scale: 1, opacity: 0.3 }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={onTogglePlay}
            className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause className="w-8 h-8 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
