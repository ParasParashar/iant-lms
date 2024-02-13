"use client";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Image from "next/image";
import { navbarRoutes } from "@/lib/Routes";
import NavBarItem from "./NabBarItem";
import ProfileButton from "./ProfileButton";
const Navbar = () => {
  return (
    <header className="lg:px-40 max-sm:px-[10px] z-[9999] bg-secondary shadow-lg flex justify-around md:justify-between text-lg fixed top-0 left-0 w-full h-[55px] items-center px-10 max-md:px-30 dark:border-b  border-neutral-600  ">
      <div className="relative w-[135px] h-[43px] max-sm:w-[120px] max-sm:h-[40px] my-2 ">
        <Image src={"/iantlogo.png"} fill alt={"iant-logo"} />
      </div>
      <div className="flex justify-center items-center gap-x-5">
        {navbarRoutes.map((item, index) => (
          <NavBarItem
            key={index}
            name={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
        {/* toggle theme button */}
        <ThemeToggleButton />
        <div>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
