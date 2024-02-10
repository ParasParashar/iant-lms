import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./CourseSidebar";

export const CourseMobileSidebar = ({ course }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-5 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};
