import Link from "next/link";
import Searchbar from "./Searchbar";

const NotesSidebar = () => {
  return (
    <aside className="w-[17rem] rounded-xl  border bg-secondary dark:border-neutral-600 h-3/4 text-muted-foreground ">
      <Searchbar />
      <div className="flex flex-col items-center gap-4 mt-10 mx-2">
          <Link
          href={"/notes/mynotes"}>
<div className="border bg-[#e5e5fe] w-[15rem] dark:border-neutral-600 text-center rounded-2xl mx-2 py-[2px] hover:bg-[#d8d8fc]">
  My Notes
</div>
          </Link>
<Link href={"/notes"}>

          <div className="border bg-[#e5e5fe] w-[15rem] dark:border-neutral-600 text-center rounded-2xl mx-2 py-[2px] hover:bg-[#d8d8fc]">
            Public Notes
          </div>
</Link>
      </div>
    </aside>
  );
};

export default NotesSidebar;
