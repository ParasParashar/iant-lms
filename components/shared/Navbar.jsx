import Link from "next/link";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Image from "next/image";
import { BiHome } from "react-icons/bi"
import { BiBookReader } from "react-icons/bi"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { VscNote } from "react-icons/vsc";
import { BiMessageRoundedDots } from "react-icons/bi"
import Profile from "./Profile";
const Navbar = () => {
  return (
    <header className="lg:px-40 max-sm:px-[20px] z-[9999] bg-secondary shadow-xl flex justify-between text-lg fixed top-0 left-0 w-full h-[55px] items-center px-10 max-sm:h-[45px] max-md:px-30">
      <div className="relative w-[135px] h-[43px] max-sm:w-[120px] max-sm:h-[40px] my-2 ">

        <Image src={'/iantlogo.png'} fill alt={'iant-logo'} />
      </div>
      <div className="flex justify-center items-center gap-4">
        <div>
          <Link href={"/"}>
            <div className="flex flex-col items-center justify-center">
              <BiHome size={23} style={{ color: "3a3884" }} />
              <span className="text-[11px] font-bold leading-none p-[2px] text-zinc-600 max-sm:hidden">Home</span>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/courses"}>
            <div className="flex flex-col items-center justify-center">
              <BiBookReader size={23} style={{ color: "3a3884" }} />
              <span className="text-[11px] font-bold leading-none p-[2px] text-zinc-600 max-sm:hidden">Course</span>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/notes"}>
            <div className="flex flex-col items-center justify-center">
              <VscNote size={23} style={{ color: "3a3884" }} />
              <span className="text-[11px] font-bold leading-none p-[2px] text-zinc-600 max-sm:hidden text-nowrap ">My Notes</span>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/"}>
            <div className="flex flex-col items-center justify-center">
              <MdOutlineNotificationsActive size={23} style={{ color: "3a3884" }} />
              <span className="text-[11px] font-bold leading-none p-[2px] text-zinc-600 max-sm:hidden">Notification</span>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/"}>
            <div className="flex flex-col items-center justify-center">
              <BiMessageRoundedDots size={23} style={{ color: "3a3884" }} />
              <span className="text-[11px] font-bold leading-none p-[2px] text-zinc-600 max-sm:hidden ">Message</span>
            </div>
          </Link>
        </div>
        <div>
          {/* toggle theme button  */}
          <ThemeToggleButton />
        </div>
        <div>
            <Profile />
          </div>

      </div>
    </header>
  );
};

export default Navbar;
