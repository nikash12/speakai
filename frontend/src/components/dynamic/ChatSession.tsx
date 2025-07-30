"use client";

import { useEffect, useState } from "react";
import DynamicRecorderUtil from "@/utils/DynamicRecordUtil";
import ChatHistoryDropdown from "@/utils/ChatHistoryDropdown";

type QA = { question: string; answer: string };

export default function ChatSession() {
  const [chatHistory, setChatHistory] = useState<QA[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [loading, setLoading] = useState(true);

  const title = localStorage.getItem("title") || "SDE Intern";
  const description = localStorage.getItem("description") || "Resume or JD here";

  // Fetch first question on load
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("http://localhost:2001/api/interview/dynamic/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: [],
            title,
            description,
            mode: "realtime",
          }),
        });

        const data = await res.json();
        if (data?.nextQuestion) {
          setCurrentQuestion(data.nextQuestion);
        } else {
          setCurrentQuestion("Tell me about yourself."); // fallback
        }
      } catch (err) {
        console.error("Error loading first question:", err);
        setCurrentQuestion("Tell me about yourself.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Called when voice response is captured
  const handleAnswer = async (answer: string) => {
    const newQA = { question: currentQuestion, answer };
    const updatedHistory = [...chatHistory, newQA];
    setChatHistory(updatedHistory);

    try {
      const res = await fetch("http://localhost:2001/api/interview/dynamic/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: updatedHistory,
          title,
          description,
          mode: "realtime",
        }),
      });

      const data = await res.json();
      if (data?.done) {
        setCurrentQuestion("✅ Interview finished. Thank you!");
      } else if (data?.nextQuestion) {
        setCurrentQuestion(data.nextQuestion);
      } else {
        setCurrentQuestion("⚠️ No further questions.");
      }
    } catch (err) {
      console.error("Error fetching next question:", err);
      setCurrentQuestion("❌ Failed to fetch next question.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Interviewer Response </h2>

      {loading ? (
        <p>⏳ Preparing your interview...</p>
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
            <p className="text-gray-800 font-medium">🧠 Current Question:</p>
            <p className="text-lg text-blue-600 mt-2">{currentQuestion}</p>
          </div>

          <DynamicRecorderUtil   onRespond={handleAnswer}/>

          <ChatHistoryDropdown chatHistory={chatHistory} />

        </>
      )}
    </div>
  );
}
