import React, { createContext, useContext, useReducer, Dispatch } from "react";

interface Message {
  aiMessage: string; // AI-generated message
  userPrompt: string; // User's input/prompt
}
// interface ChatData {
//   id: number;
//   section_heading: string;
//   messages: any[];
//   llmChat: any[]; // New llmChat array inside each allChatData item
// }

interface ChatData {
  id: number; // Unique identifier for the section
  section_heading: string; // Section heading title
  messages: Message[]; // Array of messages
}

interface AppState {
  activeMode: boolean | string;
  isPrompt: boolean | string;
  userPrompt: string;
  chatMode: boolean | string;
  latexData: string | null;
  mdData: string | null;
  pdfData: string | null;
  selectedSectionHeading: string;
  sectionHeadings: string[];
  files: string[];
  loading: boolean;
  counter: number;
  allChatData: ChatData[];
  userQuery: string;
  userQueryCopy: string;
  isApiRunning: boolean;
  fileStructure: FileStructureFolder[];
}

type FileStructureFolder = {
  folderName: string;
  files: string[]; // Array of file names
};

type AppAction =
  | { type: "SET_ACTIVE_MODE"; payload: boolean | string }
  | { type: "SET_IS_PROMPT"; payload: boolean | string }
  | { type: "SET_USER_PROMPT"; payload: string }
  | { type: "SET_CHAT_MODE"; payload: boolean | string }
  | { type: "SET_LATEX_DATA"; payload: string | null }
  | { type: "SET_MD_DATA"; payload: string | null }
  | { type: "SET_PDF_DATA"; payload: string | null }
  | { type: "SET_SELECTED_SECTION_HEADING"; payload: string }
  | { type: "SET_SECTION_HEADING"; payload: string[] }
  | { type: "ADD_FILES"; payload: string[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ALL_CHAT_DATA"; payload: ChatData[] }
  | { type: "SET_USER_QUERY"; payload: string }
  | { type: "SET_USER_QUERY_COPY"; payload: string }
  | { type: "SET_FILE_STRUCTURE"; payload: FileStructureFolder[] }
  | { type: "SET_IS_API_RUNNING"; payload: boolean }
  | { type: "INC_COUNTER"; payload: number }
  | {
      type: "ADD_FILE_NAMES_TO_FOLDER";
      payload: { folderName: string; fileNames: string[] };
    };

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}
// Define actions
const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "SET_ACTIVE_MODE":
      localStorage.setItem("activeMode", String(action.payload));
      return { ...state, activeMode: action.payload };
    case "SET_USER_PROMPT":
      localStorage.setItem("prompt", String(action.payload));
      return { ...state, userPrompt: action.payload };
    case "SET_IS_PROMPT":
      localStorage.setItem("isPrompt", String(action.payload));
      return { ...state, isPrompt: action.payload };
    case "SET_CHAT_MODE":
      localStorage.setItem("chatMode", String(action.payload));
      return { ...state, chatMode: action.payload };
    case "SET_LATEX_DATA":
      return { ...state, latexData: action.payload };
    case "SET_MD_DATA":
      return { ...state, mdData: action.payload };
    case "SET_PDF_DATA":
      return { ...state, pdfData: action.payload };
    case "SET_SELECTED_SECTION_HEADING":
      localStorage.setItem("selectedSectionHeading", String(action.payload));
      return { ...state, selectedSectionHeading: action.payload };
    case "SET_SECTION_HEADING":
      localStorage.setItem("sectionHeadings", action.payload);
      return { ...state, sectionHeadings: action.payload };
    case "ADD_FILES":
      localStorage.setItem(
        "files",
        JSON.stringify([...state.files, ...action.payload])
      );
      return { ...state, files: [...state.files, ...action.payload] };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ALL_CHAT_DATA":
      if (action.payload.type === "llm") {
        const selectedIdx = state?.allChatData?.findIndex(
          (i) => i.section_heading === state.selectedSectionHeading
        );

        if (selectedIdx > -1) {
          const formattedData = [
            ...state.allChatData.slice(0, selectedIdx),
            {
              ...state?.allChatData[selectedIdx],
              messages: [
                ...state.allChatData[selectedIdx].messages,
                action.payload.data,
              ],
            },
            ...state.allChatData.slice(selectedIdx + 1),
          ];
          console.log(formattedData, "formatted data");
          // localStorage.setItem("allChatData", JSON.stringify(formattedData));
          return {
            ...state,
            allChatData: formattedData,
          };
        }

        return state;
      } else {
        // localStorage.setItem("allChatData", JSON.stringify(action.payload));
        return { ...state, allChatData: action.payload };
      }
    case "SET_USER_QUERY":
      return { ...state, userQuery: action.payload };
    case "SET_USER_QUERY_COPY":
      return { ...state, userQueryCopy: action.payload };
    case "SET_IS_API_RUNNING":
      return { ...state, isApiRunning: action.payload };
    case "INC_COUNTER":
      return { ...state, counter: state.counter + 1 };

    case "SET_FILE_STRUCTURE":
      return { ...state, fileStructure: action.payload };

    case "ADD_FILE_NAMES_TO_FOLDER": {
      const { folderName, fileNames } = action.payload;
      const updatedStructure = [...state.fileStructure];

      // Find folder or create a new one
      const folderIndex = updatedStructure.findIndex(
        (folder) => folder.folderName === folderName
      );
      if (folderIndex !== -1) {
        // Folder exists, append file names
        updatedStructure[folderIndex].files = [
          ...updatedStructure[folderIndex].files,
          ...fileNames,
        ];
      } else {
        // Add new folder with file names
        updatedStructure.push({ folderName, files: fileNames });
      }

      localStorage.setItem("fileStructure", JSON.stringify(updatedStructure));

      return { ...state, fileStructure: updatedStructure };
    }

    default:
      return state;
  }
};

const AppContext = createContext<AppContextType>({});

export const useSagan = (): AppContextType => {
  const context = useContext(AppContext);

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    activeMode: localStorage.getItem("activeMode") || false,
    isPrompt: localStorage.getItem("isPrompt") || false,
    userPrompt: localStorage.getItem("prompt") || "",
    chatMode: localStorage.getItem("chatMode") || false,
    latexData: localStorage.getItem("latex") || null,
    mdData: localStorage.getItem("md") || null,
    pdfData: localStorage.getItem("pdf") || null,
    selectedSectionHeading:
      localStorage.getItem("selectedSectionHeading") || "",
    files: JSON.parse(localStorage.getItem("files")) || [],
    sectionHeadings: localStorage.getItem("sectionHeadings") || [],
    loading: false,
    // allChatData: JSON.parse(localStorage.getItem("allChatData")) || [],
    allChatData: [],
    userQuery: "",
    userQueryCopy: "",
    isApiRunning: false,
    counter: 0,
    fileStructure: JSON.parse(localStorage.getItem("fileStructure") || "[]"),
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
