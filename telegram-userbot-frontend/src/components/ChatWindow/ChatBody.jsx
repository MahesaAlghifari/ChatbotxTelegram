import React from "react";

export default function ChatBody({ chatMessages, selectedId, selectedContact, scrollRef }) {
  const firstMessage = chatMessages.find((msg) => msg.from === selectedId || msg.to === selectedId);
  const dateHeading = firstMessage?.time
    ? new Date(firstMessage.time).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const initial = selectedContact?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-900">
      {dateHeading && (
        <div className="text-center text-sm text-gray-400 mb-4">
          {dateHeading}
        </div>
      )}
      {chatMessages
        .filter((msg) => msg.from === selectedId || msg.to === selectedId)
        .map((msg, i) => {
          const isSent = msg.from === "me";
          const bubbleClass = isSent ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-700 text-white rounded-bl-none";
          const sentimentColor = msg.sentiment === "Positif"
            ? "text-green-400"
            : msg.sentiment === "Negatif"
            ? "text-red-400"
            : "text-yellow-400";

          return (
            <div key={i} className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-2 max-w-xs">
                {!isSent && (
                  <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mt-1">
                    {initial}
                  </div>
                )}
                <div className="flex flex-col">
                  {!isSent && (
                    <span className="text-xs text-gray-400 mb-1 ml-1">
                      {selectedContact?.name || "Pengirim"}
                    </span>
                  )}
                  <div className={`relative px-4 py-2 rounded-xl shadow-md text-sm whitespace-pre-line ${bubbleClass}`}>
                    <p>{msg.text}</p>
                  </div>
                  {msg.sentiment && (
                    <span className={`mt-1 ml-1 text-xs font-medium ${sentimentColor}`}>
                      {msg.sentiment}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
