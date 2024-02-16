import BreadCrumbs from "../shared/BreadCrumbs";
import { Button } from "../ui/button";

const NotesNavbar = () => {
  return (
    <nav className="p-2 flex items-center justify-between dark:border-neutral-600 rounded-lg border bg-secondary">
      <BreadCrumbs/>
      <Button varinat="outline" size="icon" >x</Button>
    </nav>
  );
};

export default NotesNavbar;
