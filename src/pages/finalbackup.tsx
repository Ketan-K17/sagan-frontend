import { useState, useMemo, useRef } from "react";
import {
  Star,
  Copy,
  MessageCircle,
  FileText,
  Download,
  Clipboard,
  History,
  ClipboardCopy,
  RefreshCcw,
  ChevronDown,
} from "lucide-react";
import share from "../assets/share.svg";
// import review from "../assets/review.svg";
// import submit from "../assets/submit.svg";
// import history from "../assets/history.svg";
import Sagan from "../assets/sagan-svg.svg";
import { NeonGradientCard } from "../components/ui/neon-gradient-card";
import DockMenu from "../components/DockMenu";
import ProjectInfo from "../components/ProjectInfo";
import TemplateForm from "../components/TemplateForm";
import PromptForm from "../components/PromptForm";
import LibraryForm from "../components/LibraryForm";
import CompanyForm from "../components/CompanyForm";
import axios from "axios";
import Markdown from "react-markdown";
const NewHome = () => {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState("markdown");
  const [isPrompt, setIsPrompt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [responseText, setResponseText] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState("");
  const [sectionMode, setSectionMode] = useState(false);
  const [outputHoveredIndex, setOutputHoveredIndex] = useState<number | null>(
    null
  );

  const [chatMode, setChatMode] = useState(false);
  // const [latexData, setLatexData] = useState(localStorage.getItem("latex"));

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

  const [latexData, setLatexData] = useState(localStorage.getItem("latex"));
  const [mdData, setMdData] = useState(localStorage.getItem("md"));
  const [pdfData, setPdfData] = useState(localStorage.getItem("pdf"));

  const outputButtons = [
    {
      icon: Star,
      text: "Review",
    },
    {
      icon: share,
      text: "Share",
    },

    {
      icon: History,
      text: "History",
    },
    {
      icon: Clipboard,
      text: "Copy",
    },
    {
      icon: Download,
      text: "Download",
    },
  ];
  const toggleDocument = () => {
    setIsDocumentOpen(!isDocumentOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVisible(false);
  };

  const renderModal = () => {
    switch (activeModal) {
      case "Project Information":
        return <ProjectInfo closeModal={() => setActiveModal(null)} />;
      case "Template":
        return (
          <TemplateForm
            closeModal={() => setActiveModal(null)}
            setFiles={setFiles}
          />
        );
      case "Prompt":
        return (
          <PromptForm
            closeModal={() => setActiveModal(null)}
            setResponseText={setResponseText}
            setActiveMode={setActiveMode}
            setUserPrompt={setUserPrompt}
            setIsPrompt={setIsPrompt}
          />
        );
      case "Library":
        return <LibraryForm closeModal={() => setActiveModal(null)} />;
      case "Company Information":
        return <CompanyForm closeModal={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  function extractLatexContent(response: string) {
    const endDocumentIndex = response?.indexOf("\\end{document}");
    if (endDocumentIndex !== -1) {
      const endIndex = endDocumentIndex + "\\end{document}".length;
      return response.substring(0, endIndex);
    } else {
      return response;
    }
  }

  const startSagan = async () => {
    setResponseText("");

    const response = await axios.post("http://127.0.0.1:8001/process-input", {
      message: userPrompt,
    });

    if (response?.data?.success) {
      // activate sagan
      setChatMode(true);
    }

    console.log(response, "response from backend");
    setPdfData(response?.data?.pdf_file);
    setMdData(response?.data?.md_file);
    setLatexData(response?.data?.tex_file);

    localStorage.setItem("latex", response?.data?.tex_file);
    localStorage.setItem("md", response?.data?.md_file);
    localStorage.setItem("pdf", response?.data?.pdf_file);
    const latexResponse = response.data.response;
    if (typeof latexResponse !== "string") {
      console.error("Unexpected data format:", latexResponse);
      // setResponseText("Error: Invalid data format received from server.");
      return;
    }

    const latexContent = extractLatexContent(latexResponse);
    console.log(latexContent);

    // setLatexData("");
    setLatexData(latexContent);
    localStorage.setItem("latex", latexContent);
    // setLatexData(response?.data?.response);

    // const response = await fetch("http://localhost:8000/interact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ message: userPrompt }),
    // });
  };

  //   const ChatContainer = () => (
  //     <div className="  border border-green-600  flex  flex-col h-full">
  //       {/* Chat messages */}
  //       <div className="space-y-6">
  //         {/* User message */}
  //         <div className="flex gap-3">
  //           <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
  //             S
  //           </div>
  //           <div>
  //             <div className="text-gray-300">
  //               write an essay for what is an agent
  //             </div>
  //           </div>
  //         </div>

  //         {/* Assistant message */}
  //         <div className="bg-[#1a1a1a]  px-4  py-4 rounded-xl">
  //           <div className="mb-4">
  //             I'll help you write a comprehensive essay about agents.
  //           </div>

  //           {/* Document preview */}
  //           <div
  //             className="bg-[#2a2a2a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
  //             onClick={toggleDocument}
  //           >
  //             <div className="text-gray-400">
  //               <MessageCircle size={20} />
  //             </div>
  //             <div>
  //               <div className="font-medium">
  //                 Understanding Agents: From Concept to Applications
  //               </div>
  //               <div className="text-sm text-gray-400">
  //                 Click to open document
  //               </div>
  //             </div>
  //           </div>

  //           <div className="text-gray-300">
  //             I've created a comprehensive essay about agents that covers their
  //             fundamental concepts, types, applications, and implications. The
  //             essay is structured to provide both breadth and depth, starting with
  //             basic definitions and moving through to complex considerations and
  //             future directions.
  //           </div>

  //           {/* Action buttons */}
  //           <div className="flex gap-2 mt-4">
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <Copy size={16} />
  //               Copy
  //             </button>
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <MessageCircle size={16} />
  //               Retry
  //             </button>
  //           </div>
  //         </div>
  //         <div className="bg-[#1a1a1a]  px-4  py-4 rounded-xl">
  //           <div className="mb-4">
  //             I'll help you write a comprehensive essay about agents.
  //           </div>

  //           {/* Document preview */}
  //           <div
  //             className="bg-[#2a2a2a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
  //             onClick={toggleDocument}
  //           >
  //             <div className="text-gray-400">
  //               <MessageCircle size={20} />
  //             </div>
  //             <div>
  //               <div className="font-medium">
  //                 Understanding Agents: From Concept to Applications
  //               </div>
  //               <div className="text-sm text-gray-400">
  //                 Click to open document
  //               </div>
  //             </div>
  //           </div>

  //           <div className="text-gray-300">
  //             I've created a comprehensive essay about agents that covers their
  //             fundamental concepts, types, applications, and implications. The
  //             essay is structured to provide both breadth and depth, starting with
  //             basic definitions and moving through to complex considerations and
  //             future directions.
  //           </div>

  //           {/* Action buttons */}
  //           <div className="flex gap-2 mt-4">
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <Copy size={16} />
  //               Copy
  //             </button>
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <MessageCircle size={16} />
  //               Retry
  //             </button>
  //           </div>
  //         </div>
  //         <div className="bg-[#1a1a1a]  px-4  py-4 rounded-xl">
  //           <div className="mb-4">
  //             I'll help you write a comprehensive essay about agents.
  //           </div>

  //           {/* Document preview */}
  //           <div
  //             className="bg-[#2a2a2a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
  //             onClick={toggleDocument}
  //           >
  //             <div className="text-gray-400">
  //               <MessageCircle size={20} />
  //             </div>
  //             <div>
  //               <div className="font-medium">
  //                 Understanding Agents: From Concept to Applications
  //               </div>
  //               <div className="text-sm text-gray-400">
  //                 Click to open document
  //               </div>
  //             </div>
  //           </div>

  //           <div className="text-gray-300">
  //             I've created a comprehensive essay about agents that covers their
  //             fundamental concepts, types, applications, and implications. The
  //             essay is structured to provide both breadth and depth, starting with
  //             basic definitions and moving through to complex considerations and
  //             future directions.
  //           </div>

  //           {/* Action buttons */}
  //           <div className="flex gap-2 mt-4">
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <Copy size={16} />
  //               Copy
  //             </button>
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <MessageCircle size={16} />
  //               Retry
  //             </button>
  //           </div>
  //         </div>
  //         <div className="bg-[#1a1a1a]  px-4  py-4 rounded-xl">
  //           <div className="mb-4">
  //             I'll help you write a comprehensive essay about agents.
  //           </div>

  //           {/* Document preview */}
  //           <div
  //             className="bg-[#2a2a2a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
  //             onClick={toggleDocument}
  //           >
  //             <div className="text-gray-400">
  //               <MessageCircle size={20} />
  //             </div>
  //             <div>
  //               <div className="font-medium">
  //                 Understanding Agents: From Concept to Applications
  //               </div>
  //               <div className="text-sm text-gray-400">
  //                 Click to open document
  //               </div>
  //             </div>
  //           </div>

  //           <div className="text-gray-300">
  //             I've created a comprehensive essay about agents that covers their
  //             fundamental concepts, types, applications, and implications. The
  //             essay is structured to provide both breadth and depth, starting with
  //             basic definitions and moving through to complex considerations and
  //             future directions.
  //           </div>

  //           {/* Action buttons */}
  //           <div className="flex gap-2 mt-4">
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <Copy size={16} />
  //               Copy
  //             </button>
  //             <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //               <MessageCircle size={16} />
  //               Retry
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Input area */}
  //       <div className="mt-6">
  //         <div className="bg-[#1a1a1a] rounded-lg p-4">
  //           <div className="flex items-center gap-2 mb-4">
  //             <textarea
  //               className="flex-1 bg-transparent resize-none outline-none"
  //               placeholder="Reply to Claude..."
  //               rows={1}
  //             />
  //           </div>
  //           <div className="flex justify-between items-center">
  //             <div className="flex gap-2">
  //               <button className="text-gray-400">
  //                 <Image size={20} />
  //               </button>
  //             </div>
  //             <div className="flex items-center gap-2 text-gray-400 text-sm">
  //               <span>Claude 3.5 Sonnet (New)</span>
  //               <span>2</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );

  const ChatContainer = () => {
    // <div className="h-full flex flex-col  pt-4   relative ">
    //   {/* Select dropdown - Fixed at top */}
    //   <div className="flex-shrink-0 px-1 mb-4 relative z-10   ">
    //     <div className="relative inline-block">
    //       <select className="appearance-none bg-[#2a2a2a]/50 backdrop-blur-sm text-gray-300 px-4 py-2 pr-10 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-[#2a2a2a]/70 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50">
    //         <option>Section 1</option>
    //         <option>Section 2</option>
    //         <option>Section 3</option>
    //         <option>Section 4</option>
    //       </select>
    //       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
    //     </div>
    //   </div>
    //   {/* Chat header - Fixed at top */}

    //   {/* Chat messages - Scrollable */}
    //   <div
    //     //   className="flex-1 overflow-y-auto"
    //     className="absolute inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
    //   >
    //     <div className="space-y-6">
    //       {/* User message */}
    //       <div className="flex gap-3">
    //         <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
    //           S
    //         </div>
    //         <div>
    //           <div className="text-gray-300">
    //             write an essay for what is an agent
    //           </div>
    //         </div>
    //       </div>

    //       {/* Assistant message */}
    //       <div className="bg-[#2a2a2a] p-4  rounded-xl">
    //         <div className="mb-4">
    //           I'll help you write a comprehensive essay about agents.
    //         </div>

    //         {/* Document preview */}
    //         <div
    //           className="bg-[#1a1a1a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
    //           onClick={toggleDocument}
    //         >
    //           <div className="text-gray-400">
    //             <MessageCircle size={20} />
    //           </div>
    //           <div>
    //             <div className="font-medium">
    //               Understanding Agents: From Concept to Applications
    //             </div>
    //             <div className="text-sm text-gray-400">
    //               Click to open document
    //             </div>
    //           </div>
    //         </div>

    //         <div className="text-gray-300">
    //           <div>
    //             <h2>Response:</h2>
    //             <pre>{responseText}</pre>
    //           </div>
    //         </div>

    //         {/* Action buttons */}
    //         <div className="flex gap-2 mt-4">
    //           <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
    //             <Copy size={16} />
    //             Copy
    //           </button>
    //           <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
    //             <MessageCircle size={16} />
    //             Retry
    //           </button>
    //           <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
    //             <ClipboardCopy size={16} />
    //             Publish
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Input area - Fixed at bottom */}
    //   <div className="absolute bottom-0 left-0 right-0 ">
    //     <div className="pt-4  ">
    //       <div className="bg-[#2a2a2a] rounded-lg p-4">
    //         <div className="flex items-center gap-2 mb-4">
    //           <textarea
    //             className="flex-1 bg-transparent resize-none outline-none"
    //             placeholder="Reply to Sagan..."
    //             rows={2}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    const responseText = "";
    // const toggleDocument = () => {};

    const [text, setText] = useState("");
    const [loader, setLoader] = useState(false);
    const messagesEndRef = useRef<any>(null);
    const [aiMsg, setAiMsg] = useState(localStorage.getItem("aimsg"));
    const samplePrompt = {
      text: "write an essay for what is an agent",
      assistantMessage:
        "I'll help you write a comprehensive essay about agents.",
      docTitle: "Understanding Agents: From Concept to Applications",
      responseText: "Lorem ipsum",
    };

    const [promptsArr, setPromptsArr] = useState([samplePrompt]);

    const startWorkFlowTwo = async () => {
      const response = await axios.post("http://127.0.0.1:8000/process-input", {
        message: "hey sagan could you please modify my section 3",
        section_number: 3,
      });

      if (response?.data?.succes) {
        setSectionMode(true);
        setAiMsg(response?.data?.ai_message);
        setPdfData(response?.data?.pdf_file);
        setMdData(response?.data?.md_file);
        setLatexData(response?.data?.tex_file);

        localStorage.setItem("latex", response?.data?.tex_file);
        localStorage.setItem("md", response?.data?.md_file);
        localStorage.setItem("pdf", response?.data?.pdf_file);
        localStorage.setItem("aimsg", response?.data?.ai_message);
      }
    };

    function fakeApiCall() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const fakeData = {
            message: "This is a fake response.",
          };

          resolve(fakeData);
        }, 0);
      });
    }

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendPromptHandler = async () => {
      setLoader(true);
      await fakeApiCall();
      setLoader(false);
      setPromptsArr((prev) => [...prev, { ...samplePrompt, text }]);
      setText("");
      setTimeout(() => {
        scrollToBottom();
      }, 1000);
    };

    return (
      <div
        // className="bg-slate-50 min-h-screen"
        className="h-full flex flex-col  pt-4   relative  "
      >
        {/* <div className="h-full h-screen flex flex-col  pt-4   relative "> */}
        {/* Select dropdown - Fixed at top */}
        <div className="flex-shrink-0 px-1 mb-4 relative z-10   ">
          {!sectionMode ? (
            <div>
              <button onClick={startWorkFlowTwo}>Section Mode</button>
            </div>
          ) : (
            <div className="relative inline-block">
              <select className="appearance-none bg-[#2a2a2a]/50 backdrop-blur-sm text-gray-300 px-4 py-2 pr-10 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-[#2a2a2a]/70 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50">
                <option>Section 1</option>
                <option>Section 2</option>
                <option>Section 3</option>
                <option>Section 4</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          )}
        </div>
        {/* Chat header - Fixed at top */}
        {/* Chat messages - Scrollable */}
        <div
          // className="flex flex-col gap-4 grow overflow-y-auto"
          className="absolute inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
          id="chat-container"
        >
          {promptsArr?.map((obj: any, idx: number) => (
            <div
              key={idx}
              //   className="flex-1 overflow-y-auto"
              className="mb-6 scrollbar-hide pt-10 chat-box"
            >
              <div className="space-y-6">
                {/* User message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <div className="text-gray-300">{obj?.text}</div>
                  </div>
                </div>

                {/* Assistant message */}
                <div className="bg-[#2a2a2a] p-4  rounded-xl">
                  <div className="mb-4">{obj?.assistantMessage}</div>

                  {/* Document preview */}
                  <div
                    className="bg-[#1a1a1a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={toggleDocument}
                  >
                    <div className="text-gray-400">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div className="font-medium">{obj?.docTitle}</div>
                      <div className="text-sm text-gray-400">
                        Click to open document
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-300">
                    <div>
                      <h2>Response:</h2>
                      <pre>{obj?.responseText}</pre>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4 action-btns">
                    <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
                      <Copy size={16} />
                      Copy
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
                      <MessageCircle size={16} />
                      Retry
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
                      <ClipboardCopy size={16} />
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* keeping this div intentionally for now in order to apply some css to
        chat-container */}
        {/* Input area - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 ">
          <Star size={20} className={`${loader ? "pulse-logo" : ""}`} />
          <div className="pt-4">
            <div className="bg-[#2a2a2a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <textarea
                  className="flex-1 bg-transparent resize-none outline-none"
                  placeholder="Reply to Sagan..."
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (["enter", "Enter", "submit", "go"].includes(e.key)) {
                      e.preventDefault();
                      sendPromptHandler();
                    }
                  }}
                />
                <button onClick={sendPromptHandler}>Send</button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  };
  console.log(files, "files");

  console.log(pdfData, "pdfdata");
  console.log(mdData, "pdfdata");
  console.log(latexData, "pdfdata");

  return (
    <div
      className="min-h-screen  h-full bg-[#1a1a1a] text-gray-100"
      // className="min-h-screen h-full bg-zinc-800 text-gray-100  border b order-red-600"
    >
      {/* Sidebar */}
      <div
        className={`absolute left-0 top-0 h-full bg-zinc-800 rounded-xl z-[999] transition-all duration-300 ease-in-out
             inset-0 bg-black/40 backdrop-blur-xl`}
        // className={`absolute left-0 top-0 h-full bg-slate-800
        //     rounded-xl z-[999] transition-all duration-300 ease-in-out`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: isVisible ? (isHovered ? "16rem" : "0") : "0",
          overflow: "hidden",
        }}
      >
        <div className="w-64  flex flex-col  h-full">
          <div className="p-4 flex   justify-start">
            {/* <img src={Logo} className="w-8 h-8 object-contain" /> */}
            <h1
              className="text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-400 to-purple-400   text-2xl font-bold"
            >
              SAGAN
            </h1>
          </div>
          <hr className="border-gray-800" />
          <div className="flex  flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-white mb-2">
                    LITERATURE FILES
                  </h2>
                  {/* <div
                    className=""
                    // className="space-y-2 flex flex-col "
                  >
                    {files.map((file, index) => (
                      <p
                        key={index}

                        // className=" gap-2 text-sm text-gray-300 hover:text-white cursor-pointer"
                      >
                        <FileText className="h-4 w-4" />
                        <p className="border border-red-600">{file}</p>
                      </p>
                    ))}
                  </div> */}
                  <div className="space-y-2 flex flex-col">
                    {files?.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 mb-1" />
                        <p className="text-sm">{file}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white mb-2">
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

      <div
        className="absolute left-0 top-0 w-[100px] h-full z-20 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        className={`h-screen  flex flex-col justify-between ${
          isDocumentOpen ? "w-1/2" : "w-full"
        } transition-all duration-300  relative  `}
      >
        <div className=" basis-[10%] h-full ">
          <DockMenu setActiveModal={setActiveModal} />
        </div>
        <div className="basis-[90%] h-full  ">
          {activeModal && (
            <div className="absolute z-[99] flex items-center  justify-center top-[100px] w-full  ">
              {renderModal()}
            </div>
          )}
          {
            // !activeMode &&
            !activeMode ? (
              <div
                className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

                //   className="flex justify-center  items-start border border-red-600 h-full"
              >
                {" "}
                <button
                  className="flex justify-center items-center"
                  onClick={() => {
                    setChatMode(true);
                    // setActiveMode(true);
                    // startSagan();
                  }}
                >
                  {/* <NeonGradientCard
                    borderRadius={9999}
                    borderSize={1}
                    className="!p-0 [&>div]:!p-0 [&_.relative]:!p-0"
                  > */}
                  <img src={Sagan} className="w-12 h-12 object-cover " />
                  {/* </NeonGradientCard> */}
                </button>
              </div>
            ) : (
              <div
                className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

                //   className="flex justify-center  items-start border border-red-600 h-full"
              >
                {" "}
                <button
                  className="flex justify-center items-center"
                  onClick={() => setChatMode(true)}
                  // onClick={() => {
                  //   setActiveMode(true);
                  //   // startSagan();
                  // }}
                >
                  <NeonGradientCard
                    borderRadius={9999}
                    borderSize={1}
                    className="!p-0 [&>div]:!p-0 [&_.relative]:!p-0"
                  >
                    <img src={Sagan} className="w-12 h-12 object-cover " />
                  </NeonGradientCard>
                </button>
              </div>
            )
          }
          {/* Center container with fixed width */}
          {chatMode && (
            <div className="h-full max-w-3xl mx-auto px-4     overflow-hidden">
              <ChatContainer />
            </div>
          )}
        </div>
      </div>

      {isDocumentOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-1/2 flex flex-col bg-[#2a2a2a]   rounded-2xl px-4 py-2 mx-2 my-2">
          {/* Document header */}
          <div className="  basis-[2%] h-full  flex items-center justify-between py-1 border-b border-gray-700">
            {/* Format toggle bar */}
            <div className="flex items-center justify-between w-full  px-4 bg-gray-850">
              {/* <div className="flex items-center bg-white rounded-full py-1 px-2 mr-4">
                <button
                  className={`px-2  text-sm py-1 rounded-full transition-colors ${
                    activeFormat === "markdown"
                      ? "bg-blue-400 text-white"
                      : "text-gray-400 "
                  }`}
                  onClick={() => setActiveFormat("markdown")}
                >
                  Markdown
                </button>
                <button
                  className={`px-2 py-1  text-sm rounded-full transition-colors ${
                    activeFormat === "latex"
                      ? "bg-blue-400 white"
                      : "text-gray-400 "
                  }`}
                  onClick={() => setActiveFormat("latex")}
                >
                  LaTeX
                </button>
              </div> */}
              <div className="relative flex space-x-1">
                {/* Hidden radio inputs for accessibility */}
                <input
                  type="radio"
                  id="markdown"
                  name="editor-type"
                  className="sr-only"
                  checked={activeFormat === "markdown"}
                  onChange={() => setActiveFormat("markdown")}
                />
                <input
                  type="radio"
                  id="latex"
                  name="editor-type"
                  className="sr-only"
                  checked={activeFormat === "latex"}
                  onChange={() => setActiveFormat("latex")}
                />

                {/* Labels styled as buttons */}
                <label
                  htmlFor="markdown"
                  className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                    activeFormat === "markdown"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {/* <FileText className="w-4 h-4 mr-2" /> */}
                  <span className="font-medium">Markdown</span>
                </label>

                <label
                  htmlFor="latex"
                  className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                    activeFormat === "latex"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {/* <Code2 className="w-4 h-4 mr-2" /> */}
                  <span className="font-medium">LaTeX</span>
                </label>
              </div>
              <button
                //   className="bg-blue-400  text-white flex
                //   items-center space-x-3 px-3 py-1 rounded-full"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200 flex items-center space-x-2 shadow-sm"
                onClick={() => setActiveFormat("pdf")}
              >
                {/* <RefreshCcw size={16} /> */}
                <span className="font-medium"> Compile</span>
              </button>
            </div>
          </div>

          {/* Format toggle and content */}
          <div
            className="basis-[95%]  bg-[#2a2a2a]  rounded-xl overflow-hidden overflow-y-auto flex justify-between flex-col"
            //   className=" basis-[96%] h-full  flex flex-col"
          >
            {/* Content */}
            <div
              className="basis-[98%]  py-2 px-4 overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#2a2a2a] hover:scrollbar-thumb-gray-500"
              // className="flex-1 overflow-auto"
            >
              {/* {activeFormat === "pdf" && (
                <iframe
                  src={`data:application/pdf;base64,${data}`}
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                  title="PDF Viewer"
                ></iframe>
              )} */}

              {/* <object
                data={`data:application/pdf;base64,${data}`}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>jyoti here</p>
              </object> */}
              {/* {activeFormat === "markdown" ? (
                <div className="p-8">
                  <div className=" mx-auto space-y-8  ">
                    <h1 className="text-2xl font-semibold mb-12  text-white">
                      {content.title}
                    </h1>

                    {content.sections.map((section, index) => (
                      <section key={index} className="space-y-4  ">
                        <h2 className="text-xl font-semibold  text-white">
                          {section.title}
                        </h2>
                        {section.content
                          .split("\n\n")
                          .map((paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className="leading-relaxed text-gray-300"
                            >
                              {paragraph}
                            </p>
                          ))}
                      </section>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {latexData}
                  </pre>
                </div>
              )} */}

              {activeFormat === "markdown" ? (
                <div className="p-8">
                  <div className="mx-auto space-y-8">
                    {/* <h1 className="text-2xl font-semibold mb-12 text-white">
                      {content.title}
                    </h1>

                    {content.sections.map((section, index) => (
                      <section key={index} className="space-y-4">
                        <h2 className="text-xl font-semibold text-white">
                          {section.title}
                        </h2>
                        {section.content
                          .split("\n\n")
                          .map((paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className="leading-relaxed text-gray-300"
                            >
                              {paragraph}
                            </p>
                          ))}
                      </section>
                    ))} */}
                    <Markdown>{mdData}</Markdown>
                  </div>
                </div>
              ) : activeFormat === "latex" ? (
                <div className="p-8">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {latexData}
                  </pre>
                </div>
              ) : activeFormat === "pdf" ? (
                <iframe
                  src={`data:application/pdf;base64,${pdfData}`}
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                  title="PDF Viewer"
                ></iframe>
              ) : null}
            </div>
          </div>

          {/* Document footer */}
          <div className="  basis-[2%] h-full flex items-center justify-end border-t border-gray-700">
            {outputButtons?.map((item, index) => (
              <div
                key={index}
                className="relative pr-4"
                onMouseEnter={() => setOutputHoveredIndex(index)}
                onMouseLeave={() => setOutputHoveredIndex(null)}
              >
                <button className="flex flex-col items-center p-2 rounded-lg  transition-colors duration-200">
                  {item.icon === share ? (
                    <img
                      src={item.icon}
                      className="w-5 h-5  "
                      alt={item.text}
                    />
                  ) : (
                    <item.icon className=" text-white" size={16} />
                  )}
                </button>

                {outputHoveredIndex === index && (
                  <div className="absolute left-1/4 transform -translate-x-1/2 bottom-full mb-2 py-2 px-2 bg-black text-slate-200 text-xs rounded whitespace-nowrap z-10">
                    {item.text}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewHome;
