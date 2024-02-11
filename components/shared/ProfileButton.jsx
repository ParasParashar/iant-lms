"use client";
import { PiSignOutBold } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

const ProfileButton = () => {
  const { user } = useUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className=" flex flex-col leading-none items-center justify-center px-2 group ">
            <div className="relative rounded-full w-[25px] h-[25px] items-center justify-center flex">
              <Image
                src={user?.imageUrl}
                fill
                alt="Logo"
                className="rounded-full "
              />
            </div>
            {/* <span>Me</span> */}
            <IoMdArrowDropdown
              size={18}
              className="text-muted-foreground group-hover:text-black "
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>
              <>
                <PiSignOutBold className=" text-muted-foreground mr-3" />
                <p className="text-muted-foreground">Logout</p>
              </>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
