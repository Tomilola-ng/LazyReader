"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileInputArea from "./FileInputArea";
import SummaryArea from "./SummaryArea";
import Header from "@/components/Header";
import { useFileUpload } from "@/hooks/upload";
import LoadingScreen from "./LoadingScreen";

export default function DashboardPage() {
  const [fileData, setFileData] = useState<File>();
  const [summaryData, setSummaryData] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { uploadFile } = useFileUpload();

  // New states
  const [isUploading, setIsUploading] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [uploadDone, setUploadDone] = useState(false);
  const [computeDone, setComputeDone] = useState(false);
  const [generateDone, setGenerateDone] = useState(false);

  // File Upload Handler
  const handleFileUpload = async (acceptedFiles: File[]): Promise<void> => {
    setIsUploading(true);
    setUploadDone(false); // Reset the done state
    const file = acceptedFiles[0];
    setFileData(file);
  };

  // Get Audio Handler
  const handleGetAudio = async (summary?: string) => {
    setIsComputing(true);
    setComputeDone(false); // Reset the done state
    const formData = new FormData();
    formData.append("text", summary ?? summaryData);

    const response = await fetch("/api/speech", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);
      setIsComputing(false);
      setComputeDone(true); // Set done state
    } else {
      const errorData = await response.json();
      setError(errorData.message);
      setIsComputing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!fileData) {
        setError("No file data available");
        return;
      }

      const uploadResponse = await uploadFile(fileData);

      if (!uploadResponse || uploadResponse.file === undefined) {
        setError("Failed to upload file");
        setIsUploading(false);
        return;
      }

      setIsUploading(false);
      setUploadDone(true); // Mark file upload as done
      setIsGenerating(true);
      setGenerateDone(false); // Reset the done state

      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: {
            key: uploadResponse.file.key,
            name: uploadResponse.file.name,
            url: uploadResponse.file.url,
          },
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        handleGetAudio(data.summary);
        setSummaryData(data.summary);
        setIsGenerating(false);
        setGenerateDone(true); // Mark generation as done
      } else {
        setError(data.message);
        setIsGenerating(false);
      }
    };

    if (fileData) {
      fetchData();
    }
  }, [fileData]);

  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setError("");
  }, [error]);

  // Conditional Rendering based on state
  if (isUploading || isComputing || isGenerating) {
    return (
      <LoadingScreen
        isUploading={isUploading}
        isComputing={isComputing}
        isGenerating={isGenerating}
        uploadDone={uploadDone}
        computeDone={computeDone}
        generateDone={generateDone}
      />
    );
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <main
        role="main"
        className="grid grid-cols-2 min-w-[1100px] h-[calc(100dvh-4rem)]"
      >
        <FileInputArea
          handleFileUpload={handleFileUpload}
          setError={setError}
        />
        <SummaryArea summaryData={summaryData} audioUrl={audioUrl} />
      </main>
    </>
  );
}
