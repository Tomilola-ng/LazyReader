"use client";

import { FileTextIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileInputArea({
  handleFileUpload,
  setError,
}: {
  handleFileUpload: (files: File[]) => void;
  setError: (msg: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        const errorMessages = fileRejections.map((rejection) => {
          if (rejection.errors[0].code === "file-too-large") {
            return "File is too large. Please upload a file smaller than 10MB.";
          }
          if (rejection.errors[0].code === "file-invalid-type") {
            return "File type not supported. Please upload an ebook file (epub, pdf, doc, docx, txt, md, mobi, azw, azw3).";
          }
          return rejection.errors[0].message;
        });
        setError(errorMessages[0]);
      } else if (acceptedFiles.length > 1) {
        setError("Please upload only one file at a time.");
      } else if (acceptedFiles.length === 1) {
        handleFileUpload(acceptedFiles);
      }
    },
    [handleFileUpload, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/epub+zip": [".epub"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt", ".md"],
      "application/x-mobipocket-ebook": [".mobi"],
      "application/vnd.amazon.ebook": [".azw", ".azw3"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB max file size
  });

  return (
    <section className="w-full md:h-[100%] flexCenter p-4 gap-4">
      <div
        {...getRootProps()}
        className={`flex-1 border-2 border-dashed rounded-lg flexCenter transition-colors h-full ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-2xl font-bold text-primary">
            Drop it like it&apos;s hot!
          </p>
        ) : (
          <div className="text-center">
            <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop an ebook here, or click to select a file
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Supported formats: epub, pdf, doc, docx, txt, md, mobi, azw, azw3
              (Max 10MB)
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
