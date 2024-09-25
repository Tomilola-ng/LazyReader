"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, Cpu, Music, Check } from "lucide-react";

interface LoadingScreenProps {
  isUploading: boolean;
  isComputing: boolean;
  isGenerating: boolean;
  uploadDone: boolean;
  computeDone: boolean;
  generateDone: boolean;
}

export default function CustomLoadingScreen({
  isUploading,
  isComputing,
  isGenerating,
  uploadDone,
  computeDone,
  generateDone,
}: LoadingScreenProps) {
  const loadingStates = [
    {
      label: "Uploading File",
      icon: Upload,
      isLoading: isUploading,
      isDone: uploadDone,
    },
    {
      label: "Computing File",
      icon: Cpu,
      isLoading: isComputing,
      isDone: computeDone,
    },
    {
      label: "Generating Audio",
      icon: Music,
      isLoading: isGenerating,
      isDone: generateDone,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {loadingStates.map((state, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: state.isLoading ? 360 : 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <state.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </motion.div>
                  <h2 className="text-base sm:text-xl font-bold text-white">
                    {state.label}
                  </h2>
                </div>
                <AnimatePresence>
                  {state.isDone && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <Check className="w-6 h-6 text-green-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: state.isLoading || state.isDone ? "100%" : "0%",
                  }}
                  transition={{
                    duration: state.isDone ? 0.5 : 2,
                    ease: "easeInOut",
                    repeat: state.isLoading && !state.isDone ? Infinity : 0,
                  }}
                />
              </div>
              <AnimatePresence mode="wait">
                {state.isLoading ? (
                  <motion.p
                    key="loading"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-2 text-sm text-blue-300"
                  >
                    Processing...
                  </motion.p>
                ) : state.isDone ? (
                  <motion.p
                    key="done"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-2 text-sm text-green-400"
                  >
                    Completed
                  </motion.p>
                ) : (
                  <motion.p
                    key="waiting"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-2 text-sm text-gray-400"
                  >
                    Waiting...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
