import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Notestypes from "./Notestypes";
import { Button } from "../ui/button";
const MobileNotesSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-5 hover:opacity-75 transition ">
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu size={32} className="text-[#226eb4bb] hover:text-[#4d69b8] " />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pt-4 mt-[55px] w-72">
        <Notestypes />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNotesSideBar;
