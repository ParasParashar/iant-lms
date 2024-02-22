import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import GroupUsersSidebar from "./GroupUsersSidebar";
import { Button } from "../ui/button";
import { GrCircleInformation } from "react-icons/gr";

const MobileGroupSidebar = ({ id }) => {
  return (
    <Sheet>
      <SheetTrigger className="block xl:hidden hover:opacity-75 text-blue-600 font-light transition ">
        <Button variant="outline" size="icon" className="rounded-full">
          <GrCircleInformation size={20} className="text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-72 mt-[50px] bg-white">
        <GroupUsersSidebar id={id} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileGroupSidebar;
