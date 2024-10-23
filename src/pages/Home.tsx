import { useState, useCallback, useEffect } from "react";

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
import { MagicCard } from "../components/ui/magic-card";
const Home = () => {
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
    <div className="container mx-auto px-[20px] mt-[20px] ">
      {/* Main content */}
      <div className="relative flex h-[calc(100vh-40px)] gap-[10px]">
        {/* Sidebar */}

        {/* <div
          className={`absolute left-0 top-0 h-full bg-white rounded-xl     z-[999] ${
            isVisible ? (isHovered ? "w-64" : "w-0") : "w-0"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <MagicCard className="border-none  " gradientColor={"#D9D9D955"}>
            <div className="flex items-center justify-between p-4">
              <h1
                className={`text-xl font-bold transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                SAGAN
              </h1>
            </div>
            <nav
              // className="px-4"
              className={` px-4 transition-opacity  ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="text-md uppercase text-gray-500 font-semibold mb-2">
                Literature Files
              </h2>
              <ul>
                {files.map((item, index) => (
                  <button
                    key={index}
                    className="flex  items-center  mb-3  pl-4 "
                  >
                    <img src={item.icon} className="w-5, h-5" />
                    <span className="text-xs">{item.text}</span>
                  </button>
                ))}
              </ul>
            </nav>
            <div
              className={`mt-8 px-4 transition-opacity  ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="text-md uppercase text-gray-500 font-semibold mb-2">
                Section Outlined
              </h2>
              <ul>
                {recentChats.map((chat, index) => (
                  <li key={index} className="mb-2 pl-[20px]">
                    - {chat}
                  </li>
                ))}
              </ul>
            </div>
          </MagicCard>
        </div> */}
        {/* <div
          className={`absolute left-0 top-0 h-full bg-white rounded-xl     z-[999] ${
            isVisible ? (isHovered ? "w-64" : "w-0") : "w-0"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <div className="flex items-center justify-between p-4">
            <h1
              className={`text-xl font-bold transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              SAGAN
            </h1>
          </div>
          <nav
            // className="px-4"
            className={` px-4 transition-opacity  ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-md uppercase text-gray-500 font-semibold mb-2">
              Literature Files
            </h2>
            <ul>
              {files.map((item, index) => (
                <button key={index} className="flex  items-center  mb-3  pl-4 ">
                  <img src={item.icon} className="w-5, h-5" />
                  <span className="text-xs">{item.text}</span>
                </button>
              ))}
            </ul>
          </nav>
          <div
            className={`mt-8 px-4 transition-opacity  ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-md uppercase text-gray-500 font-semibold mb-2">
              Section Outlined
            </h2>
            <ul>
              {recentChats.map((chat, index) => (
                <li key={index} className="mb-2 pl-[20px]">
                  - {chat}
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        <div
          className={`absolute left-0 top-0 h-full bg-white rounded-xl z-[999] transition-all duration-300 ease-in-out`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: isVisible ? (isHovered ? "16rem" : "0") : "0",
            overflow: "hidden",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <MagicCard className="border-none" gradientColor={"#D9D9D955"}>
            <div className="flex items-center justify-between p-4">
              <h1
                className={`text-xl font-bold  ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                SAGAN
              </h1>
            </div>
            <nav className={`px-4  ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <h2 className="text-md uppercase text-gray-500 font-semibold mb-2">
                Literature Files
              </h2>
              <ul>
                {files.map((item, index) => (
                  <button key={index} className="flex items-center mb-3 pl-4">
                    <img src={item.icon} className="w-5 h-5" />
                    <span className="text-xs">{item.text}</span>
                  </button>
                ))}
              </ul>
            </nav>
            <div
              className={`mt-8 px-4  ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="text-md uppercase text-gray-500 font-semibold mb-2">
                Section Outlined
              </h2>
              <ul>
                {recentChats.map((chat, index) => (
                  <li key={index} className="mb-2 pl-[20px]">
                    - {chat}
                  </li>
                ))}
              </ul>
            </div>
          </MagicCard>
        </div>

        {/* Invisible hover area */}
        <div
          className="absolute left-0 top-0 w-[200px] h-full z-20 cursor-pointer   "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>

        {/* Chat area */}
        <div className="flex-1 p-4  border border-black rounded-xl ml-16  z-[2]">
          <div className="flex flex-col justify-between h-full">
            {/* buttons */}
            <div className="flex  basis-[5%] justify-between items-center mb-4   ">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <img src={item.icon} className="w-8 h-8" alt={item.text} />
                  </button>
                  {hoveredIndex === index && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
                      {item.text}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* dropdowns */}

            <div className="container basis-[95%] h-full mx-auto p-4  flex flex-col justify-end ">
              <div className="relative mb-4">
                <button
                  className="w-full p-2 text-left font-semibold flex justify-between items-center bg-white border rounded-lg hover:bg-gray-50"
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
                  <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {chatSessions.map((chat) => (
                      <button
                        key={chat.id}
                        className="w-full p-4 text-left hover:bg-gray-50"
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
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className=" min-h-[100px]  max-h-[500px] overflow-y-auto p-4 space-y-2  ">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-gray-50 ml-auto"
                            : "bg-gray-100"
                        } max-w-[80%]`}
                      >
                        {message.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center p-4 border-t">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message..."
                      className="flex-grow p-2 border rounded-l-lg focus:outline-none  "
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 border rounded-r-lg focus:outline-none"
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
          <div className="  basis-[5%] flex justify-between    px-4  border border-black  rounded-xl">
            {sideItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <img src={item.icon} className="w-5 h-5" alt={item.text} />
                <span className="text-xs">{item.text}</span>
              </button>
            ))}
          </div>
          <div className=" basis-[95%] border border-black rounded-xl p-4 overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
};
export default Home;
