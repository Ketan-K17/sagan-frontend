import { X } from "lucide-react";
interface prop {
  closeModal: () => void;
}
const ProjectInfo = ({ closeModal }: prop) => {
  return (
    <div
      className="relative w-full max-w-md bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg shadow-lg p-6"
      // className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6"
    >
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Project Information
      </h2>

      {/* Form */}
      <form
        // onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Project Name */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            className="w-full px-3 py-2 bg-[#2a2a2a]  rounded-lg 
                       text-slate-400 placeholder-slate-500 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors"
            placeholder="Enter project name"
          />
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Project Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg 
                       text-slate-300 placeholder-slate-500 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors resize-none"
            placeholder="Enter project description"
          />
        </div>

        {/* Issuing Organization */}
        <div>
          <label
            htmlFor="issuingOrg"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Issuing Organization
          </label>
          <input
            type="text"
            id="issuingOrg"
            className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg 
                       text-slate-300 placeholder-slate-500 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors"
            placeholder="Enter issuing organization"
          />
        </div>

        {/* Link to Call */}
        <div>
          <label
            htmlFor="callLink"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Link to Call
          </label>
          <input
            type="url"
            id="callLink"
            className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg 
                       text-slate-300 placeholder-slate-500 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors"
            placeholder="https://"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                     text-blue-400 font-medium
                     hover:bg-blue-500/20 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          onClick={closeModal}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectInfo;
