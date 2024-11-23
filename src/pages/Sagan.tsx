import React, { useState, useMemo, useRef, useEffect } from "react";
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
  FileStack,
  CircleUser,
  Send,
} from "lucide-react";
import share from "../assets/share.svg";
import ChatContainer from "../components/ChatContainer";
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
import Logo from "../assets/white_logo.svg";
import { useSagan } from "../context/context";
import firstResponse from "./firstResponse.json";
import secoundResponse from "./secoundResponse.json";
import { InitiateWebsocket } from "../services/websocket";
const SESSION_ID = 1234;
const Segan = () => {
  const { state, dispatch } = useSagan();
  const [storePrompt, setStorePrompt] = useState("");
  const [step, setStep] = useState(1);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState("markdown");
  const [isPrompt, setIsPrompt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [responseText, setResponseText] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState(
    localStorage.getItem("prompt") || ""
  );
  const [sectionMode, setSectionMode] = useState(false);
  const [sectionHeading, setSectionsHeadings] = useState(
    localStorage.getItem("sections") || []
  );
  const [outputHoveredIndex, setOutputHoveredIndex] = useState<number | null>(
    null
  );

  const sectionRefs = useRef({});
  const [sectionContents, setSectionContents] = useState({});

  const [chatMode, setChatMode] = useState(false);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

  const [latexData, setLatexData] = useState(localStorage.getItem("latex"));
  const [mdData, setMdData] = useState(localStorage.getItem("md"));
  const [pdfData, setPdfData] = useState(localStorage.getItem("pdf"));
  const [aiText, setAiText] = useState("");

  const [selectedSectionHeading, setSelectedSectionHeading] = useState(
    localStorage.getItem("selectedHeading") || ""
  );

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

  // websocket code

  const webSocketObj = useMemo(() => new InitiateWebsocket(), []);
  const newStateRef = useRef(state);
  useEffect(() => {
    newStateRef.current = state;
  }, [state]);

  const getState = () => {
    console.log(newStateRef.current, "new state ref");
    return newStateRef.current;
  };
  const [connectionTokenApi, toggleConnectionTokenApi] = useState(true);
  // useEffect(() => {
  //   if (connectionTokenApi) {
  //     dispatch(getConnectionToken());
  //   }
  // }, [connectionTokenApi]);
  const connectionTokenStoredInStateManagement = "1234";
  useEffect(() => {
    if (connectionTokenStoredInStateManagement) {
      let interval;
      toggleConnectionTokenApi(false);
      webSocketObj.initiateConnection(
        connectionTokenStoredInStateManagement,
        dispatch,
        getState
      );
      // webSocketObj.send({ userMsg: "great" });
      webSocketObj.reconnectOnClose(() => {
        //   console.log("reconnect", new Date()); if you want to check reconnects in console
        toggleConnectionTokenApi(true);
      });

      //setting up ping keep-alive check
      // interval = setInterval(() => {
      //   if (webSocketObj.checkIfSocketOpen()) {
      //     webSocketObj.keepAlivePingMessage();
      //     console.log("remove warning of disconnection to user");
      //   } else {
      //     console.log("show warning of disconnection to user");
      //   }
      // }, 10000);
    }
  }, [connectionTokenStoredInStateManagement]);

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

  useEffect(() => {
    let storedData = localStorage.getItem("first_reponse");

    let newData = {};
    newData = storedData ? JSON.parse(storedData) : {};
    newData = { data: newData };

    const latexData = newData?.data?.tex_file;

    if (latexData) {
      dispatch({ type: "SET_LATEX_DATA", payload: latexData });
      localStorage.setItem("latex", latexData);
    }
    if (state.allChatData.length === 0 && state.chatMode) {
      const data = newData?.data?.section_headings?.map((heading, index) => ({
        id: index + 1,
        section_heading: heading,
        messages:
          index === 0
            ? [
                {
                  aiMessage:
                    newData?.data?.ai_message ||
                    "Your darft has been generated successfully",
                  userPrompt: state.userPrompt,
                },
              ]
            : [],
      }));

      setSectionsHeadings(newData?.data?.section_headings);

      dispatch({ type: "SET_ALL_CHAT_DATA", payload: data });
      setSelectedSectionHeading(newData?.data?.section_headings[0]);
    }
  }, []);

  const startSagan = async () => {
    setResponseText("");

    localStorage.setItem("first_reponse", JSON.stringify(firstResponse));

    if (firstResponse) {
      dispatch({ type: "SET_CHAT_MODE", payload: true });

      const data = firstResponse?.section_headings.map((heading, index) => ({
        id: index + 1,
        section_heading: heading,
        messages:
          index === 0
            ? [
                {
                  aiMessage: firstResponse?.ai_message,
                  userPrompt: state.userPrompt,
                },
              ]
            : [],
      }));

      dispatch({ type: "SET_ALL_CHAT_DATA", payload: data });
      dispatch({
        type: "SET_SELECTED_SECTION_HEADING",
        payload: firstResponse?.section_headings[0],
      });
    }
    const response = { data: firstResponse };
    const pdfData = response?.data?.pdf_file;
    if (pdfData) {
      dispatch({ type: "SET_PDF_DATA", payload: pdfData });
      localStorage.setItem("pdf", pdfData);
    }

    const mdData = response?.data?.md_file;
    if (mdData) {
      dispatch({ type: "SET_MD_DATA", payload: mdData });
      localStorage.setItem("md", mdData);
    }

    const latexData = response?.data?.tex_file;

    if (latexData) {
      dispatch({ type: "SET_LATEX_DATA", payload: latexData });
      localStorage.setItem("latex", latexData);
    }

    const sections = response?.data?.section_headings;
    if (sections) {
      dispatch({ type: "SET_SECTION_HEADING", payload: sections });
      localStorage.setItem("sections", sections);
    }
  };

  // const ChatContainer = () => {
  //   const [text, setText] = useState("");
  //   const [loader, setLoader] = useState(false);

  //   const [aiMsg, setAiMsg] = useState(localStorage.getItem("aimsg"));

  //   const selectedSectionData = state.allChatData?.find(
  //     (i) => i.section_heading === state.selectedSectionHeading
  //   );
  //   const messagesEndRef = useRef<any>(null);
  //   console.log(messagesEndRef, "messagesEndRef");

  //   const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };

  //   let keyName;
  //   if (
  //     selectedSectionData?.messages?.length > 0 &&
  //     selectedSectionData?.messages[selectedSectionData?.messages.length - 1]
  //   ) {
  //     keyName = Object.keys(
  //       selectedSectionData?.messages[selectedSectionData?.messages?.length - 1]
  //     )[0];
  //   } else {
  //     keyName = "";
  //   }

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [keyName]);
  //   useEffect(() => {
  //     setText("");
  //   }, [state.counter]);

  //   const sendPromptHandler = async () => {
  //     if (state?.isApiRunning) {
  //       const lastMsgOfSelectedSection =
  //         selectedSectionData?.messages[
  //           selectedSectionData?.messages.length - 1
  //         ] || {};
  //       console.log({ lastMsgOfSelectedSection, selectedSectionData });
  //       if (lastMsgOfSelectedSection?.hasOwnProperty("received")) {
  //         webSocketObj.send({
  //           key: lastMsgOfSelectedSection?.received?.type,
  //           value: text,
  //         });
  //         dispatch({
  //           type: "SET_ALL_CHAT_DATA",
  //           payload: {
  //             type: "llm",
  //             data: {
  //               sent: {
  //                 data: text,
  //               },
  //             },
  //           },
  //         });
  //       }
  //       scrollToBottom();
  //     } else {
  //       dispatch({
  //         type: "SET_ALL_CHAT_DATA",
  //         payload: {
  //           type: "llm",
  //           data: {
  //             sent: {
  //               data: text,
  //             },
  //           },
  //         },
  //       });
  //       dispatch({
  //         type: "SET_IS_API_RUNNING",
  //         payload: true,
  //       });
  //       dispatch({
  //         type: "SET_USER_QUERY_COPY",
  //         payload: text,
  //       });

  //       setLoader(true);

  //       const response = await axios.post(
  //         "http://127.0.0.1:8002/process-input",
  //         {
  //           message: text,
  //           section_number: selectedSectionData?.id,
  //         }
  //       );

  //       const response2 = response?.data;
  //       dispatch({
  //         type: "SET_ALL_CHAT_DATA",
  //         payload: {
  //           type: "llm",
  //           data: { ...response2, userPrompt: getState().userQueryCopy },
  //         },
  //       });

  //       dispatch({ type: "SET_USER_QUERY_COPY", payload: "" });
  //       dispatch({ type: "SET_IS_API_RUNNING", payload: false });
  //       if (response?.data) {
  //         const pdfData = response?.data?.pdf_file;
  //         if (pdfData) {
  //           dispatch({ type: "SET_PDF_DATA", payload: pdfData });
  //           localStorage.setItem("pdf", pdfData);
  //         }

  //         const mdData = response?.data?.md_file;
  //         if (mdData) {
  //           dispatch({ type: "SET_MD_DATA", payload: mdData });
  //           localStorage.setItem("md", mdData);
  //         }

  //         const latexData = response?.data?.tex_file;
  //         if (latexData) {
  //           dispatch({ type: "SET_LATEX_DATA", payload: latexData });
  //           localStorage.setItem("latex", latexData);
  //         }
  //       }
  //       const selectedIdx = state?.allChatData?.findIndex(
  //         (i) => i.section_heading === state.selectedSectionHeading
  //       );
  //       if (selectedIdx > -1) {
  //         const formattedData = [
  //           ...state?.allChatData?.slice(0, selectedIdx),
  //           {
  //             ...state?.allChatData[selectedIdx],
  //             messages: [
  //               ...state.allChatData[selectedIdx].messages,
  //               { aiMessage: response2?.ai_message, userPrompt: storePrompt },
  //             ],
  //           },
  //           ...state.allChatData?.slice(selectedIdx + 1),
  //         ];
  //       }
  //       setStep(1);
  //       setLoader(false);

  //       setStorePrompt("");
  //       setTimeout(() => {
  //         scrollToBottom();
  //       }, 1000);
  //     }
  //   };

  //   const testClickHandler = () => {
  //     webSocketObj.send({ data: "this is test data" });
  //     const selectedIdx = state?.allChatData?.findIndex(
  //       (i) => i.section_heading === state.selectedSectionHeading
  //     );

  //     if (selectedIdx > -1) {
  //       const formattedData = [
  //         ...state.allChatData.slice(0, selectedIdx),
  //         {
  //           ...state?.allChatData[selectedIdx],
  //           llmChat: [
  //             ...state.allChatData[selectedIdx].llmChat,
  //             { sent: "this is test data" },
  //           ],
  //         },
  //         ...state.allChatData.slice(selectedIdx + 1),
  //       ];

  //       dispatch({
  //         type: "SET_ALL_CHAT_DATA",
  //         payload: formattedData,
  //       });
  //     }
  //   };

  //   console.log(state, "whole context state");

  //   return (
  //     <div className="h-full flex flex-col  pt-4   relative  ">
  //       <div className="flex-shrink-0 px-1 mb-4 relative z-10">
  //         <div className="relative inline-block">
  //           <select
  //             className="appearance-none bg-[#2a2a2a]/50 backdrop-blur-sm text-gray-300 px-4 py-2 pr-10 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-[#2a2a2a]/70 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50"
  //             value={state.selectedSectionHeading}
  //             onChange={(e) => {
  //               dispatch({
  //                 type: "SET_SELECTED_SECTION_HEADING",
  //                 payload: e.target?.value,
  //               });
  //             }}
  //           >
  //             {state.allChatData?.map((obj: any) => (
  //               <option key={obj?.id} value={obj?.section_heading}>
  //                 {obj?.section_heading}
  //               </option>
  //             ))}
  //           </select>

  //           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
  //         </div>
  //       </div>

  //       <div
  //         className="absolute inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
  //         id="chat-container"
  //       >
  //         {selectedSectionData?.messages?.map((obj: any, idx: number) => {
  //           if (obj.hasOwnProperty("sent") || obj.hasOwnProperty("received")) {
  //             return (
  //               <div>
  //                 {obj?.received?.data ? (
  //                   <div className="flex flex-col  items-baseline">
  //                     <p className="bg-[#2a2a2a]  p-2 rounded-xl">
  //                       {obj?.received?.data}
  //                     </p>
  //                     <img
  //                       src={Sagan}
  //                       className="w-8 h-8 mt-2 object-contain"
  //                     />
  //                   </div>
  //                 ) : (
  //                   <div className=" flex items-end flex-col ">
  //                     <p className="bg-[#2a2a2a]  p-2 rounded-xl">
  //                       {obj?.sent?.data}
  //                     </p>
  //                     <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center mt-2">
  //                       <CircleUser size={20} />
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             );
  //           } else {
  //             return (
  //               <div key={idx} className="mb-6 scrollbar-hide pt-10 chat-box">
  //                 <div className="space-y-6">
  //                   {/* User message */}
  //                   <div className="flex flex-col  items-end gap-3">
  //                     <div>
  //                       <div className="bg-[#2a2a2a]  p-2 rounded-xl">
  //                         {obj?.userPrompt}
  //                       </div>
  //                     </div>
  //                     <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
  //                       <CircleUser size={20} />
  //                     </div>
  //                   </div>

  //                   {/* Assistant message */}
  //                   <div>
  //                     <div className="bg-[#2a2a2a] p-4  rounded-xl ">
  //                       <div className="mb-4">{obj?.ai_message}</div>

  //                       {/* Document preview */}
  //                       <div
  //                         className="bg-[#1a1a1a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
  //                         onClick={toggleDocument}
  //                       >
  //                         <div className="text-gray-400">
  //                           <FileStack size={20} />
  //                         </div>
  //                         <div>
  //                           <div className="text-sm text-gray-400">
  //                             Click to open response document
  //                           </div>
  //                         </div>
  //                       </div>

  //                       {/* Action buttons */}
  //                       <div className="flex gap-2 mt-4 action-btns">
  //                         <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //                           <Copy size={16} />
  //                           Copy
  //                         </button>
  //                         <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //                           <MessageCircle size={16} />
  //                           Retry
  //                         </button>
  //                         <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm">
  //                           <ClipboardCopy size={16} />
  //                           Publish
  //                         </button>
  //                       </div>
  //                     </div>
  //                     <img
  //                       src={Sagan}
  //                       className="w-8 h-8 mt-2 object-contain"
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           }
  //         })}

  //         <div ref={messagesEndRef} />
  //       </div>

  //       <div className="absolute bottom-0 left-0 right-0 ">
  //         <div className="pt-4">
  //           <div className="bg-[#2a2a2a] rounded-lg p-4">
  //             <div className="flex items-center gap-2 mb-4">
  //               <textarea
  //                 className="flex-1 bg-transparent resize-none outline-none"
  //                 placeholder="Reply to Sagan..."
  //                 rows={2}
  //                 value={text}
  //                 onChange={(e) => {
  //                   setText(e.target.value);
  //                 }}
  //                 onKeyDown={(e) => {
  //                   if (["enter", "Enter", "submit", "go"].includes(e.key)) {
  //                     e.preventDefault();
  //                     sendPromptHandler();
  //                   }
  //                 }}
  //               />
  //               <button onClick={sendPromptHandler} className="mb-2">
  //                 <Send size={26} />
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* </div> */}
  //     </div>
  //   );
  // };

  // Initialize refs and parse content into sections

  localStorage.setItem("selectedHeading", selectedSectionHeading);
  useEffect(() => {
    if (state.allChatData && latexData) {
      // Initialize refs
      state.allChatData.forEach((section) => {
        sectionRefs.current[section.section_heading] = React.createRef();
      });

      // Parse latex content into sections
      const sections = {};
      let currentSection = "";
      let currentContent = [];

      // Split the latex data into lines
      const lines = latexData.split("\n");

      for (let line of lines) {
        // Check if line contains a section heading
        const sectionMatch = line.match(/\\section{([^}]+)}/);

        if (sectionMatch) {
          // If we were building a previous section, save it
          if (currentSection) {
            sections[currentSection] = currentContent.join("\n");
          }

          // Start new section
          currentSection = sectionMatch[1];
          currentContent = [];
        } else if (currentSection) {
          // Add line to current section
          currentContent.push(line);
        }
      }

      // Save the last section
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n");
      }

      setSectionContents(sections);
    }
  }, [state.allChatData, latexData, mdData]);

  useEffect(() => {
    if (state.allChatData) {
      const newRefs = {};
      state.allChatData.forEach((section) => {
        newRefs[section.section_heading] = React.createRef();
      });
      sectionRefs.current = newRefs;
    }
  }, [state.allChatData]);

  const processedMdData = React.useMemo(() => {
    let content = mdData;

    // Add anchor divs before each section heading
    state.allChatData?.forEach((section) => {
      const headingText = `# ${section.section_heading}`;
      const anchorDiv = `\n<div id="section-${section.id}" ref={sectionRefs.current['${section.section_heading}']}></div>\n`;
      content = content?.replace(headingText, `${anchorDiv}${headingText}`);
    });

    return content;
  }, [mdData, state.allChatData]);

  function scrollToSection(sectionHeading) {
    const section = document.getElementById(sectionHeading);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function renderLatexWithIds(latexData) {
    return latexData?.replace(
      /\\section\{(.*?)\}/g,
      (match, sectionTitle) => `<div id="${sectionTitle}">${match}</div>` // Wrap LaTeX section with a div
    );
  }

  function addIdsToMarkdownHeadings(markdownData) {
    return markdownData?.replace(
      /^(#{1,6})\s*(.+)$/gm, // Match Markdown headings (e.g., # Heading, ## Subheading)
      (match, hashes, heading) =>
        `${hashes} ${heading}\n<div id="${heading
          ?.trim()
          .replace(/\s+/g, "-")}"></div>`
    );
  }

  function scrollToMdSection(sectionHeading) {
    const sectionId = sectionHeading?.trim()?.replace(/\s+/g, "-");
    const section = document?.getElementById(sectionId);
    if (section) {
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const processedMarkdown = addIdsToMarkdownHeadings(state.mdData);

  return (
    <div className="min-h-screen  h-full bg-[#1a1a1a] text-gray-100">
      {/* Sidebar */}
      <div
        className={`absolute left-0 top-0 h-full bg-zinc-800 rounded-xl z-[999] transition-all duration-300 ease-in-out  
             inset-0 bg-black/40 backdrop-blur-xl`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: isVisible ? (isHovered ? "16rem" : "0") : "0",
          overflow: "hidden",
        }}
      >
        <div className="w-64  flex flex-col  h-full  ">
          <div className="p-4 flex   justify-start">
            <h1
              className="text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-400 to-purple-400   text-2xl font-bold"
            >
              SAGAN
            </h1>
          </div>
          <hr className="border-gray-800" />
          <div className="flex  flex-col h-full ">
            <div className="flex-1   overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#2a2a2a] hover:scrollbar-thumb-gray-500  ">
              <div className="p-4">
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-white mb-2">
                    LITERATURE FILES
                  </h2>

                  <div className="space-y-2 flex flex-col">
                    {state?.files?.map((file, index) => (
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
                    {state.allChatData?.map((obj: any) => {
                      return (
                        <p
                          key={obj?.id}
                          onClick={() => {
                            scrollToSection(obj.section_heading);
                            scrollToMdSection(obj.section_heading);
                          }}
                          className="pl-2 cursor-pointer"
                        >
                          <span className="px-1"> {obj.id}</span>
                          <span>{obj?.section_heading}</span>
                        </p>
                      );
                    })}
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
          {!state.activeMode && (
            <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {" "}
              <button
                className="flex flex-col space-y-4 justify-center items-center"
                style={{
                  opacity: state.isPrompt ? "1" : "0.5",
                }}
                onClick={() => {
                  startSagan();
                  dispatch({ type: "SET_ACTIVE_MODE", payload: true });
                }}
                disabled={!state.isPrompt}
              >
                <img src={Sagan} className="w-12 h-12 object-cover " />
                {state.isPrompt && <p>click here</p>}
              </button>
            </div>
          )}

          {!state.chatMode && state.activeMode && (
            <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center  space-y-5">
                <p
                  className="uppercase text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-400 to-purple-400   text-xl font-bold"
                >
                  sagan activated.......
                </p>
                <button
                  className="flex justify-center items-center"
                  onClick={() => {}}
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
            </div>
          )}

          {state.chatMode && (
            <div className="h-full max-w-3xl mx-auto px-4     overflow-hidden">
              <ChatContainer
                webSocketObj={webSocketObj}
                getState={getState}
                toggleDocument={toggleDocument}
              />
            </div>
          )}
        </div>
      </div>

      {isDocumentOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-1/2 flex flex-col bg-[#2a2a2a]   rounded-2xl px-4 py-2 mx-2 my-2">
          <div className="  basis-[2%] h-full  flex items-center justify-between py-1 border-b border-gray-700">
            <div className="flex items-center justify-between w-full  px-4 bg-gray-850">
              <div className="relative flex space-x-1">
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

                <label
                  htmlFor="markdown"
                  className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                    activeFormat === "markdown"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
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
                  <span className="font-medium">LaTeX</span>
                </label>
              </div>
              <button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200 flex items-center space-x-2 shadow-sm"
                onClick={() => setActiveFormat("pdf")}
              >
                <span className="font-medium"> Compile</span>
              </button>
            </div>
          </div>

          <div className="basis-[95%]  bg-[#2a2a2a]  rounded-xl overflow-hidden overflow-y-auto flex justify-between flex-col">
            {/* Content */}
            <div className="basis-[98%]  py-2 px-4 overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#2a2a2a] hover:scrollbar-thumb-gray-500">
              {activeFormat === "markdown" ? (
                <div className="p-8">
                  <div className="mx-auto space-y-8">
                    <pre
                      className="font-mono text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: processedMarkdown }}
                    />
                  </div>
                </div>
              ) : activeFormat === "latex" ? (
                <div className="p-8">
                  <pre
                    className="font-mono text-sm whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: renderLatexWithIds(state.latexData),
                    }}
                  />
                </div>
              ) : activeFormat === "pdf" ? (
                <iframe
                  src={`data:application/pdf;base64,${state.pdfData}`}
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                  title="PDF Viewer"
                ></iframe>
              ) : null}
            </div>
          </div>

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

export default Segan;
