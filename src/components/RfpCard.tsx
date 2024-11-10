// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "lucide-react";

// const InputCard = () => {
//   const [file, setFile] = useState<File | null>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles[0]) {
//       setFile(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "application/pdf": [".pdf"],
//     },
//     multiple: false,
//   });

//   const handleUpload = () => {
//     if (file) {
//       // Here you would typically send the file to your server
//       console.log("Uploading file:", file.name);
//       // Reset the file state after upload
//       setFile(null);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden  ">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Upload RFP PDF Document
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Drag and drop a PDF file or click to select
//         </p>
//         <div
//           {...getRootProps()}
//           className={`border-2 border-dashed rounded-lg p-6 cursor-pointer ${
//             isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
//           }`}
//         >
//           <input {...getInputProps()} />
//           <div className="flex flex-col items-center justify-center text-center">
//             <Upload className="w-12 mb-4 text-gray-400" />
//             <p className="text-sm text-gray-600">
//               {isDragActive
//                 ? "Drop the PDF file here"
//                 : "Drag 'n' drop a PDF file here, or click to select one"}
//             </p>
//           </div>
//         </div>
//         {file && (
//           <p className="mt-4 text-sm text-gray-600">
//             Selected file: {file.name}
//           </p>
//         )}
//       </div>
//       <div className="px-6 pb-6">
//         <button
//           onClick={handleUpload}
//           disabled={!file}
//           className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 ${
//             file
//               ? "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           Upload PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InputCard;

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import axios from "axios";
interface RfpCardProps {
  setShowRfpModal: (value: boolean) => void;
}

const RfpCard = ({ setShowRfpModal }: RfpCardProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const [uploadStatus, setUploadStatus] = useState("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      // Here you would typically send the files to your server
      console.log(
        "Uploading files:",
        files.map((file) => file.name)
      );

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/upload-rfp", // Update the URL if necessary
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadStatus(response.data.message);
      } catch (error) {
        console.error("Error uploading files:", error);
        setUploadStatus("Error uploading files.");
      }
      // Reset the files state after upload
      setFiles([]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden   relative">
      <button
        className="absolute right-0 "
        onClick={() => setShowRfpModal(false)}
      >
        <X />
      </button>
      <div className="p-6  ">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Upload RFP PDF Documents
        </h2>
        <p className="text-gray-600 mb-6">
          Drag and drop PDF files or click to select
        </p>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Drop the PDF files here"
                : "Drag 'n' drop PDF files here, or click to select"}
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Selected Files:
            </h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded"
                >
                  <span className="text-sm text-gray-600 truncate">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(file)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="px-6 pb-6  ">
        {uploadStatus && (
          <small className=" text-green-500">{uploadStatus}</small>
        )}
        <button
          onClick={handleUpload}
          disabled={files.length === 0}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 ${
            files.length > 0
              ? "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Upload PDFs ({files.length})
        </button>
      </div>
    </div>
  );
};

export default RfpCard;
