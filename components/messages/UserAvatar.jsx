"use client ";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ img, name, group }) => {
  return (
    <Avatar>
      {group ? (
        <AvatarFallback className="bg-blue-900 ring-2 text-white font-bold dark:bg-blue-800">
          {name?.substr(0, 1).toUpperCase()}
        </AvatarFallback>
      ) : (
        <>
          <AvatarImage src={img} />
          <AvatarFallback className="bg-blue-500/80">
            {name?.substr(0, 2).toUpperCase()}
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
};

export default UserAvatar;
