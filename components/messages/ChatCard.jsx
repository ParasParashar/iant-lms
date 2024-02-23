"use client";

import { cn, formatDate } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@clerk/nextjs";

const ChatCard = ({ conversation, group }) => {
  const { senderId, receiverId, content, timestamp } = conversation;
  const { userId } = useAuth();
  const isReceiver = senderId.authId === userId;
  let senderName;
  if (group) {
    senderName = senderId?.name;
  } else {
    senderName = isReceiver ? senderId?.name : "Me";
  }
  return (
    <section
      className={cn(
        "flex gap-2 items-start p-2 rounded-md min-w-[30%] shadow-lg max-w-[80%]",
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
        <div className="text-sm font-light text-break break-words  text-ellipsis ">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ChatCard;
