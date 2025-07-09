import React from "react";

export default function ChatInput({ message, setMessage, sendMessage }) {
  return (
    <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-800">
      <input
        className="flex-1 p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tulis pesan di sini..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium"
      >
        Kirim
      </button>
    </div>
  );
}
