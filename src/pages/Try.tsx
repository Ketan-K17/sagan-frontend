import React, { useState, useCallback } from "react";
import {
  ChevronRight,
  Star,
  MessageSquarePlus,
  FolderOpen,
  Clock,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { ChevronDown, Send } from "lucide-react";
import author from "../assets/authorinfo.svg";

const Try = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: 1, title: "Section 1", messages: [] },
    { id: 2, title: "Section 2", messages: [] },
    { id: 3, title: "Section 3", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const activeChat = chatSessions.find((chat) => chat.id === activeChatId);

  // const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sidebarItems = [
    { icon: MessageSquarePlus, text: "New chat" },
    { icon: FolderOpen, text: "Projects" },
    { icon: Star, text: "Starred" },
    { icon: Clock, text: "Recents" },
  ];

  const recentChats = [
    "The Impact of AI on the Future Job Market",
    "SR - Maternal and newborn health",
    "Calculating joint probabilities with two...",
    "Pricing Tiers and Customer Distributi...",
    "Optimizing Blog Posts for Maximum I...",
    "Applying COSMOS to Analyze Space...",
    "Aerospace AI Company Profile",
  ];

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

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTimeout(() => setIsVisible(false), 300); // Match this with the transition duration
  }, []);
  return (
    <div className="relative flex   container mx-auto px-[20px]">
      {/* Sidebar */}
      <div
        className={`absolute left-0 top-0 h-full bg-white border-r border-gray-200   z-10 ${
          isVisible ? (isHovered ? "w-64" : "w-16") : "w-0"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            SAGAN
          </h1>
          <ChevronRight
            className={`h-6 w-6 transition-transform duration-300 ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        </div>
        <nav>
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span
                    className={`transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={`mt-8 px-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-xs uppercase text-gray-500 font-semibold mb-2">
            Recent Chats
          </h2>
          <ul>
            {recentChats.map((chat, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  {chat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Invisible hover area */}
      <div
        className="absolute left-0 top-0 w-1 h-full z-20 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>

      {/* Main content */}
      <div className={`flex-1   ml-16`}>
        <div className="flex-1 p-4 overflow-y-auto border border-black rounded-xl">
          <div className="flex flex-col justify-between h-full">
            {/* buttons */}
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <button
                  key={index}
                  className="w-8 h-8 bg-gray-200 rounded-full"
                ></button>
              ))}
            </div>

            {/* dropdowns */}
            <div>
              <div className="relative mb-4">
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center bg-white border rounded-lg hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {activeChat?.title || "Select a chat"}
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                    {chatSessions.map((chat) => (
                      <button
                        key={chat.id}
                        className="w-full p-4 text-left hover:bg-gray-50"
                        onClick={() => {
                          setActiveChatId(chat.id);
                          setIsDropdownOpen(false);
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
                  <div className="h-auto overflow-y-auto p-4 space-y-2">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-100 ml-auto"
                            : "bg-gray-200"
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
                      className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
        <div className="w-1/3 border border-black rounded-xl p-4 overflow-y-auto"></div>
      </div>
    </div>
  );
};

export default Try;

//drop down

{
  /* <div>
              <div className="relative mb-4">
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center bg-white border rounded-lg hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {activeChat?.title || "Select a chat"}
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                    {chatSessions.map((chat) => (
                      <button
                        key={chat.id}
                        className="w-full p-4 text-left hover:bg-gray-50"
                        onClick={() => {
                          setActiveChatId(chat.id);
                          setIsDropdownOpen(false);
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
                  <div className="h-auto overflow-y-auto p-4 space-y-2">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-100 ml-auto"
                            : "bg-gray-200"
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
                      className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            </div> */
}
