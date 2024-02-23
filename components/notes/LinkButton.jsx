"use client";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoCreateSharp } from "react-icons/io5";

const LinkButton = ({ href, type }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="outline"
      className=" rounded-full text-center"
    >
      {type === "create" ? (
        <IoCreateSharp size={22} className="text-[#226eb4bb]" />
      ) : (
        <CiEdit size={22} className="text-[#226eb4bb]" />
      )}
    </Button>
  );
};

export default LinkButton;
