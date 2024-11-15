import { useState, useRef, useEffect } from "react";
import {
  ChevronUp,
  Clipboard,
  RefreshCcw,
  ClipboardCopy,
  Download,
  // ArrowLeft,
  // X,
  FileText,
  // Files, // For Project Information
  FileInput, // For Template
  MessageSquare, // For Prompt
  BookOpen, // For Library
  Building, // For Company Info
  Search,
  Star,
  Share2,
  X,
  Copy,
  MessageCircle,
  Image,
  Send,
  RefreshCw,
} from "lucide-react";

// import author from "../assets/authorinfo.svg";
// import problem from "../assets/problem.svg";
// import agent from "../assets/agent.svg";
// import proposal from "../assets/proposal.svg";
import share from "../assets/share.svg";
import review from "../assets/review.svg";
import submit from "../assets/submit.svg";
import history from "../assets/history.svg";
import ProjectInfo from "../components/ProjectInfo";
import TemplateForm from "../components/TemplateForm";
import PromptForm from "../components/PromptForm";
import LibraryForm from "../components/LibraryForm";
import CompanyForm from "../components/CompanyForm";
import proInfo from "../assets/project_info.svg";
import DockMenu from "../components/DockMenu";
import Sagan from "../assets/sagan-svg.svg";
import { NeonGradientCard } from "../components/ui/neon-gradient-card";
// import Logo from "../assets/white_logo.svg";
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

