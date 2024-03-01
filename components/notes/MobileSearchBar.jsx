'use client'

import { useNoteSearchProvider } from "@/context/NoteSearchBarProvider";
import Searchbar from "./Searchbar";
const MobileSearchBar = () => {
  const {showBar}=useNoteSearchProvider();
 
  
  return (
    <div className='flex  animate-accordion-down ease-in-out duration-300 transition-all lg:hidden w-full'>
    {showBar && (
      <div className="flex items-center w-full gap-x-1">
        <Searchbar />
      
      </div>
    )}
    </div>
  )
}

export default MobileSearchBar
