"use client";

import { useEffect, useRef, useState } from "react";
import ChatCard from "./ChatCard";
import { useSocket } from "@/context/SocketProvider";

const ChatArea = ({ userConversations }) => {
  const { socket } = useSocket();
  const [conversation, setConversation] = useState(userConversations);
  const messageRef = useRef(null);
  // setting the conversations.
  useEffect(() => {
    setConversation(userConversations);
  }, [userConversations]);

  // handleing socket io message
  const handleNewMessage = (message) => {
    setConversation((prevConversation) => [...prevConversation, message]);
  };

  // listen for receive-message event
  useEffect(() => {
    socket?.on("receive-message", handleNewMessage);

    // cleanup event the istener
    return () => {
      socket?.off("receive-message", handleNewMessage);
    };
  }, [socket]);
  // using useRef to scroll to bottom to the message.
  useEffect(() => {
    const div = messageRef.current;
    div?.scrollTo(0, div.scrollHeight);
  }, [conversation])

  if(!conversation[0]){
    return(
      <div className="flex flex-col items-center justify-center text-2xl bg-gray-600 h-screen">
        haa ji chate start kro
      </div>
    )
  }
  return (
    <section
      ref={messageRef}
      className=" flex-1 flex-col items-start flex gap-2 pb-24  p-2  overflow-y-auto w-full  border-secondary  transition-all duration-300 ease-in-out  main-scrollbar"
    >
      {conversation?.map((item) => (
        <ChatCard key={item._id} conversation={item} />
      ))}
    </section>
  );
};

export default ChatArea;
