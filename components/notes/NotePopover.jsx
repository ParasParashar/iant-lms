"use client";
import { Button } from "@/components/ui/button";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdDeleteForever, MdPublish } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ConfirmModel } from "../shared/ConfirmModel";

export function NotePopover({ isPublished, handleActions, handleDeleteNote }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          varinat="link"
          size="icon"
          className="rounded-full bg-transparent  hover:bg-secondary/50 p-0  "
        >
          <HiDotsVertical size={25} className="text-black dark:text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" divide-y-2 space-y-2 w-auto bg-secondary">
        <Button
          varinat="outline"
          size="sm"
          onClick={handleActions}
          className="flex hover:text-muted-foreground w-full text-sm items-center justify-between"
        >
          {isPublished ? (
            <>
              <IoIosRemoveCircle size={20} className="text-blue-500" />
              <span>Unpublish Note</span>
            </>
          ) : (
            <>
              <MdPublish size={20} className="text-blue-500" />
              <span>Publish Note</span>
            </>
          )}
        </Button>
        <ConfirmModel
          message="This action will permanently delete your note"
          onConfirm={handleDeleteNote}
        >
          <Button
            varinat="outline"
            size="sm"
            className="flex hover:text-muted-foreground w-full text-sm items-center justify-between"
          >
            <MdDeleteForever size={20} className="text-red-500" />
            <span>Delete Note</span>
          </Button>
        </ConfirmModel>
      </PopoverContent>
    </Popover>
  );
}
