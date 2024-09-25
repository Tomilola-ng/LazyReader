import { useState } from 'react';

interface UploadResponse {
  message: string;
  file?: {
    key: string;
    name: string;
    url: string;
  };
  status: number;
}

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<UploadResponse | null> => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadthing', {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload file');
      }
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while uploading the file');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, isLoading, error };
};
