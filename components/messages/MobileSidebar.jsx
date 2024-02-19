import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import MessageSidebar from "./MessageSidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-1 hover:opacity-75 text-sky-300 font-light transition">
        <TbLayoutSidebarLeftExpand size={23} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72 mt-[50px]">
        <MessageSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
