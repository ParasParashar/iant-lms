"use client";

import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

const UserCard = ({ id, name, email, isActive }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/messages/${id}`);
  };
  return (
    <section
      onClick={handleClick}
      className={cn(
        "flex cursor-pointer   group  rounded-lg items-center gap-2 border-b-2 border-slate-300 shadow-inner dark:border-slate-700 p-1 hover:bg-white dark:hover:bg-slate-600/80 hover:shadow-lg ",
        isActive && " bg-white dark:bg-slate-600/80  "
      )}
    >
      <UserAvatar name={name} />
      <div className="flex flex-col p-1">
        <p
          className={cn(
            "text-sm font-light group-hover:font-semibold",
            isActive && "font-semibold"
          )}
        >
          {name}
        </p>
        <p
          className={cn(
            "text-xs font-light  group-hover:font-normal text-muted-foreground",
            isActive && "font-normal"
          )}
        >
          {email}
        </p>
      </div>
    </section>
  );
};

export default UserCard;
