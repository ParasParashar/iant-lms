"use client";

import { cn, formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import UserAvatar from "./UserAvatar";

const ChatCard = ({ conversation }) => {
  const { senderId, receiverId, content, timestamp } = conversation;
  const params = useParams();
  // Check if the current user is the receiver
  const isReceiver = senderId._id === params.messageId;
  const senderName = isReceiver ? senderId?.name : "Me";
  return (
    <section
      className={cn(
        "flex gap-2 items-start p-2 rounded-lg min-w-[25%] shadow-lg max-w-[80%]",
        isReceiver
          ? "bg-sky-200 dark:bg-sky-950"
          : "bg-zinc-200/90 dark:bg-slate-900"
      )}
    >
      <UserAvatar name={senderName} />
      <div className="flex flex-col w-full justify-start">
        <p className="text-xs text-muted-foreground font-mono flex items-center justify-between w-full">
          {senderName}
          <span className="text-[10px]">{formatDate(timestamp)}</span>
        </p>
        <div className="text-sm font-light text-break break-words   text-ellipsis ">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ChatCard;
