import React, { useState } from "react";
import { ChevronUp, Send } from "lucide-react";

import author from "../assets/authorinfo.svg";
import problem from "../assets/problem.png";
import agent from "../assets/agent.png";
import proposal from "../assets/proposal.png";
import pdf from "../assets/pdf.svg";
import share from "../assets/share.svg";
import review from "../assets/review.svg";
import submit from "../assets/submit.svg";
import history from "../assets/history.svg";
import logo from "../assets/logo.svg";
import { MagicCard } from "../components/ui/magic-card";
export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isDropupOpen, setIsDropupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: 1, title: "Section 1", messages: [] },
    { id: 2, title: "Section 2", messages: [] },
    { id: 3, title: "Section 3", messages: [] },
  ]);

  const activeChat = chatSessions.find((chat) => chat.id === activeChatId);

  const topItems = [
    {
      icon: author,
      text: "Author Info",
    },
    {
      icon: problem,
      text: "RFP",
    },
    {
      icon: proposal,
      text: "Proposal Template",
    },
    {
      icon: agent,
      text: "Agent",
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
  return (
    <div
      className="container mx-auto py-[20px] "
      //  className="container mx-auto px-[20px] mt-[20px]  "
    >
      <div
        className="relative flex h-screen  gap-[10px]"
        // className="relative flex h-[calc(100vh-40px)] gap-[10px]"
      >
        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full bg-slate-800 rounded-xl z-[999] transition-all duration-300 ease-in-out `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: isVisible ? (isHovered ? "16rem" : "0") : "0",
            overflow: "hidden",
          }}
        >
          <div className="p-4">
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
          </div>
        </div>

        {/* Invisible hover area */}
        <div
          className="absolute left-0 top-0 w-[100px] h-full z-20 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>

        {/* Chat area */}
        <div className="flex-1 p-4 bg-slate-900  border border-slate-700 rounded-xl ml-16 z-[2]">
          <div className="flex flex-col justify-between h-full">
            {/* Top buttons */}
            <div className="flex basis-[5%] justify-between items-center mb-4">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button className="flex flex-col items-center p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200">
                    <span className="text-slate-300">{item.text}</span>
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

            {/* Chat container */}
            <div className="container basis-[95%] h-full mx-auto p-4 flex flex-col justify-end">
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
                  <div className="min-h-[100px] max-h-[500px] overflow-y-auto p-4 space-y-2">
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
                className="flex flex-col items-center p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200"
              >
                <span className="text-xs text-slate-300">{item.text}</span>
              </button>
            ))}
          </div>
          <div className="basis-[95%] bg-slate-900 border border-slate-700 rounded-xl p-4 overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
}
