import React, { useState, useEffect } from "react";
import ContactMenu from "./ContactMenu";
import { api } from "../../services/api";

export default function ChatHeader({ selectedContact, refreshContacts, setIsEditing, setEditedName }) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(selectedContact?.name || "");

  useEffect(() => {
    setEditing(false);
    setName(selectedContact?.name || "");
  }, [selectedContact]);

  const handleSave = async () => {
    try {
      await api.put(`/api/contacts/${selectedContact.user_id}`, { name });
      setEditing(false);
      refreshContacts?.();
    } catch (err) {
      alert("Gagal menyimpan nama");
    }
  };

  const initial = selectedContact?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center gap-3 relative">
      <div className="w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center">
        {initial}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <input className="bg-gray-700 text-white text-sm px-2 py-1 rounded" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSave} className="text-green-400 text-sm font-bold hover:underline">✔</button>
            <button onClick={() => setEditing(false)} className="text-red-400 text-sm font-bold hover:underline">✘</button>
          </>
        ) : (
          <h2 className="text-lg font-semibold">{selectedContact?.name || "Pilih kontak"}</h2>
        )}
      </div>

      {!isEditing && selectedContact && (
        <div className="absolute right-4">
          <ContactMenu contact={selectedContact} refreshContacts={refreshContacts} onEdit={() => setEditing(true)} />
        </div>
      )}
    </div>
  );
}
