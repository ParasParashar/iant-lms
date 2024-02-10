"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarItem = ({ href, name, icon: Icon }) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);
  return (
    <Link href={href}>
      <div className={cn("flex group flex-col items-center justify-center ")}>
        <Icon
          size={23}
          className={cn(
            "text-[#a3a1e3] group-hover:text-black",
            isActive &&
              "text-[#221f56] group-hover:text-[#221f56] dark:text-white dark:group-hover:text-white"
          )}
        />
        <span
          className={cn(
            "text-[11px] font-semibold leading-none p-[2px] group-hover:text-black  text-zinc-500 max-sm:hidden",
            isActive &&
              "text-[#221f56] group-hover:text-[#221f56] dark:text-white  dark:group-hover:text-white"
          )}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

export default NavBarItem;
