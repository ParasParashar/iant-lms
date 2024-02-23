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
            "text-muted-foreground group-hover:text-[#6a83d3e2]",
            isActive &&
              "text-[#221f56] group-hover:text-[#221f56] dark:text-white dark:group-hover:text-white"
          )}
        />
        <span
          className={cn(
            "text-[11px] font-semibold leading-none p-[2px]  text-muted-foreground group-hover:text-[#6a83d3e2] max-sm:hidden",
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
