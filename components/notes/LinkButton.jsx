"use client";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoCreateSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";

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
      className=" group  dark:hover:border-black border  rounded-full text-center flex items-center"
    >
      {type === "create" && (
        <>
          <IoCreateSharp
            size={22}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />
          <span className=" text-primary group-hover:text-muted-foreground">
            Create
          </span>
        </>
      )}
      {type === "edit" && (
        <>
          <CiEdit
            size={22}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />
          <span className=" text-primary group-hover:text-muted-foreground">
            Edit
          </span>
        </>
      )}
      {type === "myNotes" && (
        <>
          <CiEdit
            size={22}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />
          <span className=" text-primary group-hover:text-muted-foreground">
            My notes
          </span>
        </>
      )}
      {type === "savedNotes" && (
        <>
          <FaBookmark
            size={22}
            className="text-[#226eb4bb] group-hover:text-blue-500"
          />

          <span className=" text-primary group-hover:text-muted-foreground">
            Saved
          </span>
        </>
      )}
    </Button>
  );
};

export default LinkButton;
