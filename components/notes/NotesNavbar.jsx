import BreadCrumbs from "../shared/BreadCrumbs";
import MobileNotesSideBar from "./MobileNotesSideBar";
import MobileSearchBar from "./MobileSearchBar";
import { IoSearch } from "react-icons/io5";
import { Button } from "../ui/button";
import LinkButton from "./LinkButton";

const NotesNavbar = () => {
  return (
    <nav className="p-2 flex items-center justify-between dark:border-neutral-600 rounded-lg border bg-secondary">
      <div className="flex items-center justify-center">
        <MobileNotesSideBar />
        <BreadCrumbs />
      </div>
      <div className="flex justify-center items-center gap-2">
        <MobileSearchBar>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden rounded-full"
          >
            <IoSearch size={24} className="text-[#226eb4bb]   " />
          </Button>
        </MobileSearchBar>
        <LinkButton href="/notes/create" type="create" />
      </div>
    </nav>
  );
};

export default NotesNavbar;
