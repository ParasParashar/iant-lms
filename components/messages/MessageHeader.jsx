"use client";

import { useSocket } from "@/context/SocketProvider";
import MobileSidebar from "./MobileSidebar";
import UserAvatar from "./UserAvatar";

const MessageHeader = ({ title, email, authId }) => {
  const { onlineUsers } = useSocket();
  const onlineUser = onlineUsers?.includes(authId);
  return (
    <header className="flex  rounded-lg  items-center justify-between w-full h-14 p-1 bg-slate-300/90 dark:bg-slate-700  backdrop-blur-lg px-5">
      <div className="flex gap-1 items-center  justify-start ">
        <MobileSidebar />
        <UserAvatar name={title} />
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-gray-300">
            {title}
          </h2>
          <p className="text-muted-foreground text-[12px] font-light">
            {email}
          </p>
        </div>
      </div>
      {onlineUser ? (
        <p className="text-lg font-mono text-neutral-900/50 dark:text-white  animate-pulse">
          {onlineUser && "Online"}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground ">Offline</p>
      )}
    </header>
  );
};

export default MessageHeader;
