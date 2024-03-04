"use client";

import { BiSolidSend } from "react-icons/bi";
import ChatCard from "./ChatCard";
import { Button } from "../ui/button";
import { useSocket } from "@/context/SocketProvider";
import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { useParams } from "next/navigation";

const PersonalMessageArea = ({
  userConversations,
  senderId,
  receiverId,
  handleCreateMessage,
}) => {
  const params = useParams();
  const formRef = useRef();
  const messagesRef = useRef();
  const { socket } = useSocket();
  useEffect(() => {
    setConversation(userConversations);
  }, [userConversations, socket]);
  const [conversation, setConversation] = useState(userConversations || []);
  const [isPending, startTransition] = useTransition();

  //   receiving latest messages
  const handleNewMessage = (message) => {
    startTransition(() => {
      setConversation((prev) => [...(prev || []), message]);
    });
  };
  useEffect(() => {
    socket?.on("receive-message", handleNewMessage);

    // cleanup event the istener
    return () => {
      socket?.off("receive-message", handleNewMessage);
    };
  }, [socket]);

  // working ont the optimistic
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
    conversation,
    (state, newMessage) => [...state, newMessage]
  );
  //   for sliding down the screen
  useEffect(() => {
    const chatArea = messagesRef.current;
    chatArea?.scrollTo(0, chatArea.scrollHeight);
  }, [optimisticMessages]);

  //   form actions
  async function formAction(formData) {
    if (formData.get("value").trim() !== "") {
      addOptimisticMessages({
        _id: new Date(),
        content: formData.get("value"),
        receiverId: receiverId,
        senderId: senderId,
        timestamp: new Date(),
      });
      formRef.current.reset();
      await handleCreateMessage(formData.get("value")).then((res) => {
        socket?.emit("newMessages", res);
      });
    }
  }

  return (
    <div className="flex flex-col   items-center w-full h-full">
      {/* chatarea */}
      <section
        ref={messagesRef}
        className="flex-1 flex-col items-start flex gap-2 pb-20 lg:pb-10 bg-secondary p-2 overflow-y-auto w-full border-secondary transition-all duration-300 ease-in-out main-scrollbar"
        style={{ maxHeight: "calc(100vh - 150px)" }}
      >
        {optimisticMessages?.map((item) => (
          <ChatCard key={item._id} conversation={item} />
        ))}
      </section>

      {/* chat input */}
      <form
        ref={formRef}
        action={formAction}
        className="flex sticky  bottom-0 right-0  p-0.5  items-center w-full   bg-slate-300  dark:bg-slate-700 rounded-b-lg"
      >
        <input
          autoFocus
          autoComplete="off"
          type="text"
          name="value"
          className="w-full font-light p-2 text-sm lg:text-lg bg-transparent outline-none border-none  rounded-l-full"
          placeholder="Enter your message........"
        />
        <Button type="submit" variant="ghost" size="icon">
          <BiSolidSend size={25} className="text-sky-500" />
        </Button>
      </form>
    </div>
  );
};

export default PersonalMessageArea;
