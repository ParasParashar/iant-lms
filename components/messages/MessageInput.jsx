"use client";

import { BiSolidSend } from "react-icons/bi";
import { Button } from "../ui/button";
import { useState } from "react";
import { createMessage } from "@/actions/messages.actions";
import { useSocket } from "@/context/SocketProvider";

const MessageInput = ({ receiverId }) => {
  const [value, setValue] = useState("");
  const { socket } = useSocket();
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    const response = await createMessage({
      receiverId: receiverId,
      content: value,
    });
    socket?.emit("newMessages", response);
    setValue("");
  };

  return (
    <form
      onSubmit={handleCreateMessage}
      className="flex  p-0.5  items-center w-full   bg-slate-300/90 dark:bg-slate-700 rounded-lg"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full font-light p-2 text-sm lg:text-lg bg-transparent outline-none border-none  rounded-l-full"
        placeholder="Enter your message........"
      />
      <Button type="submit" variant="ghost" size="icon">
        <BiSolidSend size={25} className="text-sky-500" />
      </Button>
    </form>
  );
};

export default MessageInput;
