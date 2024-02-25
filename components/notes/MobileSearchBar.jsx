"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Searchbar from "./Searchbar";

const MobileSearchBar = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent classname="w-full">
        <DialogTitle>Search Note</DialogTitle>
        <Searchbar />
      </DialogContent>
    </Dialog>
  );
};

export default MobileSearchBar;
