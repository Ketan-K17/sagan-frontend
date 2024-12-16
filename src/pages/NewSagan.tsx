import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Star,
  FileText,
  Download,
  Clipboard,
  History,
  ChevronDown,
  Send,
  ChevronUp,
  BookMarked,
  DiamondMinus,
  Folder,
  ChevronRight,
  Copyright,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import share from "../assets/share.svg";
import NewChatContainer from "../components/NewChatContainer";
import Sagan from "../assets/sagan-svg.svg";
import { NeonGradientCard } from "../components/ui/neon-gradient-card";
import DockMenu from "../components/DockMenu";
import ProjectInfo from "../components/ProjectInfo";
import TemplateForm from "../components/TemplateForm";
import PromptForm from "../components/PromptForm";
import LibraryForm from "../components/LibraryForm";
import CompanyForm from "../components/CompanyForm";
import axios from "axios";
import { useSagan } from "../context/context";
import { InitiateWebsocket } from "../services/websocket";
const NewSagan = () => {
  const { state, dispatch } = useSagan();
  const [isOpenSection, setIsOpenSection] = useState(false);
  const [isOpenFiles, setIsOpenFiles] = useState(false);
  // const [storePrompt, setStorePrompt] = useState("");
  // const [step, setStep] = useState(1);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState("markdown");
  const [isPrompt, setIsPrompt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [activeMode, setActiveMode] = useState(false);
  const [responseText, setResponseText] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState(
    localStorage.getItem("prompt") || ""
  );
  const [expandedFolders, setExpandedFolders] = useState({});
  // const [sectionMode, setSectionMode] = useState(false);
  const [sectionHeading, setSectionsHeadings] = useState(
    localStorage.getItem("sections") || []
  );
  const [outputHoveredIndex, setOutputHoveredIndex] = useState<number | null>(
    null
  );

  const sectionRefs = useRef({});
  const [sectionContents, setSectionContents] = useState({});

  // const [chatMode, setChatMode] = useState(false);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

  const [latexData, setLatexData] = useState(localStorage.getItem("latex"));
  const [mdData, setMdData] = useState(localStorage.getItem("md"));
  // const [pdfData, setPdfData] = useState(localStorage.getItem("pdf"));
  // const [aiText, setAiText] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [selectedSectionHeading, setSelectedSectionHeading] = useState(
    localStorage.getItem("selectedHeading") || ""
  );

  const [localLatex, setLocalLatex] = useState(
    localStorage.getItem("latex") || ""
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

  // CHAT CONTAINER CODE STARTS HERE

  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);

  const selectedSectionData = state.allChatData?.find(
    (i) => i.section_heading === state.selectedSectionHeading
  );

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendPromptHandler = async (booleanResp: any) => {
    if (state?.isApiRunning) {
      const lastMsgOfSelectedSection =
        selectedSectionData?.messages[
          selectedSectionData?.messages.length - 1
        ] || {};
      if (lastMsgOfSelectedSection?.hasOwnProperty("received")) {
        webSocketObj.send({
          key: lastMsgOfSelectedSection?.received?.type,
          value: booleanResp || text,
        });
        dispatch({
          type: "SET_ALL_CHAT_DATA",
          payload: {
            type: "llm",
            data: {
              sent: {
                data: booleanResp || text,
              },
            },
          },
        });
      }
      setText("");
      scrollToBottom();
    } else {
      dispatch({
        type: "SET_ALL_CHAT_DATA",
        payload: {
          type: "llm",
          data: {
            sent: {
              data: text,
            },
          },
        },
      });
      dispatch({
        type: "SET_IS_API_RUNNING",
        payload: true,
      });
      dispatch({
        type: "SET_USER_QUERY_COPY",
        payload: text,
      });

      setLoader(true);

      const response = await axios.post("http://127.0.0.1:8002/process-input", {
        message: text,
        section_number: selectedSectionData?.id,
      });

      const response2 = response?.data;
      dispatch({
        type: "SET_ALL_CHAT_DATA",
        payload: {
          type: "llm",
          data: { ...response2, userPrompt: getState().userQueryCopy },
        },
      });

      dispatch({ type: "SET_USER_QUERY_COPY", payload: "" });
      dispatch({ type: "SET_IS_API_RUNNING", payload: false });
      setText("");
      // if (response?.data) {
      //   const pdfData = response?.data?.pdf_file;
      //   if (pdfData) {
      //     dispatch({ type: "SET_PDF_DATA", payload: pdfData });
      //     localStorage.setItem("pdf", pdfData);
      //   }

      //   const mdData = response?.data?.md_file;
      //   if (mdData) {
      //     dispatch({ type: "SET_MD_DATA", payload: mdData });
      //     localStorage.setItem("md", mdData);
      //   }

      //   const latexData = response?.data?.tex_file;
      //   if (latexData) {
      //     dispatch({ type: "SET_LATEX_DATA", payload: latexData });
      //     localStorage.setItem("latex", latexData);
      //   }
      // }

      setLoader(false);

      setTimeout(() => {
        scrollToBottom();
      }, 1000);
    }
  };

  // CHAT CONTAINER CODE ENDS HERE

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

    const responses = await axios.post(
      "http://127.0.0.1:8000/process-input-first-wrokflow",
      {
        message: state?.userPrompt,
      }
    );

    // console.log(responses.data, "response data");
    const firstResponse = responses?.data;
    // console.log(firstResponse, "firstResponse");
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

  const decodeHTMLEntitiesFromLatex = () => {
    const textArea = document.createElement("textarea");

    textArea.innerHTML = renderLatexWithIds(state.latexData);
    return textArea?.value;
  };

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

  // const downloadPdf = async () => {
  //   console.log(state.pdfData, "pdf data");
  // };

  function base64ToBlob(base64, mime) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }

  function downloadPDF(base64String, fileName) {
    const blob = base64ToBlob(base64String, "application/pdf");
    const blobURL = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobURL);
  }

  // console.log(state.fileStructure, "file structure");

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };
  const messagesTopRef = useRef(null); // Ref for the top of the page
  // const messagesEndRef = useRef(null); // Ref for the bottom of the page
  const [currPosition, setCurrPosition] = useState("top");

  const scrollToTop = () => {
    setCurrPosition("bottom");
    messagesTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottomN = () => {
    setCurrPosition("top");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Create debounced version of save function

  const [timeoutId, setTimeoutId] = useState<number | NodeJS.Timeout | null>(
    null
  );

  const contentEditableRef = useRef(null);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Convert image to a path or Base64 (depending on your backend approach)
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imagePath = `uploaded-images/${file.name}`; // Example path

  //       // Get the cursor position and insert LaTeX image command
  //       const contentEditable = contentEditableRef.current;
  //       const cursorPosition = window.getSelection().getRangeAt(0);

  //       // Insert the LaTeX image placeholder at the current cursor position
  //       const latexCommand = `\\includegraphics[width=\\textwidth]{${imagePath}}`;

  //       // Update the LaTeX content with the new command
  //       const updatedLatexContent =
  //         state.latexData.substring(0, cursorPosition.startOffset) +
  //         latexCommand +
  //         state.latexData.substring(cursorPosition.startOffset);

  //       // Dispatch updated LaTeX content
  //       dispatch({ type: "SET_LATEX_DATA", payload: updatedLatexContent });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = localLatex.substring(0, caretLocation);
    const textAfterCursor = localLatex.substring(caretLocation);
    const newLatex =
      textBeforeCursor +
      `
    \\begin{figure}
        \\centering    
        \\includegraphics[width=0.25\\linewidth]{{./${file.name}}}
    \\end{figure}
    ` +
      textAfterCursor;

    setLocalLatex(newLatex);
    // dispatch({ type: "SET_LATEX_DATA", payload: newLatex });
    // localStorage.setItem("latex", newLatex);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("latex", localLatex);
    formData.append("cursor_position", caretLocation);
    const res = await axios.post(
      "http://127.0.0.1:8002/upload-image-to-latex",
      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res, "res");

    // if (res.data.latex) {
    //   dispatch({ type: "SET_LATEX_DATA", payload: res?.data?.latex });
    //   localStorage.setItem("latex", res?.data?.latex);
    // }
  };

  const [caretLocation, setCaretLocation] = useState(0);

  const preInputClickHandler = (e) => {
    console.log(e, e.target, e.target.selectionStart);

    setCaretLocation(e.target.selectionStart);
    // if (document.getSelection) {
    //   // all browsers, except IE before version 9
    //   var sel = document.getSelection();
    //   // sel is a string in Firefox and Opera,
    //   // and a selectionRange object in Google Chrome, Safari and IE from version 9
    //   // the alert method displays the result of the toString method of the passed object
    //   console.log(sel, "1", sel.focusOffset);
    //   setCaretLocation(sel.focusOffset);
    // } else {
    //   if (document.selection) {
    //     // Internet Explorer before version 9
    //     var textRange = document.selection.createRange();
    //     console.log(textRange.text, "2");
    //   }
    // }
  };

  const saveHandler = () => {
    setIsEditing(false);
    dispatch({ type: "SET_LATEX_DATA", payload: localLatex });
    localStorage.setItem("latex", localLatex);
  };

  const latexChangeHandler = (e: React.FormEvent<HTMLDivElement>) => {
    // const newContent = (e.target as HTMLDivElement).innerText;
    //

    setLocalLatex(e.target.value);

    // Clear the previous timeout
    // if (timeoutId) {
    //   clearTimeout(timeoutId as number);
    // }

    // // Set a new timeout to save after a delay (debouncing)
    // const newTimeoutId = setTimeout(() => {
    //   dispatch({ type: "SET_LATEX_DATA", payload: newContent });
    //   localStorage.setItem("latex", newContent);
    // }, 5000); // Save after 1 second of no edits

    // setTimeoutId(newTimeoutId);
  };
  console.log(typeof state.latexData);
  const compileHandler = async () => {
    const res = await axios.post("http://127.0.0.1:8002/update-latex", {
      latex_content: state.latexData,
    });

    if (res.data.pdf_file) {
      console.log(res, "res from compile");
      dispatch({ type: "SET_PDF_DATA", payload: res?.data?.pdf_file });
      localStorage.setItem("pdf", res?.data?.pdf_file);
      setActiveFormat("pdf");
    }
  };

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
        <div className="w-64  flex flex-col  h-full ">
          <div className="p-4 flex   justify-start">
            <h1
              className="text-transparent bg-clip-text font-montserrat
                  bg-gradient-to-r from-blue-400 to-purple-400   text-2xl font-bold"
            >
              SAGAN
            </h1>
          </div>
          <hr className="border-gray-800" />
          <div className="flex  flex-col h-full  overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#2a2a2a] hover:scrollbar-thumb-gray-500 ">
            <div

            // className="flex-1   overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#2a2a2a] hover:scrollbar-thumb-gray-500  "
            >
              <div className="p-4 flex flex-col ">
                <div className="  basis-[30%] mb-6">
                  <h2
                    className="text-md  text-white mb-2  flex items-center cursor-pointer justify-between"
                    onClick={() => setIsOpenFiles(!isOpenFiles)}
                  >
                    <span className="font-montserrat text-md">
                      {" "}
                      LITERATURE FILES
                    </span>
                    {isOpenFiles ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </h2>
                  {isOpenFiles &&
                    // <div className="space-y-2 flex flex-col">
                    //   {state?.files?.map((file, index) => (
                    //     <div
                    //       key={index}
                    //       className="flex items-center space-x-2"
                    //     >
                    //       <FileText className="h-4 w-4 mb-1" />
                    //       <p className="text-sm">{file}</p>
                    //     </div>
                    //   ))}
                    // </div>

                    state.fileStructure.map((folder) => (
                      <div key={folder.folderName} className="space-y-1">
                        <div
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
                          onClick={() => toggleFolder(folder.folderName)}
                        >
                          {expandedFolders[folder.folderName] ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                          <Folder className="h-4 w-4 text-blue-400" />
                          <span className="text-sm  font-montserrat">
                            {folder.folderName}
                          </span>
                        </div>

                        {expandedFolders[folder.folderName] && (
                          <div className="ml-6 space-y-1">
                            {folder.files.map((file) => (
                              <div
                                key={file}
                                className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                              >
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-montserrat">
                                  {file}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="  basis-[60%] h-full mb-6 overflow-hidden">
                  <h2
                    className="text-md  text-white mb-2 flex items-center cursor-pointer justify-between"
                    onClick={() => setIsOpenSection(!isOpenSection)}
                  >
                    <span className="font-montserrat  text-md">
                      SECTION OUTLINED
                    </span>
                    {isOpenSection ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </h2>
                  {isOpenSection && (
                    <div className="space-y-2   ">
                      {state.allChatData?.map((obj: any) => {
                        return (
                          <p
                            key={obj?.id}
                            onClick={() => {
                              scrollToSection(obj.section_heading);
                              scrollToMdSection(obj.section_heading);
                            }}
                            className="pl-2 cursor-pointer "
                          >
                            <span className="font-montserrat text-sm">
                              {" "}
                              {obj.id}
                            </span>
                            <span className="text-sm px-2  font-montserrat">
                              {obj?.section_heading}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 mx-2 p-2 rounded-md bg-[#1a1a1a]">
            {/* <img src={Sagan} alt="sagan" className="w-8 h-8" /> */}
            {/* <h1>SPAIDER SPACE</h1> */}

            {/* <img src={Logo} className="w-12 h-12" alt="spaider" /> */}
            {/* <h1
              className="uppercase flex flex-col "
              style={{ letterSpacing: "0.1em" }}
            >
              <span className="text-2xl font-bold  text-white">
                sp
                <span
                  className="text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-400 to-purple-400"
                >
                  AI
                </span>
                der
              </span>
              <span className="text-sm font-semibold   text-white  ml-1">
                space
              </span>
            </h1> */}
            <h1
              className="uppercase flex items-end font-montserrat "
              style={{ letterSpacing: "0.1em" }}
            >
              <span className="text-2xl font-bold  text-white">
                sp
                <span
                  className="text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-400 to-purple-400"
                >
                  AI
                </span>
                der
              </span>
              <span className="text-sm font-semibold   text-white mb-1 ml-1">
                space
              </span>
            </h1>
            <p className="flex items-center gap-2 text-sm  font-montserrat">
              {" "}
              <span>
                {" "}
                <Copyright size={16} />{" "}
              </span>
              All rights reserved
            </p>
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
          isDocumentOpen ? "w-1/2" : "w-full "
        } transition-all duration-300  relative `}
      >
        <div className="h-[calc(100vh-112px)] overflow-auto scrollbar-hide">
          <div ref={messagesTopRef} />

          <div className="">
            <DockMenu setActiveModal={setActiveModal} />
          </div>

          <div className="">
            {/* <DockMenu setActiveModal={setActiveModal} /> */}
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
                  {state.isPrompt && (
                    <p className="text-sm font-montserrat">click here</p>
                  )}
                </button>
              </div>
            )}

            {!state.chatMode && state.activeMode && (
              <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center  space-y-5">
                  <p
                    className="uppercase text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-400 to-purple-400   text-sm font-montserrat font-bold"
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
                <NewChatContainer
                  webSocketObj={webSocketObj}
                  getState={getState}
                  toggleDocument={toggleDocument}
                  text={text}
                  setText={setText}
                  scrollToBottom={scrollToBottom}
                  selectedSectionData={selectedSectionData}
                  setLoader={setLoader}
                  messagesEndRef={messagesEndRef}
                  sendPromptHandler={sendPromptHandler}
                />
              </div>
            )}
          </div>
        </div>
        <InputChatBox
          text={text}
          setText={setText}
          sendPromptHandler={sendPromptHandler}
          scrollToTop={scrollToTop}
          scrollToBottomN={scrollToBottomN}
          currPosition={currPosition}
        />
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
                  className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition-all duration-200 ${
                    activeFormat === "markdown"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <DiamondMinus size={16} />
                  <span className="text-sm font-montserrat">Markdown</span>
                </label>

                <label
                  htmlFor="latex"
                  className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition-all duration-200 ${
                    activeFormat === "latex"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <BookMarked size={16} />
                  <span className="text-sm font-montserrat">LaTeX</span>
                </label>

                <button className=" bg-blue-600 text-sm font-montserrat relative  py-1 rounded-full px-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4 p-2  text-sm font-montserrat border border-gray-300 rounded cursor-pointer opacity-0 absolute inset-0"
                  />
                  upload
                </button>

                {isEditing ? (
                  <button
                    className=" bg-blue-600 text-sm font-montserrat relative  py-1 rounded-full px-2"
                    onClick={saveHandler}
                  >
                    save
                  </button>
                ) : (
                  <button
                    className=" bg-blue-600 text-sm font-montserrat relative  py-1 rounded-full px-2"
                    onClick={() => setIsEditing(true)}
                  >
                    edit
                  </button>
                )}
              </div>
              <button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200 flex items-center gap-2 shadow-sm"
                onClick={() => {
                  compileHandler();
                  // setActiveFormat("pdf")
                }}
              >
                <FileText size={16} />
                <span className="text-sm  font-montserrat"> Compile</span>
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
                      className="font-montserrat text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: processedMarkdown }}
                    />
                  </div>
                </div>
              ) : activeFormat === "latex" ? (
                <>
                  {isEditing ? (
                    // <div className="p-8">
                    // {" "}
                    <textarea
                      className="w-full bg-[#2a2a2a] h-full font-montserrat text-sm whitespace-pre-wrap outline-none scrollbar-none"
                      value={localLatex}
                      onClick={preInputClickHandler}
                      onChange={(e) => latexChangeHandler(e)}
                    />
                  ) : (
                    // </div>
                    <div className="p-8">
                      <pre
                        id="123"
                        className="font-montserrat text-sm whitespace-pre-wrap outline-none"
                        dangerouslySetInnerHTML={{
                          __html: renderLatexWithIds(state.latexData),
                        }}

                        // onClick={preInputClickHandler}
                      />
                    </div>
                  )}
                </>
              ) : activeFormat === "pdf" ? (
                <iframe
                  src={`data:application/pdf;base64,${state.pdfData}`}
                  width="100%"
                  height="100%"
                  style={{ border: "0", fontFamily: "font-montserrat" }}
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
                  ) : item.text === "Download" ? (
                    <item.icon
                      size={16}
                      onClick={() => downloadPDF(state.pdfData, "fnr.pdf")}
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

export default NewSagan;

const InputChatBox = ({
  text,
  setText,
  sendPromptHandler,

  scrollToTop,
  scrollToBottomN,
  currPosition,
}: any) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 max-w-3xl mx-auto">
      {/* <Star size={20} className={`${loader ? "pulse-logo" : ""}`} /> */}
      {/* <div ref={messagesEndRefN} /> */}
      <button
        className="bg-blue-400 p-2 rounded-full  absolute right-4 top-[-50px]  "
        // onClick={handleClick}
      >
        {currPosition === "top" ? (
          <ArrowUp size={16} onClick={scrollToTop} />
        ) : (
          <ArrowDown size={16} onClick={scrollToBottomN} />
        )}
      </button>
      <div className="pt-4">
        <div className="bg-[#2a2a2a] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <textarea
              className="flex-1 bg-transparent resize-none outline-none  text-sm font-montserrat"
              placeholder="Reply to Sagan..."
              rows={2}
              value={text}
              onChange={(e) => {
                // dispatch({
                //   type: "SET_USER_QUERY",
                //   payload: e.target.value,
                // });
                setText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (["enter", "Enter", "submit", "go"].includes(e.key)) {
                  e.preventDefault();
                  // fakeLlmChat();
                  sendPromptHandler();
                }
              }}
            />
            <button onClick={sendPromptHandler} className="mb-2">
              <Send size={26} />
            </button>
            {/* <button onClick={testClickHandler}>test</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
