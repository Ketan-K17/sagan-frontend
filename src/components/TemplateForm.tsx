import { useState, ChangeEvent } from "react";
import { Paperclip, X } from "lucide-react";
import axios from "axios";
import { useSagan } from "../context/context";
import "./style.css";
interface prop {
  closeModal: () => void;
}

const TemplateForm = ({ closeModal }: prop) => {
  const { dispatch, state } = useSagan();
  const [proposalFiles, setProposalFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleProposalUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    const fileNames = Array.from(files).map((file) => file.name);
    // setFiles((prev) => [...prev, ...fileNames]);
    dispatch({
      type: "ADD_FILES",
      payload: fileNames,
    });

    dispatch({
      type: "ADD_FILE_NAMES_TO_FOLDER",
      payload: { folderName: "Proposal Files", fileNames: fileNames },
    });
    console.log(fileNames, "fileNames");

    if (files) {
      setProposalFiles(Array.from(files));
    }
  };

  const handleAdditionalUpload = (event: ChangeEvent<HTMLInputElement>) => {
    // const files = event.target.files;
    // if (files && files[0]) {
    //   setAdditionalFiles(files[0]);
    //   console.log(files[0].name);
    //   dispatch({
    //     type: "ADD_FILES",
    //     payload: fileNames,
    //   });
    // }

    const files = event.target.files;

    const fileNames = Array.from(files).map((file) => file.name);

    dispatch({
      type: "ADD_FILE_NAMES_TO_FOLDER",
      payload: { folderName: "Additional Files", fileNames: fileNames },
    });

    dispatch({
      type: "ADD_FILES",
      payload: fileNames,
    });
    console.log(fileNames, "fileNames");

    if (files) {
      setAdditionalFiles(Array.from(files));
    }
  };

  const removeProposalFile = (indexToRemove: number) => {
    setProposalFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearAdditionalFiles = (indexToRemove: number) => {
    setAdditionalFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (proposalFiles.length > 0) {
      proposalFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    if (additionalFiles.length > 0) {
      // formData.append("files", additionalFiles); // Updated key for clarity

      additionalFiles?.forEach((file) => {
        formData.append("files", file);
      });
    }

    console.log(formData, "formadata");

    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const response = await axios.post(
        "http://127.0.0.1:8000/upload-files",
        formData
      );
      setUploadStatus(response.data.message);
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Error uploading files.");

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
    closeModal();
  };

  // const handleSubmit = async () => {
  //   const formData = new FormData();

  //   // Append proposal template files
  //   if (proposalFiles.length > 0) {
  //     proposalFiles.forEach((file) => {
  //       formData.append("proposal_files", file); // Updated key for clarity
  //     });
  //   }

  //   // Append additional file if present
  //   if (additionalFiles) {
  //     formData.append("additional_file", additionalFiles); // Updated key for clarity
  //   }
  //   console.log(formData, "this is the form data");
  //   // try {
  //   //   dispatch({
  //   //     type: "SET_LOADING",
  //   //     payload: true,
  //   //   });

  //   //   // Make the API call
  //   //   const response = await axios.post(
  //   //     "http://127.0.0.1:8000/upload-files",
  //   //     formData
  //   //   );

  //   //   // Set the upload status based on the response
  //   //   setUploadStatus(response.data.message);
  //   //   dispatch({
  //   //     type: "SET_LOADING",
  //   //     payload: false,
  //   //   });
  //   // } catch (error) {
  //   //   console.error("Error uploading files:", error);
  //   //   setUploadStatus("Error uploading files.");
  //   //   dispatch({
  //   //     type: "SET_LOADING",
  //   //     payload: false,
  //   //   });
  //   // }

  //   // // Close the modal after handling the upload
  //   // closeModal();
  // };

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
        Template Files
      </h2>

      <div className="space-y-6">
        {/* Proposal Template Upload */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="proposalUpload"
              className="hidden"
              onChange={handleProposalUpload}
              accept=".pdf,.doc,.docx"
              multiple
            />
            <label
              htmlFor="proposalUpload"
              // className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg
              //   text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer"

              className="flex  gap-2 items-center text-slate-400"
            >
              <Paperclip className="h-4 w-4" />
              <span>Upload Proposal Template</span>
            </label>
          </div>
          {proposalFiles.length > 0 && (
            <div className="flex flex-col gap-2">
              {proposalFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button
                    onClick={() => removeProposalFile(index)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Files Upload */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="additionalUpload"
              className="hidden"
              onChange={handleAdditionalUpload}
              accept=".pdf,.doc,.docx"
              multiple
            />
            <label
              htmlFor="additionalUpload"
              // className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg
              //   text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer"
              className="flex  gap-2 items-center text-slate-400"
            >
              <Paperclip className="h-4 w-4" />
              <span>Upload Additional Files</span>
            </label>
          </div>
          {proposalFiles.length > 0 && (
            <div className="flex flex-col gap-2">
              {additionalFiles?.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button
                    onClick={() => clearAdditionalFiles(index)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
            text-blue-400 font-medium hover:bg-blue-500/20 transition-all
            focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {state.loading ? <span className="loader"></span> : "Submit"}
        </button>

        {uploadStatus && (
          <p className="text-center text-sm text-green-500 mt-4">
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default TemplateForm;
