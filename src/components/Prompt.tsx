import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
interface PromptProps {
  setShowPromptModal: (value: boolean) => void;
}
// process-input
const Prompt = ({ setShowPromptModal }: PromptProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    const result = await axios.post("http://localhost:8000/interact", {
      message: prompt,
    });
    //  setResponse(result.data.response);

    console.log(result.data.response, "this is result");
  };
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden   relative">
      <button
        className="absolute right-0 "
        onClick={() => setShowPromptModal(false)}
      >
        <X />
      </button>
      <div className="p-6  ">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Prompt</h2>

        <div
          className={`border-2 border-dashed rounded-lg h-[100px] cursor-pointer `}
        >
          <textarea
            className="  w-full h-full  outline-none px-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>
      <div className="px-6 pb-6  ">
        <button
          onClick={handleSubmit}
          //   disabled={files.length === 0}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Prompt;
