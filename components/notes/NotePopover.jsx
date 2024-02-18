import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdDeleteForever, MdPublish } from "react-icons/md";

export function NotePopover({ isPublished, handlePublish, handleDeleteNote }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon2">
          <HiDotsVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w">
        <DropdownMenuItem onClick={handlePublish}>
          <p className="flex hover:text-muted-foreground w-full text-sm items-center justify-between">
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
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteNote}>
          <span className="flex hover:text-muted-foreground w-full text-sm items-center justify-between">
            <MdDeleteForever size={20} className="text-red-500" />
            <span>Delete Note</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
