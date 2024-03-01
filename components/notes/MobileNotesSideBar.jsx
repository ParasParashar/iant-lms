"use client";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import LinkButton from "./LinkButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const MobileNotesSideBar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon" className="rounded-full p-0">
          <Menu size={28} className="text-[#226eb4bb] hover:text-[#4d69b8] " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 flex flex-col  lg:hidden gap-1 justify-around">
        <DropdownMenuItem className="w-full">
          <LinkButton href="/notes/mynotes" type="myNotes" />
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full">
          <LinkButton href="/notes/savednotes" type="savedNotes" />{" "}
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full">
          <LinkButton href="/notes/create" type="create" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNotesSideBar;
