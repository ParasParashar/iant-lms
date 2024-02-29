"use client";

import { BiSolidSend } from "react-icons/bi";
import { Button } from "../ui/button";
import { useState } from "react";
import { createGroupMessage, createMessage } from "@/actions/messages.actions";
import { useSocket } from "@/context/SocketProvider";

const MessageInput = ({ receiverId, group, groupId, senderId }) => {
  const [value, setValue] = useState("");
  const { socket } = useSocket();
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (group && groupId) {
      const groupResponse = await createGroupMessage({
        groupId: groupId,
        content: value,
      });
      socket?.emit("groupMessages", groupResponse);
    } else {
      const response = await createMessage({
        receiverId: receiverId,
        content: value,
      });
      socket?.emit("newMessages", response);
    }
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      onSubmit={handleCreateMessage}
      className="flex sticky  bottom-0 right-0  p-0.5  items-center w-full   bg-slate-300  dark:bg-slate-700 rounded-b-lg"
    >
      <input
        autoFocus
        value={value}
        onChange={handleChange}
        className="w-full font-light p-2 text-sm lg:text-lg bg-transparent outline-none border-none  rounded-l-full"
        placeholder="Enter your message........"
      />
      <Button
        onClick={handleCreateMessage}
        type="submit"
        variant="ghost"
        size="icon"
      >
        <BiSolidSend size={25} className="text-sky-500" />
      </Button>
    </form>
  );
};

export default MessageInput;
