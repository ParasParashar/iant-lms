"use client";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LinkButton from "./LinkButton";
const MobileNotesSideBar = () => {
  return (
    <Popover>
      <PopoverTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon" className="rounded-full p-0">
          <Menu size={23} className="text-[#226eb4bb] hover:text-[#4d69b8] " />
        </Button>
      </PopoverTrigger>
      {/* <PopoverContent side="bottom" className=" w-56"> */}
      <PopoverContent className="w-36 flex flex-col  lg:hidden gap-1 justify-around">
        <LinkButton href="/notes/mynotes" type="myNotes" />
        <LinkButton href="/notes/savednotes" type="savedNotes" />
        <LinkButton href="/notes/create" type="create" />
      </PopoverContent>
      {/* </PopoverContent> */}
    </Popover>
  );
};

export default MobileNotesSideBar;
