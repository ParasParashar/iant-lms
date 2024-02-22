
import { Menu } from "lucide-react"
import {Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Notestypes from "./Notestypes"
const MobileNotesSideBar = () => {
  return (
    <Sheet>
  <SheetTrigger className="lg:hidden pr-5 hover:opacity-75 transition ">
  <Menu size={32} className="text-[#226eb4bb] hover:text-[#4d69b8] rounded-lg p-1 hover:bg-[#b7cffc] notescardhover"/>
  </SheetTrigger>
  <SheetContent side="left" className="pt-4 mt-[55px] w-72">
    <Notestypes/>
  </SheetContent>
</Sheet>

  )
}

export default MobileNotesSideBar