import { useState, ChangeEvent } from "react";
import { X, Paperclip, Trash2 } from "lucide-react";
interface prop {
  closeModal: () => void;
}

interface FileItem {
  name: string;
}
const LibraryForm = ({ closeModal }: prop) => {
  const [sotaFiles, setSotaFiles] = useState<FileItem[]>([]);
  const [methodologyFiles, setMethodologyFiles] = useState<FileItem[]>([]);
  const [otherFiles, setOtherFiles] = useState<FileItem[]>([]);

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    section: "sota" | "methodology" | "other"
  ) => {
    // const files = Array.from(event.target.files);

    const files = Array.from(event.target.files || []).map((file) => ({
      name: file.name,
    }));
    switch (section) {
      case "sota":
        setSotaFiles((prev) => [...prev, ...files]);
        break;
      case "methodology":
        setMethodologyFiles((prev) => [...prev, ...files]);
        break;
      case "other":
        setOtherFiles((prev) => [...prev, ...files]);
        break;
    }
    // Reset input value to allow uploading the same file again
    event.target.value = "";
  };

  const removeFile = (
    fileName: string,
    section: "sota" | "methodology" | "other"
  ) => {
    switch (section) {
      case "sota":
        setSotaFiles((prev) => prev.filter((file) => file.name !== fileName));
        break;
      case "methodology":
        setMethodologyFiles((prev) =>
          prev.filter((file) => file.name !== fileName)
        );
        break;
      case "other":
        setOtherFiles((prev) => prev.filter((file) => file.name !== fileName));
        break;
    }
  };

  const handleSubmit = () => {
    const libraryData = {
      sota: sotaFiles,
      methodology: methodologyFiles,
      other: otherFiles,
    };
    console.log("Submitted library data:", libraryData);
    closeModal();
  };
  const FileList = ({
    files,
    section,
  }: {
    files: FileItem[];
    section: "sota" | "methodology" | "other";
  }) => (
    <div className="mt-2 space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between px-3 py-2 bg-slate-900/30 rounded-lg border border-slate-700"
        >
          <span className="text-sm text-slate-300 truncate max-w-[200px]">
            {file.name}
          </span>
          <button
            onClick={() => removeFile(file.name, section)}
            className="text-slate-400 hover:text-red-400 transition-colors ml-2"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
  const UploadSection = ({
    title,
    section,
    files,
    accept = "*",
  }: {
    title: string;
    section: "sota" | "methodology" | "other";
    files: FileItem[];
    accept?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="file"
          id={`${section}Upload`}
          className="hidden"
          onChange={(e) => handleFileUpload(e, section)}
          multiple
          accept={accept}
        />
        <label
          htmlFor={`${section}Upload`}
          className="flex  gap-2 items-center text-slate-400"
          // className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg
          // text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-full"
        >
          <Paperclip className="h-4 w-4" />
          <span>{title}</span>
        </label>
      </div>
      <FileList files={files} section={section} />
    </div>
  );

  return (
    <div className="relative w-full max-w-md bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg shadow-lg p-6">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Upload Library
      </h2>

      {/* Upload Sections */}
      <div className="space-y-6">
        {/* SOTA Upload */}
        <UploadSection
          title="Upload SOTA Files"
          section="sota"
          files={sotaFiles}
          accept=".pdf,.doc,.docx"
        />

        {/* Methodology Upload */}
        <UploadSection
          title="Upload Methodology Files"
          section="methodology"
          files={methodologyFiles}
          accept=".pdf,.doc,.docx"
        />

        {/* Other Upload */}
        <UploadSection
          title="Upload Other Files"
          section="other"
          files={otherFiles}
          accept=".pdf,.doc,.docx,.jpg,.png"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                     text-blue-400 font-medium
                     hover:bg-blue-500/20 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LibraryForm;
