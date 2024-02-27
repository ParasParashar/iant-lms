"use client";
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
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { navbarRoutes } from "@/lib/Routes";

const ProfileButton = () => {
  const { user } = useUser();
  const pathName = usePathname();
  // const isShow =
  // pathName?.includes("/courses/6") && pathName?.includes("/chapters");

  const params = useParams();
  const isActive =
    pathName?.includes("/courses") && pathName?.includes(params.courseId);

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
          <div className={!isActive ? "sm:hidden" : ""}>
            {navbarRoutes.map((item) => (
              <Link href={item.href}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <item.icon />
                  <div>{item.name}</div>
                </DropdownMenuItem>
              </Link>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
