'use client'
import BreadCrumbs from "../shared/BreadCrumbs";
import MobileNotesSideBar from "./MobileNotesSideBar";
// import MobileSearchBar from "./MobileSearchBar";
import { IoSearch } from "react-icons/io5";
import { Button } from "../ui/button";
import LinkButton from "./LinkButton";
import Searchbar from "./Searchbar";
import { useNoteSearchProvider } from "@/context/NoteSearchBarProvider";
const NotesNavbar = () => {
  const {handleShow}= useNoteSearchProvider();
  return (
    <nav className="p-[6px] flex items-center justify-between dark:border-neutral-600 rounded-lg border bg-secondary z-50">
      <div className="flex items-center justify-center gap-1">
        <MobileNotesSideBar />
        <BreadCrumbs />
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="w-full  hidden lg:flex ">
          <Searchbar />
        </div>
       
          <Button
          onClick={handleShow}
            variant="outline"
            size="icon"
            className="lg:hidden dark:bg-neutral-900 rounded-full p-0"
          >
            <IoSearch size={23} className="text-[#226eb4bb]   " />
          </Button>
       
        <div className="w-full hidden lg:flex gap-1 justify-around">
          <LinkButton href="/notes/mynotes" type="myNotes" />
          <LinkButton href="/notes/savednotes" type="savedNotes" />
          <LinkButton href="/notes/create" type="create" />
        </div>
      </div>
    </nav>
  );
};

export default NotesNavbar;
