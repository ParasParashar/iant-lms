"use client ";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ img, name, group }) => {
  return (
    <Avatar>
      {group ? (
        <AvatarFallback className="bg-green-800/40 ring-2 text-white font-bold dark:bg-green-800/40">
          {name?.substr(0, 1).toUpperCase()}
        </AvatarFallback>
      ) : (
        <>
          <AvatarImage src={img} />
          <AvatarFallback className="bg-blue-700/50 font-semibold text-sm dark:bg-blue-800/70">
            {name?.substr(0, 2).toUpperCase()}
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
};

export default UserAvatar;
