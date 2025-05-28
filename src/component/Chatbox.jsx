import React, { useEffect, useRef, useState } from "react";
//import OpenAI from "openai";
import Groq from "groq-sdk";
//import Header from "./component/Header/Header";
import { REACT_APP_GROQ_API_KEY } from "./config";
import { BsSendFill } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";
import Header from "./Header/Header";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  //const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

  const groq = new Groq({
    apiKey: REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const onSubmitAction = () => {
    if (!input) return;
    setMessages([...messages, { role: "user", content: input }]);
  };

  const callGroqAPI = async () => {
    try {
      const response = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
        max_tokens: 500,
        temperature: 0,
      });
      const assistantMessage = response.choices[0].message;
      console.log(assistantMessage);
      setMessages([...messages, assistantMessage]);
    } catch (error) {
      console.error(error);
      setIsThinking(true);
    }
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    console.log(messagesEndRef);
  };
  //console.log(callGroqAPI);
  useEffect(() => {
    input && callGroqAPI();
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <Header />
      <div className="relative max-w mx-auto min-h-[calc(100vh-50px)]  bg-black bg-opacity-10 ">
        <div className="flex-1 overflow-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xl ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
              <div ref={messagesEndRef} />
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start mb-4">
              <div className="flex space-x-1">
                <span className="block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="block w-2 h-2 bg-white rounded-full animate-pulse delay-200"></span>
                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
              </div>
            </div>
          )}
        </div>
      </div>
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
                input && onSubmitAction();
              }
            }}
          />
          <button
            onClick={onSubmitAction}
            className="bg-blue-600 text-white w-full max-w-[80px] uppercase px-4 py-2 rounded-lg"
          >
            <BsSendFill className="flex justify-center text-2xl mx-auto" />
          </button>
          <AiFillAudio className="text-7xl border-none  text-white  ml-6 max-w-[60px] uppercase px-4 py-2" />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
