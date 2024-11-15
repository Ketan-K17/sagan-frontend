import { useState, FormEvent } from "react";
import { X } from "lucide-react";

interface prop {
  closeModal: () => void;
  setResponseText: React.Dispatch<React.SetStateAction<string>>;
  setUserPrompt: React.Dispatch<React.SetStateAction<string>>;
}
const PromptForm = ({ closeModal, setUserPrompt }: prop) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [promptType, setPromptType] = useState("default");
  const [customPrompt, setCustomPrompt] = useState("");

  const models = [
    { value: "gpt", label: "GPT-4" },
    { value: "gemini", label: "Gemini" },
    { value: "llama", label: "LLaMA" },
  ];

  const roles = [
    { value: "project_manager", label: "Project Manager" },
    { value: "system_engineer", label: "System Engineer" },
    { value: "software_architect", label: "Software Architect" },
    { value: "business_analyst", label: "Business Analyst" },
    { value: "technical_lead", label: "Technical Lead" },
    { value: "ux_designer", label: "UX Designer" },
  ];

  const defaultPrompts: { [key: string]: string } = {
    project_manager:
      "As a Project Manager, analyze the project requirements and provide a detailed project plan including milestones, resources, and timeline.",
    system_engineer:
      "As a System Engineer, evaluate the system architecture and provide technical specifications and implementation recommendations.",
    software_architect:
      "As a Software Architect, design a scalable and maintainable architecture considering the given requirements and constraints.",
    business_analyst:
      "As a Business Analyst, analyze the business requirements and provide detailed functional specifications.",
    technical_lead:
      "As a Technical Lead, provide technical guidance and best practices for implementation.",
    ux_designer:
      "As a UX Designer, analyze the user requirements and provide wireframes and user flow recommendations.",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserPrompt(customPrompt);
    closeModal();
  };

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
        Add Prompt
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Select Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg 
                       text-slate-300 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors"
          >
            <option value="">Select a model</option>
            {models.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Select Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 bg-[#2a2a2a]  rounded-lg 
                       text-slate-300 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {/* Prompt Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Prompt Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center text-slate-300">
              <input
                type="radio"
                value="default"
                checked={promptType === "default"}
                onChange={(e) => setPromptType(e.target.value)}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              Default Prompt
            </label>
            <label className="flex items-center text-slate-300">
              <input
                type="radio"
                value="custom"
                checked={promptType === "custom"}
                onChange={(e) => setPromptType(e.target.value)}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              Custom Prompt
            </label>
          </div>
        </div>

        {/* Prompt Display/Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            {promptType === "default"
              ? "Default Prompt"
              : "Enter Custom Prompt"}
          </label>
          {promptType === "default" ? (
            <div
              className="w-full px-3 py-2 bg-[#2a2a2a]  rounded-lg 
                            text-slate-300 min-h-[100px]"
            >
              {selectedRole
                ? defaultPrompts[selectedRole]
                : "Select a role to see the default prompt"}
            </div>
          ) : (
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                         text-slate-300 placeholder-slate-500 
                         focus:outline-none focus:border-blue-500/50
                         transition-colors resize-none"
              placeholder="Enter your custom prompt here..."
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                     text-blue-400 font-medium
                     hover:bg-blue-500/20 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PromptForm;
