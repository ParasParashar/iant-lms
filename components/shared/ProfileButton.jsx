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

const ProfileButton = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className=" flex flex-col leading-none items-center justify-center px-2 pt-[2px]">
            <div className="relative rounded-full w-[25px] h-[25px] border border-black items-center justify-center flex">
              <Image
                src={"/profileimg.jpg"}
                fill
                alt={"iant-logo"}
                className="rounded-full "
              />
            </div>
            <div className="text-[11px] font-bold  text-zinc-600 flex items-center justify-center">
              {/* <span>Me</span> */}
              <IoMdArrowDropdown size={18} style={{ color: "3a3884" }} />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
