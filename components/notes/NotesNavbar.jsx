import BreadCrumbs from "../shared/BreadCrumbs";
import { IoCreateSharp } from "react-icons/io5"
import MobileNotesSideBar from "./MobileNotesSideBar";
import MobileSearchBar from "./MobileSearchBar";
import { IoSearch } from "react-icons/io5"
import Link from "next/link";


const NotesNavbar = () => {
  return (
    <nav className="p-2 flex items-center justify-between dark:border-neutral-600 rounded-lg border bg-secondary">
      <div className="flex items-center justify-center">
        <MobileNotesSideBar />
        <BreadCrumbs />
      </div>
      <div className="flex justify-center items-center gap-2">
        <MobileSearchBar>
        <div className="lg:hidden">
        <IoSearch size={25} className='text-[#343080]' />
          </div>
          </MobileSearchBar>
        <Link  href={"/notes/creates"}><IoCreateSharp size={25}  className="text-[#9670f8] hover:text-[#b09eff]"/></Link>
      </div>
    </nav>
  );
};

export default NotesNavbar;
