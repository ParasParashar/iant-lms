"use client";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";
import UserCardPopover from "./UserCardPopover";
import { FaUser } from "react-icons/fa";
import { useSocket } from "@/context/SocketProvider";

const UserCard = ({
  id,
  name,
  email,
  authId,
  isActive,
  group,
  isAdmin,
  isUserAdmin,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/messages/${id}`);
  };
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers?.includes(authId);
  return (
    <section
      className={cn(
        "flex cursor-pointer   group  rounded-lg items-center gap-1 border-b-2 border-slate-300 shadow-inner dark:border-slate-700 p-1 hover:bg-white dark:hover:bg-slate-600/80 hover:shadow-lg  justify-between",
        isActive && " bg-white dark:bg-slate-600/80  "
      )}
    >
      <div className="flex gap-1 w-full" onClick={handleClick}>
        <UserAvatar name={name} />
        <div className="flex flex-col p-1 w-full">
          <div
            className={cn(
              "text-sm font-light group-hover:font-semibold flex justify-between items-center w-full",
              isActive && "font-semibold"
            )}
          >
            <p>{name}</p>
            {group && (
              <div className=" flex items-center gap-x-2">
                {isOnline ? (
                  <span className="text-muted-foreground animate-pulse text-xs">
                    Online
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">
                    Offline
                  </span>
                )}
                {isAdmin && (
                  <div className=" flex items-center">
                    <FaUser className="text-blue-500" />
                    <span className="text-blue-500 font-mono">Admin</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <p
            className={cn(
              "text-xs font-light  group-hover:font-normal text-muted-foreground line-clamp-1 truncate",
              isActive && "font-normal"
            )}
          >
            {email}
          </p>
        </div>
      </div>
      {group && isUserAdmin && !isAdmin && <UserCardPopover userId={id} />}
    </section>
  );
};

export default UserCard;
