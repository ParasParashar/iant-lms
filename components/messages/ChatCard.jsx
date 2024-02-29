"use client";

import { cn, formatDate } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";

const ChatCard = ({ conversation, group }) => {
  const { senderId, receiverId, content, timestamp } = conversation;
  const { userId } = useAuth();
  const params = useParams();
  let isReceiver;
  let senderName;
  if (group) {
    isReceiver = senderId.authId === userId;
    senderName = senderId?.name;
  } else {
    isReceiver = senderId._id === params.messageId;
    senderName = isReceiver ? senderId?.name : "Me";
  }
  return (
    <section
      className={cn(
        "flex gap-2 items-start  p-2 rounded-md min-w-[30%] shadow-lg max-w-[80%] messagechatcard  cursor-default",
        isReceiver
          ? "bg-sky-500/30 dark:bg-sky-500/30"
          : "bg-blue-950/20 dark:bg-blue-700/20"
      )}
    >
      <UserAvatar name={senderName} />
      <div className="flex flex-col w-full justify-start">
        <p className="text-xs text-muted-foreground font-mono flex items-center justify-between w-full">
          {senderName}
          <span className="text-[10px]">{formatDate(timestamp)}</span>
        </p>
        <div className="text-sm font-light  break-all  text-break break-words  ">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ChatCard;
