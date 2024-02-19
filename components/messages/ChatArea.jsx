"use client";

import { useEffect, useRef, useState } from "react";
import ChatCard from "./ChatCard";

const ChatArea = ({ userConversations }) => {
  const [conversation, setConversation] = useState(userConversations);
  const messageRef = useRef(null);
  // setting the conversations.
  useEffect(() => {
    setConversation(userConversations);
  }, [userConversations]);

  // using useRef to scroll to bottom to the message.
  useEffect(() => {
    const div = messageRef.current;
    div?.scrollTo(0, div.scrollHeight);
  }, [conversation]);
  return (
    <section
      ref={messageRef}
      className="h-[80%] overflow-y-auto w-full flex items-start justify-start flex-col gap-2   pb-16  transition-all duration-300 ease-in-out  main-scrollbar "
    >
      {conversation?.map((item) => (
        <ChatCard key={item._id} conversation={item} />
      ))}
    </section>
  );
};

export default ChatArea;
