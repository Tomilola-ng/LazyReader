"use client";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileInputArea from "./FileInputArea";

export default function DashboardPage() {
  const [fileData, setFileData] = useState<File>();
  const [summaryData, setSummaryData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!fileData) {
          console.error("No file data available");
          return;
        }

        // Create a FormData object and append the file if it's defined
        const formData = new FormData();
        formData.append("file", fileData); // fileData is now guaranteed to be a File

        // Make the API call to upload the file and get the summary
        const response = await fetch("/api/summarize", {
          method: "POST",
          body: formData,
        });

        // Parse the JSON response
        const data = await response.json();
        console.log("data", data);

        // Set the summary data in your state
        setSummaryData(data.summary);
      } catch (error) {
        // Handle any errors during the API request
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only call the API if fileData is available
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
  }, [error]);

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

  return (
    <>
      <ToastContainer />
      <main role="main" className="grid grid-cols-2 min-w-[1100px] h-screen">
        <FileInputArea
          handleFileUpload={handleFileUpload}
          setError={setError}
        />
        <div>
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-3xl font-bold">Summary</h1>
            <p className="text-lg">{summaryData}</p>
          </div>
        </div>
      </main>
    </>
  );
}
