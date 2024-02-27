import BreadCrumbs from "../shared/BreadCrumbs";
import MobileNotesSideBar from "./MobileNotesSideBar";
import MobileSearchBar from "./MobileSearchBar";
import { IoSearch } from "react-icons/io5";
import { Button } from "../ui/button";
import LinkButton from "./LinkButton";
import Searchbar from "./Searchbar";

const NotesNavbar = () => {
  return (
    <nav className="p-[6px] flex items-center justify-between dark:border-neutral-600 rounded-lg border bg-secondary">
      <div className="flex items-center justify-center gap-1">
        <MobileNotesSideBar />
        <BreadCrumbs />
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="w-full  hidden lg:flex ">
          <Searchbar />
        </div>
        <MobileSearchBar>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden rounded-full p-0"
          >
            <IoSearch size={23} className="text-[#226eb4bb]   " />
          </Button>
        </MobileSearchBar>
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
