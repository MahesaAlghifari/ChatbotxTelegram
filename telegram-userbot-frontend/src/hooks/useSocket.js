import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE);

export default function useSocket(setChatMessages) {
  useEffect(() => {
    socket.on("bubble", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("bubble");
  }, []);
}
