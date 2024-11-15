import { useState } from "react";
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

const content = {
  title:
    "Autonomous Navigation to Near-Earth Asteroids Using Advanced Rocket Engines",
  sections: [
    {
      title: "1. Introduction",
      content: `Near-Earth asteroids (NEAs) have garnered significant attention in the realm of space exploration due to their potential to unlock new scientific insights and resources. These celestial bodies, which orbit relatively close to Earth, present unique opportunities for exploration and utilization. The significance of NEAs lies not only in their scientific value but also in their potential as stepping stones for deeper space missions. As humanity looks beyond Earth for resources and knowledge, NEAs offer a promising frontier.

The primary objective of this research project is to enhance propulsion technologies and autonomous navigation systems to facilitate missions to NEAs. By advancing these technologies, the project aims to overcome current limitations in space exploration, enabling more efficient and reliable missions. The development of advanced rocket engines and autonomous navigation systems is crucial for the success of such missions, as they ensure precise trajectory management and efficient propulsion.

In the context of current space exploration challenges, this project holds immense importance. Traditional propulsion systems and navigation methods have limitations that hinder long-duration and deep-space missions. By addressing these challenges, the project not only contributes to the advancement of space technology but also opens up new possibilities for exploration and resource utilization. The integration of cutting-edge propulsion and navigation technologies is essential for the future of space exploration, making this project a pivotal step forward.`,
    },
    {
      title: "2. Background and Literature Review",
      content: `The exploration of propulsion technologies has been a cornerstone of space exploration, with various systems developed over the years. Traditional propulsion systems, such as chemical rockets, have been the workhorses of space missions. However, they come with limitations, including low efficiency and high fuel consumption, which restrict their use in long-duration missions. This project seeks to address these limitations by exploring advanced propulsion technologies that offer improved mass flow rates and efficiency.

Oskar J. Haidn's contributions to advanced rocket engine design have been instrumental in pushing the boundaries of propulsion technology. His work focuses on enhancing the performance and reliability of rocket engines, making them suitable for extended missions. By building on Haidn's research, this project aims to develop propulsion systems that can support missions to NEAs, ensuring efficient and reliable travel.

Autonomous navigation systems are another critical component of space missions. These systems enable spacecraft to navigate and manage their trajectories without human intervention, which is essential for missions to distant celestial bodies like NEAs. Current autonomous navigation systems have been successfully applied in various space missions, but they require further refinement to meet the demands of NEA exploration.

The importance of NEA orbit determination and resource utilization cannot be overstated. Accurate orbit determination is crucial for mission planning and execution, ensuring that spacecraft can reach their targets efficiently. Additionally, NEAs are believed to contain valuable resources, such as water and metals, which could be utilized for future space missions. This project aims to refine orbit determination techniques and explore the potential for resource utilization on NEAs, contributing to the broader goals of space exploration.`,
    },
    {
      title: "3.Innovative Propulsion Technologies",
      content: `The development of advanced rocket engines is a key focus of this project, with an emphasis on improving mass flow rates and efficiency. Traditional rocket engines, while effective, have limitations that restrict their use in long-duration missions. By exploring innovative propulsion technologies, this project aims to overcome these limitations and enable more efficient and reliable space travel.

One of the primary challenges in rocket design is achieving a balance between performance and reliability. Advanced rocket engines must be capable of delivering high thrust while maintaining safety and reliability over extended periods. This project addresses these challenges by integrating cutting-edge technologies and design principles, ensuring that the engines can support missions to NEAs.

Liquid propulsion advancements play a crucial role in enhancing the reliability and safety of rocket engines. Liquid propellants offer several advantages, including higher efficiency and better control over thrust levels. By incorporating these advancements, the project aims to develop propulsion systems that are not only efficient but also safe and reliable for extended missions.

The integration of advanced propulsion technologies is essential for the success of missions to NEAs. By improving mass flow rates and efficiency, these technologies enable spacecraft to travel longer distances with less fuel, reducing the overall cost and complexity of missions. This project represents a significant step forward in the development of propulsion systems, paving the way for future exploration of NEAs and beyond.`,
    },
    {
      title: "4. Autonomous Navigation Systems",
      content: `Autonomous navigation systems are a critical component of space missions, enabling spacecraft to navigate and manage their trajectories without human intervention. This project focuses on developing high-precision attitude control systems and state estimation algorithms to ensure accurate trajectory management in space missions.

High-precision attitude control systems are essential for maintaining the correct orientation of spacecraft during missions. These systems use advanced sensors and control algorithms to adjust the spacecraft's orientation, ensuring that it remains on the correct trajectory. By developing high-precision attitude control systems, this project aims to enhance the accuracy and reliability of autonomous navigation systems.

State estimation algorithms play a crucial role in autonomous navigation, providing real-time data on the spacecraft's position and velocity. These algorithms use data from onboard sensors to estimate the spacecraft's state, enabling it to make informed decisions about its trajectory. By refining state estimation algorithms, this project aims to improve the accuracy and reliability of autonomous navigation systems, ensuring that spacecraft can reach their targets efficiently.

Developing autonomous navigation systems for NEAs presents unique challenges, including the need for accurate orbit determination and resource utilization. This project addresses these challenges by integrating advanced technologies and methodologies, ensuring that autonomous navigation systems can support missions to NEAs. By overcoming these challenges, the project contributes to the broader goals of space exploration, enabling more efficient and reliable missions to distant celestial bodies.
`,
    },
    {
      title: "5.Scientific Goals and Methodologies",
      content: `The scientific goals of this project are centered around refining NEA orbit determination techniques and exploring resource utilization on NEAs. Accurate orbit determination is crucial for mission planning and execution, ensuring that spacecraft can reach their targets efficiently. This project aims to refine orbit determination techniques, improving the accuracy and reliability of mission planning.

Resource utilization on NEAs is another key focus of this project. NEAs are believed to contain valuable resources, such as water and metals, which could be utilized for future space missions. By exploring the potential for resource utilization on NEAs, this project aims to contribute to the broader goals of space exploration, enabling more sustainable and cost-effective missions.

Comprehensive studies on asteroid dynamics and physical characteristics are essential for understanding the potential of NEAs. These studies provide valuable insights into the composition and behavior of NEAs, informing mission planning and execution. By conducting comprehensive studies on asteroid dynamics and physical characteristics, this project aims to enhance our understanding of NEAs and their potential for exploration and utilization.

The methodologies employed in achieving the scientific goals of this project are centered around advanced technologies and techniques. By integrating cutting-edge technologies and methodologies, this project aims to overcome the challenges of NEA exploration, ensuring that missions are efficient and reliable. The scientific goals and methodologies of this project represent a significant step forward in the exploration and utilization of NEAs, contributing to the broader goals of space exploration.
`,
    },
    {
      title: "6.Project Development and Timeline",
      content: `The development of this project is structured around a comprehensive timeline, with key milestones and deliverables outlined to ensure its success. The project timeline is designed to facilitate the efficient and effective development of advanced propulsion technologies and autonomous navigation systems, ensuring that the project meets its objectives.

Key milestones in the project timeline include the development and testing of advanced rocket engines, the refinement of autonomous navigation systems, and the exploration of NEA orbit determination and resource utilization. These milestones are designed to ensure that the project progresses smoothly, with each stage building on the previous one to achieve the overall objectives.

The involvement of stakeholders in the evaluation and funding processes is crucial for the success of the project. By engaging stakeholders in the evaluation and funding processes, the project ensures that it receives the necessary support and resources to achieve its objectives. This collaborative approach is essential for the success of the project, ensuring that it meets the needs and expectations of all stakeholders.

The project development and timeline represent a comprehensive approach to the exploration and utilization of NEAs, ensuring that the project meets its objectives and contributes to the broader goals of space exploration. By outlining a clear and structured development timeline, the project ensures that it progresses smoothly and efficiently, achieving its objectives and contributing to the advancement of space technology.
`,
    },
    {
      title: "7. Evaluation and Success Metrics",
      content: `The evaluation and success metrics of this project are centered around measuring technological progress and scientific findings. By establishing clear criteria for evaluation, the project ensures that it meets its objectives and contributes to the broader goals of space exploration.

The criteria for measuring technological progress include the development and testing of advanced rocket engines, the refinement of autonomous navigation systems, and the exploration of NEA orbit determination and resource utilization. These criteria are designed to ensure that the project achieves its objectives and contributes to the advancement of space technology.

The focus on diverse research outputs beyond traditional metrics is essential for the success of the project. By considering a wide range of research outputs, the project ensures that it captures the full scope of its contributions to space exploration. This approach is essential for the success of the project, ensuring that it meets the needs and expectations of all stakeholders.

Strategies for ensuring high-quality standards throughout the project are centered around rigorous testing and evaluation processes. By implementing rigorous testing and evaluation processes, the project ensures that it meets the highest standards of quality and reliability. This approach is essential for the success of the project, ensuring that it achieves its objectives and contributes to the advancement of space technology.`,
    },

    {
      title: "8. Conclusion",
      content: `The significance of this project lies in its potential impact on future space missions. By advancing propulsion technologies and autonomous navigation systems, the project contributes to the broader goals of space exploration, enabling more efficient and reliable missions to NEAs and beyond.

The expected outcomes and contributions of this project are centered around the development of advanced propulsion technologies and autonomous navigation systems, the refinement of NEA orbit determination techniques, and the exploration of resource utilization on NEAs. These outcomes represent a significant step forward in the exploration and utilization of NEAs, contributing to the broader goals of space exploration.

The importance of continued research and innovation in autonomous navigation and propulsion technologies cannot be overstated. By advancing these technologies, the project ensures that space exploration remains at the forefront of scientific and technological progress, enabling new possibilities for exploration and utilization.

In conclusion, this project represents a significant step forward in the exploration and utilization of NEAs, contributing to the broader goals of space exploration. By advancing propulsion technologies and autonomous navigation systems, the project ensures that space exploration remains at the forefront of scientific and technological progress, enabling new possibilities for exploration and utilization.
`,
    },
    // ... Add other sections here
  ],
};