const Home = () => {
  const [activeMode, setActiveMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isDropupOpen, setIsDropupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [smallHoveredIndex, setSmallHoveredIndex] = useState<number | null>(
    null
  );
  const [outputHoveredIndex, setOutputHoveredIndex] = useState<number | null>(
    null
  );
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: 1, title: "Section 1", messages: [] },
    { id: 2, title: "Section 2", messages: [] },
    { id: 3, title: "Section 3", messages: [] },
  ]);

  const activeChat = chatSessions.find((chat) => chat.id === activeChatId);

  const topItems = [
    {
      icon: proInfo,
      // icon: Files,
      text: "Project Info",
    },
    {
      icon: FileInput,
      text: "Template",
    },
    {
      icon: MessageSquare,
      text: "Prompt",
    },
    {
      icon: BookOpen,
      text: "Library",
    },
    {
      icon: Building,
      text: "Company Info",
    },
  ];

  const bottomButtons = [
    {
      icon: Clipboard,
      text: "Copy",
    },
    {
      icon: RefreshCcw,
      text: "Retry",
    },
    {
      icon: ClipboardCopy,
      text: "Publish",
    },
  ];
  const outputButtons = [
    {
      icon: Clipboard,
      text: "Copy",
    },
    {
      icon: Download,
      text: "Download",
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
  const [activeModal, setActiveModal] = useState<string | null>(null); // State to handle active modal

  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState("markdown");

  const toggleDocument = () => {
    setIsDocumentOpen(!isDocumentOpen);
  };
  const files = [
    { text: "documentOne.txt" },
    { text: "documentTwo.txt" },
    { text: "documentThree.txt" },
  ];

  // const recentChats = ["Section 1", "Section 2", "Section 3"];

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

  const handleTopItemClick = (text: string | null) => {
    setActiveModal((prev: string | null) => (prev === text ? null : text));
  };

  const renderModal = () => {
    switch (activeModal) {
      case "Project Info":
        return <ProjectInfo closeModal={() => setActiveModal(null)} />;
      case "Template":
        return <TemplateForm closeModal={() => setActiveModal(null)} />;
      case "Prompt":
        return <PromptForm closeModal={() => setActiveModal(null)} />;
      case "Library":
        return <LibraryForm closeModal={() => setActiveModal(null)} />;
      case "Company Info":
        return <CompanyForm closeModal={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.style.overflowY = "auto";
      }
    };

    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const DocumentPreview = () => (
    <div
      className="bg-gray-800 rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={toggleDocument}
    >
      <div className="text-gray-400">
        <MessageCircle size={20} />
      </div>
      <div>
        <div className="font-medium">
          Understanding Agents: From Concept to Applications
        </div>
        <div className="text-sm text-gray-400">Click to open document</div>
      </div>
    </div>
  );

  const FormatToggle = () => (
    <div className="flex items-center bg-gray-800 rounded-lg p-1 mr-4">
      <button
        className={`px-4 py-1 rounded-md transition-colors ${
          activeFormat === "markdown"
            ? "bg-gray-700 text-white"
            : "text-gray-400 hover:text-white"
        }`}
        onClick={() => setActiveFormat("markdown")}
      >
        Markdown
      </button>
      <button
        className={`px-4 py-1 rounded-md transition-colors ${
          activeFormat === "latex"
            ? "bg-gray-700 text-white"
            : "text-gray-400 hover:text-white"
        }`}
        onClick={() => setActiveFormat("latex")}
      >
        LaTeX
      </button>
    </div>
  );

  const MarkdownContent = () => (
    <div className="flex-1 overflow-auto p-8">
      <h1 className="text-3xl font-medium mb-6">
        Understanding Agents: From Concept to Applications
      </h1>

      <p className="mb-6">
        In the rapidly evolving landscape of technology and artificial
        intelligence, the concept of an "agent" has become increasingly
        significant. An agent, in its broadest sense, is an entity that can
        perceive its environment through sensors and act upon that environment
        through actuators to achieve specific goals. This definition encompasses
        everything from simple software programs to sophisticated AI systems,
        and even biological entities.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Core Characteristics of Agents
      </h2>

      <h3 className="text-lg font-medium mb-3">Autonomy</h3>

      <p className="mb-6">
        The primary characteristic that defines an agent is autonomy – the
        ability to operate independently without direct intervention from humans
        or other systems. An agent must be capable of making decisions based on
        its own analysis of the situation and its programmed objectives.
      </p>
    </div>
  );

  const LatexContent = () => (
    <div className="flex-1 overflow-auto p-8">
      <pre className="font-mono text-sm whitespace-pre-wrap">
        {`\\documentclass{article}

\\title{Understanding Agents: From Concept to Applications}
\\author{Claude}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
In the rapidly evolving landscape of technology and artificial intelligence, the concept of an
''agent'' has become increasingly significant. An agent, in its broadest sense, is an entity that can
perceive its environment through sensors and act upon that environment through actuators to
achieve specific goals. This definition encompasses everything from simple software programs to
sophisticated AI systems, and even biological entities.

\\section{Core Characteristics of Agents}

\\subsection{Autonomy}
The primary characteristic that defines an agent is autonomy -- the ability to operate
independently without direct intervention from humans or other systems. An agent must be
capable of making decisions based on its own analysis of the situation and its programmed
objectives.

\\end{document}`}
      </pre>
    </div>
  );

  return (
    <div
      className="bg-[#1a1a1a] w-[100vw]"
      // className="bg-zinc-800 w-[100vw]"
    >
      <div className=" mx-auto py-[10px] px-[10px] h-screen flex flex-col ">
        <div className="relative flex flex-1 gap-[10px]  overflow-hidden">
          {/* Sidebar */}
          <div
            className={`absolute left-0 top-0 h-full bg-zinc-800 rounded-xl z-[999] transition-all duration-300 ease-in-out
              inset-0 bg-black/40 backdrop-blur-xl`}
            // className={`absolute left-0 top-0 h-full bg-zinc-800 rounded-xl z-[999] transition-all duration-300 ease-in-out backdrop-blur-sm shadow-lg shadow-black/15 bg-[rgba(228,228,228,0.12)]`}
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
                      <div className="space-y-2">
                        {files.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer"
                            // onClick={() => handleDocumentClick(doc)}
                          >
                            <FileText className="h-4 w-4" />
                            <span>{doc.text}</span>
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

          {/* Invisible hover area */}
          <div
            className="absolute left-0 top-0 w-[100px] h-full z-20 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></div>

          {/* Chat area */}
          <div className="flex-1 p-4  bg-[#2a2a2a]  rounded-xl ml-16 z-[2]">
            <div className="flex flex-col justify-start items-center h-full  relative  ">
              {/* Top buttons */}
              <div className="flex basis-[5%] justify-between items-center mb-4">
                {/* {topItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <button
                      className="flex flex-col items-center p-2 rounded-lg "
                      onClick={() => handleTopItemClick(item.text)}
                    >
                      {item.icon === proInfo ? (
                        <img src={item.icon} className="w-10 h-10" />
                      ) : (
                        <item.icon className="text-white  w-8 h-8" />
                      )}
                    </button>
                    {hoveredIndex === index && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 px-2 py-1 bg-black text-slate-200 text-xs rounded whitespace-nowrap z-10">
                        {item.text}
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                      </div>
                    )}
                  </div>
                ))} */}
                <div className=" h-full  basis-[50%]  ">
                  {" "}
                  <DockMenu />
                </div>
              </div>

              {/* Render the active modal */}
              {activeModal && (
                <div className="absolute z-[99] flex items-center  justify-center top-[100px] w-full  ">
                  {renderModal()}
                </div>
              )}

              {!activeMode && (
                <div className="">
                  {" "}
                  <button
                    className="flex justify-center items-center"
                    onClick={() => setActiveMode(true)}
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

              {/* Chat container */}
              <div className="container basis-[95%] h-full mx-auto p-4 flex flex-col justify-end   ">
                <div className="relative mb-4">
                  <button
                    className="w-full p-2 text-left font-semibold flex justify-between items-center bg-[#1a1a1a] rounded-lg text-slate-300"
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
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#1a1a1a] border-2 border-[#1a1a1a] rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {chatSessions.map((chat) => (
                        <button
                          key={chat.id}
                          className="w-full p-4 text-left text-slate-300 hover:bg-[#2a2a2a]"
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
                  <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                    <div className="min-h-[200px] max-h-[500px] overflow-y-auto p-4 space-y-2">
                      {activeChat.messages.map((message, index) => {
                        const isRecentAI =
                          message.sender !== "user" &&
                          index === activeChat.messages.length - 1;
                        return (
                          <div className="relative flex flex-col group ">
                            <div
                              key={message.id}
                              className={`p-2  rounded-lg ${
                                message.sender === "user"
                                  ? "bg-[#2a2a2a]  ml-auto text-slate-300"
                                  : "bg-[#2a2a2a] text-slate-300"
                              } max-w-[80%]`}
                            >
                              {message.text}
                            </div>
                            <div className="flex flex-col ">
                              {message.sender !== "user" && (
                                <div
                                  className={`${
                                    isRecentAI ? "flex" : " group-hover:flex"
                                  } space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                >
                                  {bottomButtons?.map((item, index) => (
                                    <div
                                      key={index}
                                      className="relative"
                                      onMouseEnter={() =>
                                        setSmallHoveredIndex(index)
                                      }
                                      onMouseLeave={() =>
                                        setSmallHoveredIndex(null)
                                      }
                                    >
                                      <button className="flex flex-col items-center p-2 rounded-lg  transition-colors duration-200">
                                        <item.icon className="w-4 h-4 text-white" />
                                      </button>
                                      {smallHoveredIndex === index && (
                                        <div className="absolute left-1/2 transform -translate-x-1/2 top-full   py-2 px-3 bg-black text-slate-200 text-xs rounded whitespace-nowrap z-10">
                                          {item.text}
                                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center p-4 border-t border-[#2a2a2a]">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Type your message..."
                        className="flex-grow p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-l-lg focus:outline-none focus:border-gray-400 text-slate-300 placeholder-gray-400"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-r-lg text-white hover:bg-blue-500/20 transition-colors"
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
          <div className="w-[40%] flex flex-col gap-[5px]">
            <div className="basis-[5%] flex justify-between px-4  bg-[#2a2a2a]  rounded-xl">
              {sideItems.map((item, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center  p-2 rounded-lg  transition-colors duration-200"
                >
                  <img src={item.icon} className="w-5 h-5  " alt={item.text} />
                  <span className="text-xs  text-white">{item.text}</span>
                </button>
              ))}
            </div>
            <div className="basis-[95%]  bg-[#2a2a2a]  rounded-xl overflow-hidden overflow-y-auto flex justify-between flex-col">
              <div className="basis-[98%]  py-2 px-4 overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#2a2a2a] hover:scrollbar-thumb-gray-500">
                <div ref={scrollRef} className="flex-1    ">
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
              </div>
              <div className="basis[2%]  flex justify-end   bg-[#2a2a2a] shadow-2xl  ">
                {outputButtons?.map((item, index) => (
                  <div
                    key={index}
                    className="relative pr-4"
                    onMouseEnter={() => setOutputHoveredIndex(index)}
                    onMouseLeave={() => setOutputHoveredIndex(null)}
                  >
                    <button className="flex flex-col items-center p-2 rounded-lg  transition-colors duration-200">
                      <item.icon className="w-5 h-5 text-white" />
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
          </div>
        </div>
      </div>
    </div>
    // <div className="flex h-screen bg-gray-900 text-gray-100">
    //   {/* Left Sidebar */}
    //   <div
    //     className={`${
    //       isDocumentOpen ? "w-1/2" : "w-full"
    //     } border-r border-gray-700 p-4 flex flex-col transition-all duration-300`}
    //   >
    //     {/* Top search bar */}
    //     <div className="flex items-center gap-2 mb-4">
    //       <Search className="w-5 h-5 text-gray-400" />
    //       <div className="flex-1 bg-gray-800 rounded-lg px-4 py-2">
    //         What is an Agent? Comprehensive Essay
    //       </div>
    //     </div>

    //     {/* Chat messages */}
    //     <div className="flex-1 overflow-auto">
    //       {/* User message */}
    //       <div className="flex gap-3 mb-6">
    //         <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
    //           S
    //         </div>
    //         <div>
    //           <div className="text-gray-300">
    //             write an essay for what is an agent
    //           </div>
    //         </div>
    //       </div>

    //       {/* Assistant message */}
    //       <div className="mb-6">
    //         <div className="mb-4">
    //           I'll help you write a comprehensive essay about agents.
    //         </div>

    //         <DocumentPreview />

    //         <div className="text-gray-300">
    //           I've created a comprehensive essay about agents that covers their
    //           fundamental concepts, types, applications, and implications. The
    //           essay is structured to provide both breadth and depth, starting
    //           with basic definitions and moving through to complex
    //           considerations and future directions.
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
    //         </div>
    //       </div>
    //     </div>

    //     {/* Input area */}
    //     <div className="mt-4">
    //       <div className="bg-gray-800 rounded-lg p-4">
    //         <div className="flex items-center gap-2 mb-4">
    //           <textarea
    //             className="flex-1 bg-transparent resize-none outline-none"
    //             placeholder="Reply to Claude..."
    //             rows={1}
    //           />
    //         </div>
    //         <div className="flex justify-between items-center">
    //           <div className="flex gap-2">
    //             <button className="text-gray-400">
    //               <Image size={20} />
    //             </button>
    //           </div>
    //           <button className="text-gray-400">
    //             <Send size={20} />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right Document Panel */}
    //   {isDocumentOpen && (
    //     <div className="flex-1 flex flex-col">
    //       {/* Document header */}
    //       <div className="flex items-center justify-between p-4 border-b border-gray-700">
    //         <div className="flex items-center gap-3">
    //           <button className="text-gray-400" onClick={toggleDocument}>
    //             <X size={20} />
    //           </button>
    //           <h2>Understanding Agents: From Concept to Applications</h2>
    //         </div>
    //         <div className="flex items-center gap-3">
    //           <button
    //             className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
    //             onClick={() => console.log("Recompiling...")}
    //           >
    //             <RefreshCw size={16} />
    //             Recompile
    //           </button>
    //           <button className="text-gray-400">
    //             <Star size={20} />
    //           </button>
    //           <button className="text-gray-400">
    //             <Share2 size={20} />
    //           </button>
    //         </div>
    //       </div>

    //       {/* Format toggle and content */}
    //       <div className="flex-1 flex flex-col">
    //         {/* Format toggle bar */}
    //         <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-850">
    //           <FormatToggle />
    //         </div>

    //         {/* Dynamic content based on selected format */}
    //         {activeFormat === "markdown" ? (
    //           <MarkdownContent />
    //         ) : (
    //           <LatexContent />
    //         )}
    //       </div>

    //       {/* Document footer */}
    //       <div className="flex items-center justify-between p-4 border-t border-gray-700">
    //         <div className="text-sm text-gray-400">Last edited just now</div>
    //         <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
    //           Publish
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Home;
