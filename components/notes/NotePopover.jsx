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
          <HiDotsVertical size={18} className="text-black dark:text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" divide-y-2 space-y-2 w-auto bg-[#132233]">
        <Button
          varinat="outline"
          size="sm"
          onClick={handleActions}
          className=" w-full text-sm flex bg-tranperent hover:bg-white/30 dark:text-primary"
        >
          {isPublished ? (
            <div className="flex items-center justify-center gap-1">
              <IoIosRemoveCircle size={18} className="text-blue-500" />
              <span>Unpublish Note</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <MdPublish size={18} className="text-blue-500" />
              <span>Publish Note</span>
            </div>
          )}
        </Button>
        <ConfirmModel
          message="This action will permanently delete your note"
          onConfirm={handleDeleteNote}
        >
          <Button
            varinat="outline"
            size="sm"
            className=" w-full bg-tranperent hover:bg-white/30 mt-1"
          >
            <div className="flex items-center justify-center gap-1">
            <MdDeleteForever size={18} className="text-red-500" />
            <span className="text-sm dark:text-primary">Delete Note</span>
            </div>
          </Button>
        </ConfirmModel>
      </PopoverContent>
    </Popover>
  );
}
