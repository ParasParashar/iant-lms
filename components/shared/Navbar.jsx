import Link from "next/link";
import { ThemeToggleButton } from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <nav className="lg:px-40 z-[9999] bg-secondary shadow-xl flex gap-x-3 p-5 text-lg font-bold font-serif   fixed top-0 left-0 w-full">
      <Link href={"/"}>Home</Link>
      <Link href={"/courses"}>Courses</Link>
      <Link href={"/calender"}>Calender</Link>l
      <div>
        {/* toggle theme button  */}
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
