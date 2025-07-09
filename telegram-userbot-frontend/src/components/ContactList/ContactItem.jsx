import React from "react";

export default function ContactItem({ contact, selected, onSelect, lastMessages }) {
  const lastMsg = [...lastMessages]
    .reverse()
    .find((m) => m.from === contact.user_id || m.to === contact.user_id);

  const initial = contact.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      onClick={onSelect}
      className={`p-2 rounded cursor-pointer hover:bg-blue-700 ${
        selected ? "bg-blue-600" : "bg-gray-700"
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center">
          {initial}
        </div>
        <div className="flex-1">
          <div className="font-medium">{contact.name}</div>
          <div className="text-xs text-gray-300 italic truncate">
            {lastMsg?.text || "(belum ada pesan)"}
          </div>
        </div>
      </div>
    </div>
  );
}
