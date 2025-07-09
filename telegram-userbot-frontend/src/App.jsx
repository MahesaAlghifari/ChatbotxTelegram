import React from "react";
import { useState } from "react";
import ContactList from "./components/ContactList/ContactList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import useContacts from "./hooks/useContacts";
import useMessages from "./hooks/useMessages";
import useSocket from "./hooks/useSocket";
import { api } from "./services/api";
import { getSentimentLabel } from "./utils/sentimentLabel";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");

  const { contacts, refreshContacts, addContact } = useContacts();
  const { messages: chatMessages, setMessages: setChatMessages } = useMessages(selectedId);
  useSocket(setChatMessages);

  const sendMessage = async () => {
    if (!message || !selectedId) return;

    const sentiment = getSentimentLabel(message);

    try {
      await api.post("/api/messages/send", {
        userId: selectedId,
        message,
        username: "mahesa_bot",
      });

      setChatMessages((prev) => [
        ...prev,
        {
          from: "me",
          to: selectedId,
          text: message,
          sentiment,
          time: new Date().toISOString(),
        },
      ]);
      setMessage("");
    } catch (err) {
      alert("Gagal mengirim pesan: " + err.message);
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-900 text-white">
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        addContact={addContact}
        lastMessages={chatMessages}
      />
      <ChatWindow
        selectedId={selectedId}
        selectedContact={contacts.find((c) => c.user_id === selectedId)}
        chatMessages={chatMessages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        refreshContacts={refreshContacts}
      />
    </div>
  );
}