const NewHome = () => {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState("markdown");

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [responseText, setResponseText] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState(
    "Our research project aims to determine precise orbital trajectories of asteroids in our solar system. We're developing advanced computational methods and algorithms to improve asteroid tracking and prediction. Our sophisticated system processes astronomical observations from various sources to calculate accurate orbital parameters, accounting for subtle forces like solar radiation pressure and the Yarkovsky effect. Key challenges include developing robust statistical methods, implementing advanced orbit determination algorithms, and creating a comprehensive database. We're combining classical orbital mechanics with modern computational techniques, including machine learning. The project will deliver practical tools for the astronomical community and has significant implications for planetary defense and solar system dynamics understanding."
  );
  const [outputHoveredIndex, setOutputHoveredIndex] = useState<number | null>(
    null
  );
  const [latexData, setLatexData] = useState(localStorage.getItem("latex"));

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

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
    const response = await axios.post("http://127.0.0.1:8000/process-input", {
      message: userPrompt,
    });

    console.log(response?.data?.response, "response from backend");
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

  const ChatContainer = () => (
    <div className="h-full flex flex-col  pt-4   relative ">
      {/* Select dropdown - Fixed at top */}
      <div className="flex-shrink-0 px-1 mb-4 relative z-10   ">
        <div className="relative inline-block">
          <select className="appearance-none bg-[#2a2a2a]/50 backdrop-blur-sm text-gray-300 px-4 py-2 pr-10 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-[#2a2a2a]/70 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50">
            <option>Section 1</option>
            <option>Section 2</option>
            <option>Section 3</option>
            <option>Section 4</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>
      </div>
      {/* Chat header - Fixed at top */}

      {/* Chat messages - Scrollable */}
      <div
        //   className="flex-1 overflow-y-auto"
        className="absolute inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
      >
        <div className="space-y-6">
          {/* User message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
              S
            </div>
            <div>
              <div className="text-gray-300">
                write an essay for what is an agent
              </div>
            </div>
          </div>

          {/* Assistant message */}
          <div className="bg-[#2a2a2a] p-4  rounded-xl">
            <div className="mb-4">
              I'll help you write a comprehensive essay about agents.
            </div>

            {/* Document preview */}
            <div
              className="bg-[#1a1a1a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={toggleDocument}
            >
              <div className="text-gray-400">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="font-medium">
                  Understanding Agents: From Concept to Applications
                </div>
                <div className="text-sm text-gray-400">
                  Click to open document
                </div>
              </div>
            </div>

            <div className="text-gray-300">
              <div>
                <h2>Response:</h2>
                <pre>{responseText}</pre>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
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

      {/* Input area - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 ">
        <div className="pt-4  ">
          <div className="bg-[#2a2a2a] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <textarea
                className="flex-1 bg-transparent resize-none outline-none"
                placeholder="Reply to Sagan..."
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  console.log(files, "files");

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
        <div className=" basis-[20%] h-full ">
          <DockMenu setActiveModal={setActiveModal} />
        </div>
        <div className="basis-[80%] h-full">
          {activeModal && (
            <div className="absolute z-[99] flex items-center  justify-center top-[100px] w-full  ">
              {renderModal()}
            </div>
          )}
          {!activeMode && (
            <div
              className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

              //   className="flex justify-center  items-start border border-red-600 h-full"
            >
              {" "}
              <button
                className="flex justify-center items-center"
                onClick={() => {
                  setActiveMode(true);
                  startSagan();
                }}
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
          )}
          {/* Center container with fixed width */}
          {activeMode && (
            <div className="h-full max-w-3xl mx-auto px-4   overflow-hidden">
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
              {activeFormat === "markdown" ? (
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
              )}
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
