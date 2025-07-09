import React, { useState } from "react";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";

export default function ContactList({
  contacts,
  selectedId,
  setSelectedId,
  addContact,
  lastMessages = [],
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-4">📬 Kontak</h2>

      <div className="mb-4">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 text-sm rounded text-white"
          >
            + Tambahkan Kontak
          </button>
        ) : (
          <ContactForm
            onAdd={addContact}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>

      <div className="space-y-2">
        {contacts.map((c, i) => (
          <ContactItem
            key={i}
            contact={c}
            selected={c.user_id === selectedId}
            onSelect={() => setSelectedId(c.user_id)}
            lastMessages={lastMessages}
          />
        ))}
      </div>
    </div>
  );
}
