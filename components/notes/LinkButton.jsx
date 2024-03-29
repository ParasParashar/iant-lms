"use client";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoCreateSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { PiNotebookBold } from "react-icons/pi";

const LinkButton = ({ href, type }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      size="sm"
      variant="outline"
      className=" group  dark:hover:border-black border w-full dark:border-neutral-600 rounded-full text-center flex items-center"
    >
      {type === "create" && (
        <div className="flex items-center justify-center gap-1">
          <IoCreateSharp
            size={20}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />
          <span className=" text-primary group-hover:text-muted-foreground">
            Create
          </span>
        </div>
      )}
      {type === "edit" && (
        <div className="flex items-center justify-center gap-1">
          <CiEdit
            size={20}
            className="text-[#0486ff] group-hover:text-blue-500"
          />
          <span className=" text-primary group-hover:text-muted-foreground text-sm">
            Edit
          </span>
        </div>
      )}
      {type === "myNotes" && (
        <div className="flex items-center justify-center gap-1">
          <PiNotebookBold
            size={20}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />
          <span className=" text-primary group-hover:text-muted-foreground">
            My notes
          </span>
        </div>
      )}
      {type === "savedNotes" && (
        <div className="flex items-center justify-center gap-1">
          <FaBookmark
            size={18}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />

          <span className=" text-primary group-hover:text-muted-foreground">
            Saved
          </span>
        </div>
      )}
    </Button>
  );
};

export default LinkButton;
