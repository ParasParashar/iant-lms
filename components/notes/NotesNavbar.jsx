import BreadCrumbs from "../shared/BreadCrumbs";
import { IoCreateOutline } from "react-icons/io5"
import { Button } from "../ui/button";

const NotesNavbar = () => {
  return (
    <nav className="p-2 flex items-center justify-between dark:border-neutral-600 rounded-lg border bg-secondary">
      <BreadCrumbs/>
      <Button variant="ghost" size="icon" ><IoCreateOutline size={25}/></Button>
    </nav>
  );
};

export default NotesNavbar;
