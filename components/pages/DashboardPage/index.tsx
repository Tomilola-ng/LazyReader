"use client";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileInputArea from "./FileInputArea";
import SummaryArea from "./SummaryArea";
import Header from "@/components/Header";
import Loader from "@/components/Reusables/Loader";
import { useFileUpload } from "@/hooks/upload";

export default function DashboardPage() {
  const [fileData, setFileData] = useState<File>();
  const [summaryData, setSummaryData] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { uploadFile } = useFileUpload();

  const handleFileUpload = async (acceptedFiles: File[]): Promise<void> => {
    /**
     * Handle file upload
     * Accepted files is an array of files
     * Get the first file from the array and set it to the fileData state
     * Set the loading state to true
     * Return
     */

    const file = acceptedFiles[0];

    setFileData(file);
    setLoading(true);

    return;
  };

  const handleGetAudio = async (summary?: string) => {
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
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!fileData) {
        setError("No file data available");
        return;
      }

      const uploadResponse = await uploadFile(fileData)

      if (!uploadResponse || uploadResponse.file === undefined) {
        setError("Failed to upload file");
        return;
      }

      const response = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({
          file: uploadResponse.file.url,
        }),
      });

      const data = await response.json();

      if (data.status == 200) {
        handleGetAudio(data.summary);
        setSummaryData(data.summary);
      } else {
        setError(data.message);
      }

      setLoading(false);
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

  if (loading) return <Loader />;

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
