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
        <IoSearch size={32} className='text-[#226eb4bb] hover:text-[#4d69b8] rounded-lg p-1 hover:bg-[#b7cffc] notescardhover' />
          </div>
          </MobileSearchBar>
        <Link  href={"/notes/creates"}><IoCreateSharp size={32}  className="text-[#226eb4bb] hover:text-[#4d69b8] rounded-lg p-1 hover:bg-[#b7cffc] notescardhover"/></Link>
      </div>
    </nav>
  );
};

export default NotesNavbar;
