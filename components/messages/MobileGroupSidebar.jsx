"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { GrCircleInformation } from "react-icons/gr";
import GroupInfoSidebar from "./GroupInfoSidebar";
import { useGroupSideOpen } from "@/hooks/useMessageSidebar";

const MobileGroupSidebar = ({ id }) => {
  const { isOpen, openSide } = useGroupSideOpen();

  return (
    <Sheet open={isOpen}>
      <SheetTrigger className="block xl:hidden hover:opacity-75 text-blue-600 font-light transition ">
        <Button
          onClick={openSide}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <GrCircleInformation size={20} className="text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="p-0 md:w-72 mt-[53px]  bg-secondary h-full w-full"
      >
        <GroupInfoSidebar id={id} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileGroupSidebar;
