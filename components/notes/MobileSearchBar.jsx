'use client'

import { useNoteSearchProvider } from "@/context/NoteSearchBarProvider";
import { Button } from "../ui/button";
import Searchbar from "./Searchbar";
import { useRouter } from "next/navigation";

const MobileSearchBar = () => {
  const {showBar,handleHide}=useNoteSearchProvider();
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    handleHide();
    router.push('/notes')
  };
  
  return (
    <div className='flex  animate-accordion-down ease-in-out duration-300 transition-all lg:hidden w-full'>
    {showBar && (
      <div className="flex items-center w-full gap-x-1">
        <Searchbar />
        <Button
        variant='outline'
        size='icon'
        onClick={handleClick}
        className='rounded-full'
        >
          x
        </Button>
      </div>
    )}
    </div>
  )
}

export default MobileSearchBar
