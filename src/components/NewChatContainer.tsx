import { useSagan } from "../context/context";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Copy,
  MessageCircle,
  ClipboardCopy,
  ChevronDown,
  FileStack,
  Send,
} from "lucide-react";
import Sagan from "../assets/sagan-svg.svg";
const ChatContainer = ({
  webSocketObj,
  getState,
  toggleDocument,
  text,
  setText,
  scrollToBottom,
  selectedSectionData,
  setLoader,
  messagesEndRef,
  sendPromptHandler,
}: any) => {
  const { state, dispatch } = useSagan();

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

  const lastMsgOfSelectedSection =
    selectedSectionData?.messages[selectedSectionData?.messages.length - 1] ||
    {};

  const publishHandler = async () => {
    const response = await axios.post("http://127.0.0.1:8002/publish", {
      modified_text: lastMsgOfSelectedSection?.modified_section_text,
      section_number: selectedSectionData?.id,
    });

    console.log(response, "response from publish api");

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
    }
  };

  const cleanLatex = (latexContent: string): string => {
    // Remove LaTeX commands
    if (latexContent) {
      let plainText = latexContent.replace(
        /\\subsection\{([^}]+)\}/g,
        "$1\n\n"
      ); // Replace subsections with their titles
      plainText = plainText.replace(/\\[a-zA-Z]+\{.*?\}/g, ""); // Remove other LaTeX commands
      plainText = plainText.replace(/\\[a-zA-Z]+/g, ""); // Remove standalone commands
      plainText = plainText.replace(/\s{2,}/g, " "); // Normalize whitespace
      return plainText.trim();
    }
  };
  // const plainText = cleanLatex(latexContent);

  const PlanText = ({ data }) => {
    // console.log(data, "data");
    const plainText = cleanLatex(data);
    return <div className="mb-4 text-sm font-montserrat">{plainText}</div>;
  };

  return (
    <div className="h-full flex flex-col  pt-4   relative  ">
      <div className="flex-shrink-0 px-1 mb-4 relative z-10">
        <div className="relative inline-block">
          <select
            className="appearance-none text-sm  font-montserrat bg-[#2a2a2a]/50 backdrop-blur-sm text-blue-400 px-2 py-1 pr-10 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-[#2a2a2a]/70 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50"
            value={state.selectedSectionHeading}
            onChange={(e) => {
              dispatch({
                type: "SET_SELECTED_SECTION_HEADING",
                payload: e.target?.value,
              });
            }}
          >
            {state.allChatData?.map((obj: any) => (
              <option
                key={obj?.id}
                value={obj?.section_heading}
                className="text-sm  font-montserrat"
              >
                {obj?.section_heading}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>
      </div>

      <div
        className="inset-0 bottom-[88px] overflow-y-auto   mb-6  scrollbar-hide pt-20 "
        // className="absolute inset-0 bottom-[88px]   mb-6  pt-20 "
        id="chat-container"
      >
        {selectedSectionData?.messages?.map((obj: any, idx: number) => {
          const lastMsgOfSelectedSection =
            selectedSectionData?.messages[
              selectedSectionData?.messages.length - 1
            ] || {};

          if (obj.hasOwnProperty("sent") || obj.hasOwnProperty("received")) {
            return (
              <div>
                {obj?.received?.data ? (
                  <div className="flex flex-col  items-baseline mb-2 ">
                    <p className="bg-[#2a2a2a] text-sm font-montserrat p-2 rounded-xl">
                      {obj?.received?.data}
                    </p>
                    <img src={Sagan} className="w-8 h-8 mt-2 object-contain" />
                  </div>
                ) : (
                  <div className=" flex items-end flex-col mb-2 ">
                    <p className="bg-[#2a2a2a]  p-2 rounded-xl text-sm font-montserrat">
                      {obj?.sent?.data}
                    </p>
                  </div>
                )}

                {/* {["yes", "no"].includes(obj?.received?.data) ||
                  ["yes", "no"].includes(obj?.sent?.data)  ? <div className="flex">
                  <button>yes</button>
                  <button>no</button>
                </div> :()} */}
              </div>
            );
          } else {
            return (
              <div key={idx} className="mb-6 scrollbar-hide pt-10 chat-box">
                <div className="space-y-6">
                  {/* User message */}
                  {/* <div className="flex flex-col  items-end gap-3">
                    <div>
                      <div className="bg-[#2a2a2a]  p-2 rounded-xl">
                        {obj?.userPrompt}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-[#4495FF] rounded-full flex items-center justify-center">
                      <CircleUser size={20} />
                    </div>
                  </div> */}

                  {/* Assistant message */}
                  <div>
                    <div className="mb-4">{obj?.ai_message}</div>

                    <div className="bg-[#2a2a2a] p-4  rounded-xl ">
                      {/* <div className="mb-4">{obj?.modified_section_text}</div> */}
                      <PlanText data={obj?.modified_section_text} />

                      {/* Document preview */}
                      <div
                        className="bg-[#1a1a1a] rounded-lg p-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={toggleDocument}
                      >
                        <div className="text-gray-400">
                          <FileStack size={20} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400  font-montserrat">
                            Click to open response document
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-4 action-btns">
                        <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm font-montserrat">
                          <Copy size={16} />
                          Copy
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm font-montserrat">
                          <MessageCircle size={16} />
                          Retry
                        </button>
                        <button
                          className="flex items-center gap-2 px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm font-montserrat"
                          onClick={publishHandler}
                        >
                          <ClipboardCopy size={16} />
                          Publish
                        </button>
                      </div>
                    </div>
                    <img src={Sagan} className="w-6 h-6 mt-2 object-contain" />
                  </div>
                </div>
              </div>
            );
          }
        })}
        {["question1", "question2", "question4"].includes(
          lastMsgOfSelectedSection?.received?.type
        ) && (
          <div className="flex justify-center  space-x-4">
            <button
              onClick={() => sendPromptHandler("yes")}
              className="py-1 px-4 text-sm font-montserrat bg-[#2a2a2a]  rounded-md  hover:text-white hover:bg-blue-500 "
            >
              Yes
            </button>
            <button
              onClick={() => sendPromptHandler("no")}
              className="py-1 px-4 text-sm font-montserrat bg-[#2a2a2a]  rounded-md  hover:text-white hover:bg-blue-500"
            >
              No
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* <div className='absolute bottom-0 left-0 right-0 '>
				<div className='pt-4'>
					<div className='bg-[#2a2a2a] rounded-lg p-4'>
						<div className='flex items-center gap-2 mb-4'>
							<textarea
								className='flex-1 bg-transparent resize-none outline-none'
								placeholder='Reply to Sagan...'
								rows={2}
								value={text}
								onChange={(e) => {
									setText(e.target.value);
								}}
								onKeyDown={(e) => {
									if (["enter", "Enter", "submit", "go"].includes(e.key)) {
										e.preventDefault();
										sendPromptHandler();
									}
								}}
							/>
							<button onClick={sendPromptHandler} className='mb-2'>
								<Send size={26} />
							</button>
						</div>
					</div>
				</div>
			</div> */}
      {/* </div> */}
    </div>
  );
};

export default ChatContainer;
