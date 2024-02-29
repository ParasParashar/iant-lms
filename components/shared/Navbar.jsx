"use client";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Image from "next/image";
import { navbarRoutes } from "@/lib/Routes";
import NavBarItem from "./NabBarItem";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className=" px-3 md:px-20 lg:px-40 z-[9999] bg-secondary shadow-lg flex justify-between text-lg fixed top-0 left-0 w-full h-[55px] items-center  dark:border-b  border-neutral-600  ">
      <Link
        href="/home"
        className="relative w-[135px] h-[43px] max-sm:w-[120px] max-sm:h-[40px] my-2 "
      >
        <Image
          src={"/iantlogo.png"}
          fill
          alt={"iant-logo"}
          priority
          quality={80}
          sizes="(max-width:120px) , (max-height-43px)"
        />
      </Link>
      <nav className="flex justify-center items-center gap-x-4 max-sm:gap-x-2">
        {navbarRoutes.map((item, index) => (
          <div key={item.href} className="max-sm:hidden">
            <NavBarItem name={item.name} href={item.href} icon={item.icon} />
          </div>
        ))}

        {/* toggle theme button */}
        <ThemeToggleButton />
        <div>
          <ProfileButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
