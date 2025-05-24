import { useState } from "react";
//import OpenAI from "openai";
//import Groq from "groq-sdk";
import Header from "./component/Header/Header";
import { BsSendFill } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";
//import { fetch } from "groq-sdk/_shims/index.mjs";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const GROQ_API_KEY =
    "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";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      max_tokens: 100,

      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers,
      body,
    });
    console.log(response);
    const data = await response.json();
    setResponse(data.choices[0].text);

    console.log(data);

    if (!input) return;
    setIsThinking(true);
    setResponse([...response, { role: "user", content: input }]);
  };

  return (
    <div>
      <Header />
      <div className="relative max-w-3xl mx-auto min-h-[calc(100vh_-_150px)] pb-[170px] bg-w bg-white opacity-10">
        <p>Response:{response}</p>
      </div>
      {isThinking && (
        <div className="p-3 max-w-full text-white my-2 ml-auto"></div>
      )}

      <div className="fixed bottom-0 bg-gray-900 flex items-center h-[150px] p-2 w-full md:p-8">
        <div className="mx-auto flex justify-between max-w-3xl">
          <textarea
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 rounded-lg mr-2 w-[70vw] md:text-xl bg-amber-50 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey === false) {
                e.preventDefault();
                input && handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white w-full max-w-[80px] uppercase px-4 py-2 rounded-lg"
          >
            <BsSendFill className="flex justify-center text-2xl mx-auto" />
          </button>
          <AiFillAudio className="text-7xl border-none  text-white  ml-6 max-w-[60px] uppercase px-4 py-2" />
        </div>
      </div>
    </div>
  );
};

export default App;
