import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import axios from "axios";
interface TempCardProps {
  setShowProposalModal: (value: boolean) => void;
}
const TempCard = ({ setShowProposalModal }: TempCardProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (file) {
      // Here you would typically send the file to your server
      console.log("Uploading file:", file.name);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/upload-proposal-templates",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadStatus(response.data.message);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadStatus("Error uploading file.");
      }
      // Reset the file state after upload
      setFile(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative ">
      <button
        className="absolute right-0 "
        onClick={() => setShowProposalModal(false)}
      >
        <X />
      </button>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Upload Proposal Template
        </h2>
        <p className="text-gray-600 mb-6">
          Drag and drop a PDF file or click to select
        </p>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="w-12 mb-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Drop the PDF file here"
                : "Drag 'n' drop a PDF file here, or click to select one"}
            </p>
          </div>
        </div>
        {file && (
          <p className="mt-4 text-sm text-gray-600">
            Selected file: {file.name}
          </p>
        )}
      </div>
      <div className="px-6 pb-6  ">
        {uploadStatus && (
          <small className=" text-green-500">{uploadStatus}</small>
        )}
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 ${
            file
              ? "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Upload PDF
        </button>
      </div>
    </div>
  );
};

export default TempCard;
