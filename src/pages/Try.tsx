import { useState, useRef, useEffect } from "react";
import {
  ChevronUp,
  Send,
  FileText,
  History,
  Share,
  Upload,
  User2,
  X,
  Paperclip,
  Trash2,
  Plus,
  Clipboard,
  RefreshCcw,
} from "lucide-react";

import author from "../assets/authorinfo.svg";
import problem from "../assets/problem.svg";
import agent from "../assets/agent.svg";
import proposal from "../assets/proposal.svg";
import pdf from "../assets/pdf.svg";
import share from "../assets/share.svg";
import review from "../assets/review.svg";
import submit from "../assets/submit.svg";
import history from "../assets/history.svg";

import RfpCard from "../components/RfpCard";
import TempCard from "../components/TempCard";
import Prompt from "../components/Prompt";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot" | "ai";
}

// Define the ChatSession type
interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
}

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
  content: Blob;
}
export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isDropupOpen, setIsDropupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showRfpModal, setShowRfpModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: 1, title: "Section 1", messages: [] },
    { id: 2, title: "Section 2", messages: [] },
    { id: 3, title: "Section 3", messages: [] },
  ]);

  const activeChat = chatSessions.find((chat) => chat.id === activeChatId);

  const topItems = [
    {
      icon: problem,
      text: "Project Info",
    },
    {
      icon: problem,
      text: "Template",
    },
    {
      icon: proposal,
      text: "Prompt",
    },
    {
      icon: agent,
      text: "Library",
    },
    {
      icon: author,
      text: "Company Info",
    },
  ];
  const sideItems = [
    {
      icon: review,
      text: "Review",
    },
    {
      icon: share,
      text: "Share",
    },
    {
      icon: submit,
      text: "Submit",
    },
    {
      icon: history,
      text: "History",
    },
  ];
  const [activeModal, setActiveModal] = useState(null); // State to handle active modal
  const files = [
    { icon: pdf, text: "documentOne.txt" },
    { icon: pdf, text: "documentTwo.txt" },
    { icon: pdf, text: "documentThree.txt" },
  ];

  const recentChats = ["Section 1", "Section 2", "Section 3"];

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setChatSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeChatId
          ? {
              ...session,
              messages: [
                ...session.messages,
                { id: Date.now(), text: inputMessage, sender: "user" },
                {
                  id: Date.now() + 1,
                  text: "AI response to: " + inputMessage,
                  sender: "ai",
                },
              ],
            }
          : session
      )
    );
    setInputMessage("");
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVisible(false);
  };

  // const handleTopItemClick = (text: string) => {
  //   switch (text) {
  //     case "RFP":
  //       // Handle RFP case if needed
  //       setShowPromptModal(false);
  //       setShowProposalModal(false);
  //       setShowRfpModal(true);
  //       break;
  //     case "Proposal Template":
  //       // Handle Proposal Template case if needed
  //       setShowPromptModal(false);
  //       setShowRfpModal(false);
  //       setShowProposalModal(true);
  //       break;
  //     case "Prompt":
  //       // Handle Prompt case if needed
  //       setShowProposalModal(false);
  //       setShowRfpModal(false);
  //       setShowPromptModal(true);
  //       break;

  //     default:
  //       // Optional: Handle any unhandled cases
  //       break;
  //   }
  // };

  const handleTopItemClick = (text) => {
    setActiveModal((prev) => (prev === text ? null : text));
  };

  const renderModal = () => {
    switch (activeModal) {
      case "Project Info":
        return <ProjectInfoForm closeModal={() => setActiveModal(null)} />;
      case "Template":
        return <TemplateForm closeModal={() => setActiveModal(null)} />;
      case "Prompt":
        return <PromptForm closeModal={() => setActiveModal(null)} />;
      case "Library":
        return <LibraryForm closeModal={() => setActiveModal(null)} />;
      case "Company Info":
        return <CompanyInfoForm closeModal={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-5 px-5 h-screen flex flex-col ">
      <div className="relative flex flex-1 gap-[10px]">
        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full bg-slate-800 rounded-xl z-[999] transition-all duration-300 ease-in-out`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: isVisible ? (isHovered ? "16rem" : "0") : "0",
            overflow: "hidden",
          }}
        >
          {/* <div className="p-4">
            <div className="flex items-center justify-between p-4">
              <h1
                className={`text-xl flex space-x-4 items-center font-bold text-slate-200 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  SAGAN
                </span>
              </h1>
            </div>
            <nav className={`px-4 ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <h2 className="text-md uppercase text-slate-400 font-semibold mb-2">
                Literature Files
              </h2>
              <ul>
                {files.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center mb-3 pl-4 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <span className="text-xs">{item.text}</span>
                  </button>
                ))}
              </ul>
            </nav>
            <div
              className={`mt-8 px-4 ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <h2 className="text-md uppercase text-slate-400 font-semibold mb-2">
                Section Outlined
              </h2>
              <ul>
                {recentChats.map((chat, index) => (
                  <li key={index} className="mb-2 pl-[20px] text-slate-300">
                    - {chat}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
          <div className="w-64 border-r border-gray-800 flex flex-col  h-full">
            <div className="p-4">
              <h1 className="text-xl font-bold text-blue-400">SAGAN</h1>
            </div>
            <hr className="border-gray-800" />
            <div className="flex  flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-gray-400 mb-2">
                      LITERATURE FILES
                    </h2>
                    {/* <div className="space-y-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer"
                          onClick={() => handleDocumentClick(doc)}
                        >
                          <FileText className="h-4 w-4" />
                          <span>{doc.name}</span>
                        </div>
                      ))}
                    </div> */}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-400 mb-2">
                      SECTION OUTLINED
                    </h2>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-300 hover:text-white cursor-pointer">
                        - Section 1
                      </div>
                      <div className="text-sm text-gray-300 hover:text-white cursor-pointer">
                        - Section 2
                      </div>
                      <div className="text-sm text-gray-300 hover:text-white cursor-pointer">
                        - Section 3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invisible hover area */}
        <div
          className="absolute left-0 top-0 w-[100px] h-full z-20 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>

        {/* Chat area */}
        <div className="flex-1 p-4 bg-slate-900 border border-slate-700 rounded-xl ml-16 z-[2]">
          <div className="flex flex-col justify-between h-full  relative ">
            {/* Top buttons */}
            <div className="flex basis-[5%] justify-between items-center mb-4">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button
                    className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => handleTopItemClick(item.text)}
                  >
                    <img
                      src={item.icon}
                      className="w-8 h-8  text-white"
                      alt={item.text}
                    />
                  </button>
                  {hoveredIndex === index && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded whitespace-nowrap z-10">
                      {item.text}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* {showRfpModal && (
              <div className="absolute  z-[99] flex items-start top-[100px] w-full  ">
                <RfpCard setShowRfpModal={setShowRfpModal} />
              </div>
            )}

            {showProposalModal && (
              <div className="absolute  z-[99] flex items-start top-[100px] w-full  ">
                <TempCard setShowProposalModal={setShowProposalModal} />
              </div>
            )}

            {showPromptModal && (
              <div className="absolute  z-[99] flex items-start top-[100px] w-full  ">
                <Prompt setShowPromptModal={setShowPromptModal} />
              </div>
            )} */}

            {/* Render the active modal */}
            {activeModal && (
              <div className="absolute z-[99] flex items-start top-[100px] w-full">
                {renderModal()}
              </div>
            )}

            {/* Chat container */}
            <div className="container basis-[95%] h-full mx-auto p-4 flex flex-col justify-end   ">
              <div className="relative mb-4">
                <button
                  className="w-full p-2 text-left font-semibold flex justify-between items-center bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 text-slate-300"
                  onClick={() => setIsDropupOpen(!isDropupOpen)}
                >
                  {activeChat?.title || "Select a chat"}
                  <ChevronUp
                    className={`transition-transform duration-200 ${
                      isDropupOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropupOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {chatSessions.map((chat) => (
                      <button
                        key={chat.id}
                        className="w-full p-4 text-left text-slate-300 hover:bg-slate-700"
                        onClick={() => {
                          setActiveChatId(chat.id);
                          setIsDropupOpen(false);
                        }}
                      >
                        {chat.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeChat && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                  {/* <div className="min-h-[100px] max-h-[500px] overflow-y-auto p-4 space-y-2">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-500/10 border border-blue-500/20 ml-auto text-slate-300"
                            : "bg-slate-700/50 border border-slate-600 text-slate-300"
                        } max-w-[80%]`}
                      >
                        {message.text}
                      </div>
                    ))}
                  </div> */}
                  <div className="min-h-[100px] max-h-[500px] overflow-y-auto p-4 space-y-2">
                    {activeChat.messages.map((message) => (
                      <>
                        <div
                          key={message.id}
                          className={`p-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-500/10 border border-blue-500/20 ml-auto text-slate-300"
                              : "bg-slate-700/50 border border-slate-600 text-slate-300"
                          } max-w-[80%]`}
                        >
                          {message.text}

                          {/* Conditionally render buttons below AI messages */}
                        </div>
                        <div>
                          {message.sender !== "user" && (
                            <div className="flex space-x-2 mt-2">
                              <button
                                // onClick={() => handleCopy(message.text)}
                                className="p-1 bg-gray-700 text-slate-300 rounded hover:bg-gray-600 transition-colors"
                              >
                                <Clipboard className="w-4 h-4 mr-1" />
                              </button>
                              <button
                                // onClick={handleRestart}
                                className="p-1  text-white rounded "
                              >
                                <RefreshCcw className="w-4 h-4 mr-1" />
                              </button>
                              <button
                                // onClick={() => handlePublish(message)}
                                className="p-1  text-white rounded  transition-colors"
                              >
                                Publish
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                  </div>

                  <div className="flex items-center p-4 border-t border-slate-700">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message..."
                      className="flex-grow p-2 bg-slate-900 border border-slate-700 rounded-l-lg focus:outline-none focus:border-blue-500/50 text-slate-300 placeholder-slate-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-r-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      <Send size={25} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document viewer */}
        <div className="w-1/3 flex flex-col gap-[5px]">
          <div className="basis-[5%] flex justify-between px-4 bg-slate-900 border border-slate-700 rounded-xl">
            {sideItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center  p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <img src={item.icon} className="w-5 h-5  " alt={item.text} />
                <span className="text-xs  text-white">{item.text}</span>
              </button>
            ))}
          </div>
          <div className="basis-[95%] bg-slate-900 border border-slate-700 rounded-xl p-4 overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
}

interface prop {
  closeModal: () => void;
}
// Example form for "Project Info"
function ProjectInfoForm({ closeModal }: prop) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6">
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
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                       text-slate-300 placeholder-slate-500 
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
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
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
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
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
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                       text-slate-300 placeholder-slate-500 
                       focus:outline-none focus:border-blue-500/50
                       transition-colors"
              placeholder="https://"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                     text-blue-400 font-medium
                     hover:bg-blue-500/20 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Example form for "Template"
function TemplateForm({ closeModal }: prop) {
  const [proposalFile, setProposalFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState(null);
  const handleProposalUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProposalFile(file);
    }
  };

  const handleAdditionalUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdditionalFiles(file);
    }
  };

  const clearProposalFile = () => {
    setProposalFile(null);
  };

  const clearAdditionalFiles = () => {
    setAdditionalFiles(null);
  };

  return (
    <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Upload Files
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
            />
            <label
              htmlFor="proposalUpload"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer"
            >
              <Paperclip className="h-4 w-4" />
              <span>Upload Proposal Template</span>
            </label>
          </div>
          {proposalFile && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="truncate max-w-[200px]">
                {proposalFile?.name}
              </span>
              <button
                onClick={clearProposalFile}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
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
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            <label
              htmlFor="additionalUpload"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer"
            >
              <Paperclip className="h-4 w-4" />
              <span>Upload Additional Files</span>
            </label>
          </div>
          {additionalFiles && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="truncate max-w-[200px]">
                {additionalFiles?.name}
              </span>
              <button
                onClick={clearAdditionalFiles}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          // onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
            text-blue-400 font-medium hover:bg-blue-500/20 transition-all
            focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// Example form for "Prompt"
function PromptForm({ closeModal }: prop) {
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

  const defaultPrompts = {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const promptData = {
      model: selectedModel,
      role: selectedRole,
      prompt:
        promptType === "default" ? defaultPrompts[selectedRole] : customPrompt,
    };
    console.log("Submitted data:", promptData);
    closeModal();
  };

  return (
    // <div className="bg-white p-4 rounded shadow-lg w-1/2">
    //   <h2 className="text-lg font-bold mb-4">Prompt</h2>
    //   <form>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="promptText"
    //         className="block mb-2 text-sm font-medium text-gray-700"
    //       >
    //         Prompt Text
    //       </label>
    //       <input
    //         type="text"
    //         id="promptText"
    //         className="w-full px-3 py-2 border rounded"
    //         placeholder="Enter prompt"
    //       />
    //     </div>
    //     <button
    //       type="button"
    //       onClick={closeModal}
    //       className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //     >
    //       Close
    //     </button>
    //   </form>
    // </div>

    <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Configure Prompt
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
            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
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
            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
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
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
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
          className="w-full px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                     text-blue-400 font-medium
                     hover:bg-blue-500/20 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// Example form for "Library"
function LibraryForm({ closeModal }: prop) {
  const [sotaFiles, setSotaFiles] = useState([]);
  const [methodologyFiles, setMethodologyFiles] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);

  const handleFileUpload = (event, section) => {
    const files = Array.from(event.target.files);
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

  const removeFile = (fileName, section) => {
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
  const FileList = ({ files, section }) => (
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
  const UploadSection = ({ title, section, files, accept = "*" }) => (
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
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
          text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-full"
        >
          <Paperclip className="h-4 w-4" />
          <span>{title}</span>
        </label>
      </div>
      <FileList files={files} section={section} />
    </div>
  );

  return (
    <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Library Upload
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
          className="w-full px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                     text-blue-400 font-medium
                     hover:bg-blue-500/20 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

type CustomField = {
  id: number;
  label: string;
  value: string;
};

// Type for a custom section
type CustomSection = {
  id: string;
  title: string;
  fields: CustomField[];
};

// Props type for CompanyInfoModal component
interface CompanyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Props type for InputField component
interface InputFieldProps {
  label: string;
  value: string;
  onChange: InputChangeHandler;
  type?: string;
}

type FormData = {
  company: {
    name: string;
    address: string;
    teamSize: string;
    website: string;
  };
  author: {
    firstName: string;
    lastName: string;
    position: string;
  };
  pi: {
    firstName: string;
    lastName: string;
    position: string;
  };
  copi: {
    firstName: string;
    lastName: string;
    position: string;
  };
};
// Example form for "Company Info"

type Section = {
  id: string;
  fields: { id: number; label: string; value: string }[];
};
function CompanyInfoForm({ closeModal }: prop) {
  const [selectedSection, setSelectedSection] = useState("company");
  const [customSections, setCustomSections] = useState<Section[]>([]);
  const [authorResume, setAuthorResume] = useState(null);
  const [piResume, setPiResume] = useState(null);
  const [copiResume, setCopiResume] = useState(null);
  const [useAuthorInfo, setUseAuthorInfo] = useState(false);

  const [formData, setFormData] = useState({
    company: {
      name: "",
      address: "",
      teamSize: "",
      website: "",
    },
    author: {
      firstName: "",
      lastName: "",
      position: "",
    },
    pi: {
      firstName: "",
      lastName: "",
      position: "",
    },
    copi: {
      firstName: "",
      lastName: "",
      position: "",
    },
  });

  const handleSectionChange = (e) => {
    const value = e.target.value;
    if (value === "add_section") {
      addCustomSection();
    } else {
      setSelectedSection(value);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (event, setFileState) => {
    const file = event.target.files[0];
    if (file) {
      setFileState(file);
    }
  };

  const handleUseAuthorInfo = () => {
    setUseAuthorInfo(true);
    setFormData((prev) => ({
      ...prev,
      pi: {
        ...prev.author,
      },
    }));
  };

  const addCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      title: `Custom Section ${customSections.length + 1}`,
      fields: [],
    };
    setCustomSections((prev) => [...prev, newSection]);
    setSelectedSection(newSection.id);
  };

  const addCustomField = (sectionId) => {
    setCustomSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: [
              ...section.fields,
              {
                id: Date.now(),
                label: `Field ${section.fields.length + 1}`,
                value: "",
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const InputField = ({ label, value, onChange, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                 text-slate-300 placeholder-slate-500 
                 focus:outline-none focus:border-blue-500/50
                 transition-colors"
      />
    </div>
  );

  const sections = [
    { value: "company", label: "Company Information" },
    { value: "author", label: "Author Information" },
    { value: "pi", label: "Principal Investigator (PI)" },
    { value: "copi", label: "Co-Principal Investigator (Co-PI)" },
    ...customSections.map((section) => ({
      value: section?.id,
      label: section?.title,
    })),
    { value: "add_section", label: "+ Add New Section" },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "company":
        return (
          <div className="space-y-4">
            <InputField
              label="Company Name"
              value={formData.company.name}
              onChange={(e) =>
                handleInputChange("company", "name", e.target.value)
              }
            />
            <InputField
              label="Company Address"
              value={formData.company.address}
              onChange={(e) =>
                handleInputChange("company", "address", e.target.value)
              }
            />
            <InputField
              label="Team Size"
              value={formData.company.teamSize}
              onChange={(e) =>
                handleInputChange("company", "teamSize", e.target.value)
              }
              type="number"
            />
            <InputField
              label="Company Website"
              value={formData.company.website}
              onChange={(e) =>
                handleInputChange("company", "website", e.target.value)
              }
              type="url"
            />
          </div>
        );

      case "author":
        return (
          <div className="space-y-4">
            <InputField
              label="First Name"
              value={formData.author.firstName}
              onChange={(e) =>
                handleInputChange("author", "firstName", e.target.value)
              }
            />
            <InputField
              label="Last Name"
              value={formData.author.lastName}
              onChange={(e) =>
                handleInputChange("author", "lastName", e.target.value)
              }
            />
            <InputField
              label="Position"
              value={formData.author.position}
              onChange={(e) =>
                handleInputChange("author", "position", e.target.value)
              }
            />
            <div>
              <input
                type="file"
                id="authorResume"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setAuthorResume)}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="authorResume"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-fit"
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Resume</span>
              </label>
              {authorResume && (
                <div className="mt-2 text-sm text-slate-300">
                  {authorResume.name}
                </div>
              )}
            </div>
          </div>
        );

      case "pi":
        return (
          <div className="space-y-4">
            <button
              onClick={handleUseAuthorInfo}
              className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                       text-blue-400 font-medium hover:bg-blue-500/20 transition-all"
            >
              Same as Author
            </button>
            <InputField
              label="First Name"
              value={formData.pi.firstName}
              onChange={(e) =>
                handleInputChange("pi", "firstName", e.target.value)
              }
            />
            <InputField
              label="Last Name"
              value={formData.pi.lastName}
              onChange={(e) =>
                handleInputChange("pi", "lastName", e.target.value)
              }
            />
            <InputField
              label="Position"
              value={formData.pi.position}
              onChange={(e) =>
                handleInputChange("pi", "position", e.target.value)
              }
            />
            <div>
              <input
                type="file"
                id="piResume"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setPiResume)}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="piResume"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-fit"
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Resume</span>
              </label>
              {piResume && (
                <div className="mt-2 text-sm text-slate-300">
                  {piResume.name}
                </div>
              )}
            </div>
          </div>
        );

      case "copi":
        return (
          <div className="space-y-4">
            <InputField
              label="First Name"
              value={formData.copi.firstName}
              onChange={(e) =>
                handleInputChange("copi", "firstName", e.target.value)
              }
            />
            <InputField
              label="Last Name"
              value={formData.copi.lastName}
              onChange={(e) =>
                handleInputChange("copi", "lastName", e.target.value)
              }
            />
            <InputField
              label="Position"
              value={formData.copi.position}
              onChange={(e) =>
                handleInputChange("copi", "position", e.target.value)
              }
            />
            <div>
              <input
                type="file"
                id="copiResume"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setCopiResume)}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="copiResume"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-fit"
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Resume</span>
              </label>
              {copiResume && (
                <div className="mt-2 text-sm text-slate-300">
                  {copiResume.name}
                </div>
              )}
            </div>
          </div>
        );

      // default:
      //   const customSection = customSections.find(
      //     (section) => section.id === selectedSection
      //   );
      //   if (customSection) {
      //     return (
      //       <div className="space-y-4">
      //         {customSection.fields.map((field) => (
      //           <InputField
      //             key={field.id}
      //             label={field.label}
      //             value={field.value}
      //             onChange={(e) => {
      //               setCustomSections((prev) =>
      //                 prev.map((s) => {
      //                   if (s.id === customSection.id) {
      //                     return {
      //                       ...s,
      //                       fields: s.fields.map((f) =>
      //                         f.id === field.id
      //                           ? { ...f, value: e.target.value }
      //                           : f
      //                       ),
      //                     };
      //                   }
      //                   return s;
      //                 })
      //               );
      //             }}
      //           />
      //         ))}
      //         <button
      //           onClick={() => addCustomField(customSection.id)}
      //           className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
      //         >
      //           <Plus size={16} />
      //           <span>Add Field</span>
      //         </button>
      //       </div>
      //     );
      //   }
      //   return null;

      case "customSectionId": {
        const customSection = customSections.find(
          (section) => section.id === selectedSection
        );
        if (customSection) {
          return (
            <div className="space-y-4">
              {customSection.fields.map((field) => (
                <InputField
                  key={field.id}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => {
                    setCustomSections((prev) =>
                      prev.map((s) => {
                        if (s.id === customSection.id) {
                          return {
                            ...s,
                            fields: s.fields.map((f) =>
                              f.id === field.id
                                ? { ...f, value: e.target.value }
                                : f
                            ),
                          };
                        }
                        return s;
                      })
                    );
                  }}
                />
              ))}
            </div>
          );
        }
        break;
      }
    }
  };

  return (
    // <div className="bg-white p-4 rounded shadow-lg w-1/2">
    //   <h2 className="text-lg font-bold mb-4">Company Info</h2>
    //   <form>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="companyName"
    //         className="block mb-2 text-sm font-medium text-gray-700"
    //       >
    //         Company Name
    //       </label>
    //       <input
    //         type="text"
    //         id="companyName"
    //         className="w-full px-3 py-2 border rounded"
    //         placeholder="Enter company name"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="address"
    //         className="block mb-2 text-sm font-medium text-gray-700"
    //       >
    //         Address
    //       </label>
    //       <input
    //         type="text"
    //         id="address"
    //         className="w-full px-3 py-2 border rounded"
    //         placeholder="Enter address"
    //       />
    //     </div>
    //     <button
    //       type="button"
    //       onClick={closeModal}
    //       className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //     >
    //       Close
    //     </button>
    //   </form>
    // </div>

    <div className="relative w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6 mx-4">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Company Information
      </h2>

      {/* Section Selector */}
      <select
        value={selectedSection}
        onChange={handleSectionChange}
        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                   text-slate-300 mb-6
                   focus:outline-none focus:border-blue-500/50
                   transition-colors"
      >
        {sections.map((section) => (
          <option
            key={section.value}
            value={section.value}
            className={section.value === "add_section" ? "text-blue-400" : ""}
          >
            {section.label}
          </option>
        ))}
      </select>

      {/* Form Content */}
      {renderSection()}

      {/* Submit Button */}
      <button
        onClick={() => {
          console.log("Form Data:", { ...formData, customSections });
          closeModal();
        }}
        className="w-full mt-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg 
                   text-blue-400 font-medium hover:bg-blue-500/20 transition-all
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        Submit
      </button>
    </div>
  );
}
