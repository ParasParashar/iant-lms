"use client";

import { cn, formatDate } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";

const ChatCard = ({ conversation, group }) => {
  const { userId } = useAuth();
  const params = useParams();
  let isReceiver;
  let senderName;
  let bgColorClass;
  if (group) {
    isReceiver = conversation?.senderId?.authId === userId;
    senderName = isReceiver !== true ? conversation?.senderId?.name : "me";
    senderName = senderName || "me";
    bgColorClass =
      isReceiver || senderName === "me"
        ? "bg-blue-950/20 dark:bg-blue-700/20"
        : "bg-sky-500/30 dark:bg-sky-500/30";
  } else {
    isReceiver = conversation?.senderId?._id === params.messageId;
    senderName = isReceiver ? conversation?.senderId?.name : "Me";
    bgColorClass = isReceiver
      ? "bg-sky-500/30 dark:bg-sky-500/30"
      : "bg-blue-950/20 dark:bg-blue-700/20";
  }
  return (
    <section
      className={cn(
        "flex gap-2 items-start  p-2 rounded-md min-w-[30%] shadow-lg max-w-[80%] messagechatcard  cursor-default",
        bgColorClass
      )}
    >
      <UserAvatar name={senderName} />
      <div className="flex flex-col w-full justify-start">
        <p className="text-xs text-muted-foreground font-mono flex items-center justify-between w-full">
          {senderName}
          <span className="text-[10px]">
            {formatDate(conversation?.timestamp)}
          </span>
        </p>
        <div className="text-sm font-light  break-all  text-break break-words  ">
          {conversation?.content}
        </div>
      </div>
    </section>
  );
};

export default ChatCard;
