import { useState } from "react";

export default function ChatHistoryDropdown({ chatHistory }: { chatHistory: any[] }) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="mt-6">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setShowHistory(prev => !prev)}
      >
        <h3 className="font-semibold text-gray-700 mb-2">🗂️ History</h3>
        <span className="text-gray-500 text-sm">
          {showHistory ? "Hide ⌃" : "Show ⌄"}
        </span>
      </div>

      {showHistory && (
        <ul className="space-y-4 mt-2">
          {chatHistory.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow p-3 rounded-xl border border-gray-200"
            >
              <p className="text-sm text-gray-500">
                Q{index + 1}: {item.question}
              </p>
              <p className="text-sm text-gray-800 mt-1">A: {item.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
