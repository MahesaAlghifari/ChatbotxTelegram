import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

export default function ChatWindow(props) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [props.chatMessages]);

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader {...props} />
      <ChatBody {...props} scrollRef={scrollRef} />
      <ChatInput {...props} />
    </div>
  );
}
