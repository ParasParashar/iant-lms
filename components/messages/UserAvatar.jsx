"use client ";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ img, name }) => {
  return (
    <Avatar>
      <AvatarImage src={img} />
      <AvatarFallback className="bg-blue-500/80">
        {name?.substr(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
