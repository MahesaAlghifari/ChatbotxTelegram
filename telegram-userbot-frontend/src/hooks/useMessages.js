import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function useMessages(selectedId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${selectedId}`);
        const formatted = res.data.map((msg) => ({
          from: msg.username === "mahesa_bot" ? "me" : msg.user_id,
          to: msg.username === "mahesa_bot" ? selectedId : "me",
          text: msg.message,
          sentiment: msg.sentiment,
          time: msg.created_at,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("❌ Gagal ambil pesan:", err.message);
      }
    };

    fetchMessages();
  }, [selectedId]);

  return { messages, setMessages };
}
