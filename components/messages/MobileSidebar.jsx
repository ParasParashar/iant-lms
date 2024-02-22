import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import MessageSidebar from "./MessageSidebar";
import { Button } from "../ui/button";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-75 text-blue-600 ">
        <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
          <TbLayoutSidebarLeftExpand size={23} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0  bg-secondary h-full w-72 mt-[50px]"
      >
        <MessageSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
