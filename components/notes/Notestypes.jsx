import Link from "next/link";
import { Button } from "../ui/button";

const Notestypes = () => {
  return (
    
        <div className="flex flex-col items-center gap-4 mt-10 mx-2">
          <Link
          href={"/notes/mynotes"}>
<div className="border bg-[#9670f8] w-[15rem] text-white dark:border-neutral-600 text-center rounded-2xl dark:text-black mx-2 py-[2px] hover:bg-[#b09eff]">
  My Notes
</div>
          </Link>
<Link href={"/notes"}>

          <div className="border bg-[#9670f8] w-[15rem] text-white dark:border-neutral-600 text-center dark:text-black rounded-2xl mx-2 py-[2px] hover:bg-[#b09eff]">
            Public Notes
          </div>
</Link>
      </div>
    
  )
}

export default Notestypes