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
import Logo from "../assets/white_logo.svg";
import { useSagan } from "../context/context";
import firstResponse from "./firstResponse.json";
import secoundResponse from "./secoundResponse.json";
import { InitiateWebsocket } from "../services/websocket";
const SESSION_ID = 1234;
const NewHome = () => {
  const { state, dispatch } = useSagan();
  // console.log(state?.activeMode, "from state");
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
  // const [latexData, setLatexData] = useState(localStorage.getItem("latex"));

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

  const [latexData, setLatexData] = useState(localStorage.getItem("latex"));
  const [mdData, setMdData] = useState(localStorage.getItem("md"));
  const [pdfData, setPdfData] = useState(localStorage.getItem("pdf"));
  const [aiText, setAiText] = useState("");

  // const [allChatData, setAllChatData] = useState<any>([]);
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
    // const newData = JSON?.parse(localStorage.getItem("first_reponse") || "");
    newData = { data: newData };

    // console.log(newData, "newData");

    const latexData = newData?.data?.tex_file;

    // console.log(latexData, "latexdata");
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

      // console.log(data, "data");
      setSectionsHeadings(newData?.data?.section_headings);

      dispatch({ type: "SET_ALL_CHAT_DATA", payload: data });
      // setAllChatData(data);
      setSelectedSectionHeading(newData?.data?.section_headings[0]);
      // dispatch({
      //   type: "SET_SELECTED_SECTION_HEADING",
      //   payload: firstResponse?.section_headings[0],
      // });
    }
  }, []);

  // console.log(state, "state");

  const startSagan = async () => {
    setResponseText("");

    localStorage.setItem("first_reponse", JSON.stringify(firstResponse));

    // const response = await axios.post(
    //   "http://127.0.0.1:8000/process-input-first-wrokflow",
    //   {
    //     message: userPrompt,
    //   }
    // );
    // const response1 = response?.data;

    // console.log(response1, response, "response1");
    // localStorage.setItem("first_reponse", JSON.stringify(response));
    if (firstResponse) {
      // activate sagan
      // setChatMode(true);
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

      // setAllChatData(data);
      dispatch({ type: "SET_ALL_CHAT_DATA", payload: data });
      // setSelectedSectionHeading(response1?.section_headings[0]);
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

    // console.log(response, "response from backend");
    // setPdfData(response?.data?.pdf_file);
    // setMdData(response?.data?.md_file);
    // setLatexData(response?.data?.tex_file);
    // setSectionsHeadings(response?.data?.section_headings);
    // setAiText(response?.data?.ai_message);
    // localStorage.setItem("latex", response?.data?.tex_file);
    // localStorage.setItem("md", response?.data?.md_file);
    // localStorage.setItem("pdf", response?.data?.pdf_file);
    // localStorage.setItem("sections", response?.data?.section_headings);
    // const latexResponse = response?.data.response;
    // if (typeof latexResponse !== "string") {
    //   console.error("Unexpected data format:", latexResponse);
    //   // setResponseText("Error: Invalid data format received from server.");
    //   return;
    // }

    // const latexContent = extractLatexContent(latexResponse);
    // console.log(latexContent);

    const latexData = response?.data?.tex_file;

    // console.log(latexData, "latexdata");
    if (latexData) {
      dispatch({ type: "SET_LATEX_DATA", payload: latexData });
      localStorage.setItem("latex", latexData);
    }

    const sections = response?.data?.section_headings;
    if (sections) {
      dispatch({ type: "SET_SECTION_HEADING", payload: sections });
      localStorage.setItem("sections", sections);
    }
    // setLatexData("");
    // setLatexData(latexContent);
    // localStorage.setItem("latex", latexContent);
  };

  const ChatContainer = () => {
    const [text, setText] = useState("");
    const [loader, setLoader] = useState(false);

    const [aiMsg, setAiMsg] = useState(localStorage.getItem("aimsg"));

    const selectedSectionData = state.allChatData?.find(
      (i) => i.section_heading === state.selectedSectionHeading
    );
    const messagesEndRef = useRef<any>(null);
    console.log(messagesEndRef, "messagesEndRef");

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // useEffect(() => {}, [state?.allChatData?.messages]);
    // Dependency on `messages` to trigger scrolling on updates

    // console.log({ selectedSectionData });

    // const [promptsArr, setPromptsArr] = useState([samplePrompt]);

    // const startWorkFlowTwo = async () => {
    //   const response = await axios.post("http://127.0.0.1:8000/process-input", {
    //     message: "hey sagan could you please modify my section 3",
    //     section_number: 3,
    //   });

    //   if (response?.data?.succes) {
    //     setSectionMode(true);
    //     setAiMsg(response?.data?.ai_message);
    //     setPdfData(response?.data?.pdf_file);
    //     setMdData(response?.data?.md_file);
    //     setLatexData(response?.data?.tex_file);

    //     localStorage.setItem("latex", response?.data?.tex_file);
    //     localStorage.setItem("md", response?.data?.md_file);
    //     localStorage.setItem("pdf", response?.data?.pdf_file);
    //     localStorage.setItem("aimsg", response?.data?.ai_message);
    //   }
    // };

    // function fakeApiCall() {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const fakeData = {
    //         message: "This is a fake response.",
    //       };

    //       resolve(fakeData);
    //     }, 0);
    //   });
    // }

    // console.log(step, "step");
    // console.log(storePrompt, "storeprompt");
    // const fakeLlmChat = () => {
    //   const selectedIdx = state?.allChatData?.findIndex(
    //     (i) => i.section_heading === state.selectedSectionHeading
    //   );

    //   if (step === 1) {
    //     setStorePrompt(text);

    //     if (selectedIdx > -1) {
    //       // const formattedData = [
    //       //   ...state.allChatData.slice(0, selectedIdx),
    //       //   {
    //       //     ...state?.allChatData[selectedIdx],
    //       //     llmChat: [
    //       //       ...state.allChatData[selectedIdx].llmChat,
    //       //       {
    //       //         received: "Would you like to modify or add queries?(yes/no) ",
    //       //       },
    //       //     ],
    //       //   },
    //       //   ...state.allChatData.slice(selectedIdx + 1),
    //       // ];

    //       dispatch({
    //         type: "SET_ALL_CHAT_DATA",
    //         payload: {
    //           type: "llm",
    //           data: {
    //             received: "Would you like to modify or add queries?(yes/no) ",
    //           },
    //         },
    //       });
    //       setStep(2);
    //     }
    //   }

    //   if (step === 2) {
    //     if (selectedIdx > -1) {
    //       let tempObj;
    //       if (text === "no") {
    //         tempObj = [
    //           { sent: text },
    //           { received: "Would you like to save the text changes ?(yes/no)" },
    //         ];
    //         dispatch({
    //           type: "SET_ALL_CHAT_DATA",
    //           payload: {
    //             type: "llm",
    //             data: {
    //               sent: text,
    //             },
    //           },
    //         });

    //         dispatch({
    //           type: "SET_ALL_CHAT_DATA",
    //           payload: {
    //             type: "llm",
    //             data: {
    //               received: "Would you like to save the text changes ?(yes/no)",
    //             },
    //           },
    //         });
    //       } else if (text === "yes") {
    //         tempObj = [{ sent: text }, { received: "Enter your query: " }];
    //       }
    //       const formattedData = [
    //         ...state.allChatData.slice(0, selectedIdx),
    //         {
    //           ...state?.allChatData[selectedIdx],
    //           llmChat: [...state.allChatData[selectedIdx].llmChat, ...tempObj],
    //         },
    //         ...state.allChatData.slice(selectedIdx + 1),
    //       ];
    //       dispatch({ type: "SET_ALL_CHAT_DATA", payload: formattedData });
    //     }
    //     if (text === "no") {
    //       // sendPromptHandler();
    //       setStep(4);
    //     } else if (text === "yes") {
    //       setStep(3);
    //     }

    //     return;
    //   }

    //   if (step === 3) {
    //     const formattedData = [
    //       ...state.allChatData.slice(0, selectedIdx),
    //       {
    //         ...state?.allChatData[selectedIdx],
    //         llmChat: [
    //           ...state.allChatData[selectedIdx].llmChat,
    //           { sent: text },
    //           { received: "Would you like to modify or add queries?(yes/no) " },
    //         ],
    //       },
    //       ...state.allChatData.slice(selectedIdx + 1),
    //     ];
    //     dispatch({ type: "SET_ALL_CHAT_DATA", payload: formattedData });
    //     setStep(2);
    //     return;
    //   }

    //   if (step === 4) {
    //     if (selectedIdx > -1) {
    //       const formattedData = [
    //         ...state.allChatData.slice(0, selectedIdx),
    //         {
    //           ...state?.allChatData[selectedIdx],
    //           llmChat: [
    //             ...state.allChatData[selectedIdx].llmChat,
    //             { sent: text },
    //           ],
    //         },
    //         ...state.allChatData.slice(selectedIdx + 1),
    //       ];
    //       dispatch({ type: "SET_ALL_CHAT_DATA", payload: formattedData });
    //     }

    //     sendPromptHandler();

    //     return;
    //   }

    //   setText("");
    // };
    let keyName;
    if (
      selectedSectionData?.messages?.length > 0 &&
      selectedSectionData?.messages[selectedSectionData?.messages.length - 1]
    ) {
      keyName = Object.keys(
        selectedSectionData?.messages[selectedSectionData?.messages?.length - 1]
      )[0];
    } else {
      keyName = "";
    }

    useEffect(() => {
      scrollToBottom();
    }, [keyName]);
    useEffect(() => {
      setText("");
    }, [state.counter]);

    const sendPromptHandler = async () => {
      if (state?.isApiRunning) {
        const lastMsgOfSelectedSection =
          selectedSectionData?.messages[
            selectedSectionData?.messages.length - 1
          ] || {};
        console.log({ lastMsgOfSelectedSection, selectedSectionData });
        if (lastMsgOfSelectedSection?.hasOwnProperty("received")) {
          webSocketObj.send({
            key: lastMsgOfSelectedSection?.received?.type,
            value: text,
          });
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
        }
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

        // const res = await fakeApiCall();

        const response = await axios.post(
          "http://127.0.0.1:8002/process-input",
          {
            message: text,
            section_number: selectedSectionData?.id,
            // message: "hey sagan could you please modify my section 3",
            // section_number: 3,
          }
        );
        // const response = { data: secoundResponse };
        // const response2 = secoundResponse;
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
        if (response?.data) {
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
          // setSectionMode(true);
          // setAiMsg(response?.data?.ai_message);
          // setPdfData(response?.data?.pdf_file);
          // setMdData(response?.data?.md_file);
          // setLatexData(response?.data?.tex_file);

          // localStorage.setItem("latex", response?.data?.tex_file);
          // localStorage.setItem("md", response?.data?.md_file);
          // localStorage.setItem("pdf", response?.data?.pdf_file);
          // localStorage.setItem("aimsg", response?.data?.ai_message);
        }
        // console.log(response2);
        const selectedIdx = state?.allChatData?.findIndex(
          (i) => i.section_heading === state.selectedSectionHeading
        );
        if (selectedIdx > -1) {
          const formattedData = [
            ...state?.allChatData?.slice(0, selectedIdx),
            {
              ...state?.allChatData[selectedIdx],
              messages: [
                ...state.allChatData[selectedIdx].messages,
                { aiMessage: response2?.ai_message, userPrompt: storePrompt },
                // { aiMessage: response2?.ai_message, userPrompt: text },
              ],
            },
            ...state.allChatData?.slice(selectedIdx + 1),
          ];
          // dispatch({ type: "SET_ALL_CHAT_DATA", payload: formattedData });
          // setAllChatData(formattedData);
        }
        setStep(1);
        setLoader(false);
        // setText("");

        // dispatch({ type: "SET_USER_QUERY", payload: "" });
        setStorePrompt("");
        setTimeout(() => {
          scrollToBottom();
        }, 1000);
      }
    };

    // console.log({
    //   allChatData,
    //   selectedSectionHeading,
    //   setSelectedSectionHeading,
    //   setAllChatData,
    // });

    // console.log(state.files, "files");

    const testClickHandler = () => {
      webSocketObj.send({ data: "this is test data" });
      const selectedIdx = state?.allChatData?.findIndex(
        (i) => i.section_heading === state.selectedSectionHeading
      );

      if (selectedIdx > -1) {
        const formattedData = [
          ...state.allChatData.slice(0, selectedIdx),
          {
            ...state?.allChatData[selectedIdx],
            llmChat: [
              ...state.allChatData[selectedIdx].llmChat,
              { sent: "this is test data" },
            ],
          },
          ...state.allChatData.slice(selectedIdx + 1),
        ];

        dispatch({
          type: "SET_ALL_CHAT_DATA",
          payload: formattedData,
        });
      }
      // dispatch({ type: "SET_LLMCHAT", payload: { sent: "this is test data" } });
    };

    console.log(state, "whole context state");

    return (
      <div
        // className="bg-slate-50 min-h-screen"
        className="h-full flex flex-col  pt-4   relative  "
      >
        <div className="flex-shrink-0 px-1 mb-4 relative z-10">
          <div className="relative inline-block">
            <select
              className="appearance-none bg-[#2a2a2a]/50 backdrop-blur-sm text-gray-300 px-4 py-2 pr-10 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-[#2a2a2a]/70 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50"
              value={state.selectedSectionHeading}
              onChange={(e) => {
                // setSelectedSectionHeading(e.target?.value);
                dispatch({
                  type: "SET_SELECTED_SECTION_HEADING",
                  payload: e.target?.value,
                });
              }}
            >
              {state.allChatData?.map((obj: any) => (
                <option key={obj?.id} value={obj?.section_heading}>
                  {obj?.section_heading}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
          </div>
        </div>
        {/* <div className="h-full h-screen flex flex-col  pt-4   relative "> */}
        {/* Select dropdown - Fixed at top */}
        {/* <div className="flex-shrink-0 px-1 mb-4 relative z-10   ">
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
        </div> */}
        {/* Chat header - Fixed at top */}
        {/* Chat messages - Scrollable */}
        {/* <div
          className="absolute inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
          id="chat-container"
        >
          {promptsArr?.map((obj: any, idx: number) => (
            <div key={idx} className="mb-6 scrollbar-hide pt-10 chat-box">
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <div className="text-gray-300">{obj?.text}</div>
                  </div>
                </div>

                <div className="bg-[#2a2a2a] p-4  rounded-xl">
                  <div className="mb-4">{obj?.assistantMessage}</div>

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
        </div> */}

        <div
          // className="flex flex-col gap-4 grow overflow-y-auto"
          className="absolute inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
          id="chat-container"
        >
          {/* {selectedSectionData?.llmChat?.map((item, index) => (
            <div>
              {item.received ? (
                <div className="flex flex-col  items-baseline">
                  <p className="bg-[#2a2a2a]  p-2 rounded-xl">
                    {item.received}
                  </p>
                  <img src={Sagan} className="w-8 h-8 mt-2 object-contain" />
                </div>
              ) : (
                <div className=" flex items-end flex-col ">
                  <p className="bg-[#2a2a2a]  p-2 rounded-xl">{item.sent}</p>
                  <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center mt-2">
                    <CircleUser size={20} />
                  </div>
                </div>
              )}
            </div>
          ))} */}
          {selectedSectionData?.messages?.map((obj: any, idx: number) => {
            if (obj.hasOwnProperty("sent") || obj.hasOwnProperty("received")) {
              return (
                <div>
                  {obj?.received?.data ? (
                    <div className="flex flex-col  items-baseline">
                      <p className="bg-[#2a2a2a]  p-2 rounded-xl">
                        {obj?.received?.data}
                      </p>
                      <img
                        src={Sagan}
                        className="w-8 h-8 mt-2 object-contain"
                      />
                    </div>
                  ) : (
                    <div className=" flex items-end flex-col ">
                      <p className="bg-[#2a2a2a]  p-2 rounded-xl">
                        {obj?.sent?.data}
                      </p>
                      <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center mt-2">
                        <CircleUser size={20} />
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={idx}
                  //   className="flex-1 overflow-y-auto"
                  className="mb-6 scrollbar-hide pt-10 chat-box"
                >
                  <div className="space-y-6">
                    {/* User message */}
                    <div className="flex flex-col  items-end gap-3">
                      <div>
                        <div className="bg-[#2a2a2a]  p-2 rounded-xl">
                          {obj?.userPrompt}
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
                        <CircleUser size={20} />
                      </div>
                    </div>

                    {/* Assistant message */}
                    <div>
                      <div className="bg-[#2a2a2a] p-4  rounded-xl ">
                        <div className="mb-4">{obj?.ai_message}</div>

                        {/* Document preview */}
                        <div
                          className="bg-[#1a1a1a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
                          onClick={toggleDocument}
                        >
                          <div className="text-gray-400">
                            <FileStack size={20} />
                          </div>
                          <div>
                            {/* <div className="font-medium">
                              {obj?.modified_section_text}
                            </div> */}
                            <div className="text-sm text-gray-400">
                              Click to open response document
                            </div>
                          </div>
                        </div>

                        {/* <div className="text-gray-300">
                    <div>
                      <h2>Response:</h2>
                      <pre></pre>
                    </div>
                  </div> */}

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
                      <img
                        src={Sagan}
                        className="w-8 h-8 mt-2 object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            }
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* keeping this div intentionally for now in order to apply some css to
        chat-container */}
        {/* Input area - Fixed at bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0 ">
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
        </div> */}

        <div className="absolute bottom-0 left-0 right-0 ">
          {/* <Star size={20} className={`${loader ? "pulse-logo" : ""}`} /> */}
          <div className="pt-4">
            <div className="bg-[#2a2a2a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <textarea
                  className="flex-1 bg-transparent resize-none outline-none"
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
        {/* </div> */}
      </div>
    );
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
  // const scrollToSection = (sectionHeading) => {
  //   // console.log("here", sectionHeading);
  //   const ref = sectionRefs.current[sectionHeading];
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

  // const components = {
  //   h1: ({ children, ...props }) => {
  //     // Find the corresponding section in allChatData
  //     const section = allChatData?.find((s) => s.section_heading === children);
  //     console.log(section, "section");
  //     if (section) {
  //       return (
  //         <h1
  //           ref={sectionRefs.current[section.section_heading]}
  //           className="text-2xl font-bold mb-6 pb-2 border-b"
  //           {...props}
  //         >
  //           {children}
  //         </h1>
  //       );
  //     }
  //     return (
  //       <h1 className="text-2xl font-bold mb-6 pb-2 border-b" {...props}>
  //         {children}
  //       </h1>
  //     );
  //   },
  // };
  useEffect(() => {
    if (state.allChatData) {
      const newRefs = {};
      state.allChatData.forEach((section) => {
        newRefs[section.section_heading] = React.createRef();
      });
      sectionRefs.current = newRefs;

      // Debug: Log the sections we're tracking
      // setDebug((prev) => ({
      //   ...prev,
      //   sections: allChatData.map((s) => s.section_heading),
      // }));
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

  // console.log(userPrompt, "userpromt");
  // console.log(chatMode, "chatMode");
  // console.log(state.userPrompt, state.isPrompt, state.activeMode);

  function scrollToSection(sectionHeading) {
    const section = document.getElementById(sectionHeading);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function renderLatexWithIds(latexData) {
    // Add IDs to LaTeX sections
    // return latexData.replace(
    //   /\\section\{(.*?)\}/g,
    //   (match, sectionTitle) =>
    //     `<div id="${sectionTitle}"><h2>${sectionTitle}</h2></div>`
    // );

    return latexData?.replace(
      /\\section\{(.*?)\}/g,
      (match, sectionTitle) => `<div id="${sectionTitle}">${match}</div>` // Wrap LaTeX section with a div
    );
  }

  function addTagsAboveMatches(markdown, stringsToMatch) {
    // Split the markdown content by newline
    const lines = markdown.split("\n");
    const processedLines = lines.map((line) => {
      // Check if the line contains any of the strings to match
      for (const str of stringsToMatch) {
        if (line.includes(str)) {
          // Generate an ID based on the matched string
          return `<a className="opacity-0" id='${str.replace(
            /\s+/g,
            "-"
          )}'></a>\n${line}`;
        }
      }
      return line; // Return the line unchanged if no match is found
    }); // Join the processed lines back into a single string
    return processedLines.join("\n");
  }

  // const processedMarkdown = addTagsAboveMatches(state.mdData, sectionHeading);

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
        <div className="w-64  flex flex-col  h-full  ">
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
                          // value={obj?.section_heading}
                          onClick={() => {
                            scrollToSection(obj.section_heading);
                            scrollToMdSection(obj.section_heading);
                          }}
                          // onClick={() => }
                          className="pl-2 cursor-pointer"
                        >
                          <span className="px-1"> {obj.id}</span>
                          <span>{obj?.section_heading}</span>
                        </p>
                      );
                    })}
                    {/* <div className="text-sm text-gray-300 hover:text-white cursor-pointer">
                      - Section 1
                    </div>
                    <div className="text-sm text-gray-300 hover:text-white cursor-pointer">
                      - Section 2
                    </div>
                    <div className="text-sm text-gray-300 hover:text-white cursor-pointer">
                      - Section 3
                    </div> */}
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
          {/* {!isPrompt ? ( */}
          {!state.activeMode && (
            <div
              className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

              //   className="flex justify-center  items-start border border-red-600 h-full"
            >
              {" "}
              <button
                className="flex flex-col space-y-4 justify-center items-center"
                style={{
                  opacity: state.isPrompt ? "1" : "0.5",
                }}
                onClick={() => {
                  // console.log("disabled");
                  startSagan();
                  dispatch({ type: "SET_ACTIVE_MODE", payload: true });
                  // setActiveMode(true);
                }}
                disabled={!state.isPrompt}
              >
                <img src={Sagan} className="w-12 h-12 object-cover " />
                {state.isPrompt && <p>click here</p>}
              </button>
            </div>
          )}

          {/* ) : ( */}
          {!state.chatMode && state.activeMode && (
            <div
              className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

              //   className="flex justify-center  items-start border border-red-600 h-full"
            >
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
          {/* )} */}
          {/* Center container with fixed width */}
          {state.chatMode && (
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
              {activeFormat === "markdown" ? (
                <div className="p-8">
                  <div className="mx-auto space-y-8">
                    <pre
                      className="font-mono text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: processedMarkdown }}
                    />
                    {/* <Markdown>{processedMarkdown}</Markdown> */}
                    {/* <Markdown>{state.mdData}</Markdown> */}

                    {/* <Markdown>
                      {` # Table of Contents 
                      1. [Introduction](#introduction) 
                      2.  [Installation](#installation) 
                      3. [Usage](#usage)
                     ## Introduction
                    This is the introduction section.

                    ## Installation
                    This section covers how to install the package.

                    ## Usage
                    This section explains how to use the package.`}
                    </Markdown> */}

                    {/* <Markdown
                      options={{
                        overrides: components,
                        wrapper: React.Fragment,
                      }}
                    >
                      {mdData}
                    </Markdown> */}

                    {/* <Markdown
                      options={{
                        overrides: {
                          div: {
                            component: ({ id, ref, ...props }) => {
                              if (id?.startsWith("section-")) {
                                return <div id={id} ref={ref} {...props} />;
                              }
                              return <div {...props} />;
                            },
                          },
                        },
                      }}
                    >
                      {processedMdData}
                    </Markdown> */}
                  </div>
                </div>
              ) : activeFormat === "latex" ? (
                <div className="p-8">
                  {/* <pre className="font-mono text-sm whitespace-pre-wrap">
                    {state.latexData}
                  </pre> */}
                  <pre
                    className="font-mono text-sm whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: renderLatexWithIds(state.latexData),
                    }}
                  />

                  {/* {allChatData?.map((obj) => (
                    <div
                      key={obj.id}
                      ref={sectionRefs.current[obj.section_heading]}
                      className="mb-12"
                    >
                      <h2
                        className="text-2xl font-bold mb-6 pb-2 "
                        id={obj.section_heading}
                      >
                        {obj.section_heading}
                      </h2>
                      <div className="font-mono text-sm whitespace-pre-wrap text-white leading-relaxed">
                        {sectionContents[obj.section_heading] ||
                          "Section content not found"}
                      </div>
                    </div>
                  ))} */}
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
