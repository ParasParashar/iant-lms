
import Searchbar from "./Searchbar";
import Notestypes from "./Notestypes";

const NotesSidebar = () => {
  return (
    <aside className="w-[17rem] rounded-lg  border bg-secondary dark:border-neutral-600 h-3/4 text-muted-foreground ">
      <Searchbar />
      <div>
        <Notestypes/>
      </div>
    </aside>
  );
};

export default NotesSidebar;
