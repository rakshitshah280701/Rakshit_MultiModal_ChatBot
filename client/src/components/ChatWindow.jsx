import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import InputBar from "./Inputbar";
import { sendToGPT } from "../api/chatApi";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to our chat bot!\nyou can upload image and ask questions!",
      image: null,
      ocr: [],
    },
  ]);
  const chatRef = useRef(null);

  const handleSend = async (text, image) => {
    if (!text && !image) return;

    const userMessage = {
      sender: "user",
      text,
      image: image ? URL.createObjectURL(image) : null,
      ocr: [],
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendToGPT(text, image);

      const botMessage = {
        sender: "bot",
        text: response.reply || "⚠️ No response received.",
        image: image ? URL.createObjectURL(image) : null,
        ocr: response.ocr || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("GPT error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Failed to fetch response",
          image: null,
          ocr: [],
        },
      ]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white text-base font-semibold">
        💬 Rakshit's <span className="font-bold">Multi-Modal ChatBot</span>
        <div className="text-xs font-normal opacity-80">We are online!</div>
      </div>
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#f9fafb]"
      >
        {messages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            sender={msg.sender}
            text={msg.text}
            image={msg.image}
            ocr={msg.ocr}
          />
        ))}
      </div>
      <InputBar onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
