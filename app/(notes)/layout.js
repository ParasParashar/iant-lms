import MobileSearchBar from "@/components/notes/MobileSearchBar";
import NotesNavbar from "@/components/notes/NotesNavbar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { NoteSearchProviderContext } from "@/context/NoteSearchBarProvider";

const NotesLayout = ({ children }) => {
  return (
    <NoteSearchProviderContext>
      <main className="flex flex-col main-scrollbar gap-3 ">
        <Navbar />
        <main className="flex flex-col gap-2  text-black  w-full px-10 max-sm:px-2 lg:px-40  min-h-screen mt-[70px]">
          <div className="flex flex-col w-full gap-2">
            <NotesNavbar />
            <MobileSearchBar />
          </div>
          <div className="flex rounded-lg flex-col bg-secondary min-h-screen w-full p-2 h-full dark:border-neutral-600 border">
            {children}
          </div>
        </main>
        <Footer />
      </main>
    </NoteSearchProviderContext>
  );
};

export default NotesLayout;

{
  /* <div className="flex flex-col overflow-y-auto main-scrollbar ">
<Navbar />
<div className=" w-full m-auto px-10 max-sm:px-2 lg:px-40 z-50"><NotesNavbar /></div>
<main className="flex flex-col gap-2  text-black  w-full px-10 max-sm:px-2 lg:px-40">
  <MobileSearchBar/>
  <div className="flex rounded-lg flex-col bg-secondary   w-full p-2  dark:border-neutral-600 border-2">
    {children}
  </div>
</main>
<Footer />
</div> */
}

{
  /* <div className="flex flex-col gap-y-10 h-full overflow-y-auto main-scrollbar ">
      <Navbar />
      <main className="flex flex-col gap-2 pb-5 text-black  w-full px-10 max-sm:px-2 lg:px-40  mt-[65px] min-h-screen">
        <NotesNavbar />
        <MobileSearchBar/>
        <div className="flex rounded-lg flex-col bg-secondary  h-full w-full p-2  dark:border-neutral-600 border-2">
          {children}
        </div>
      </main>
      <Footer />z
    </div> */
}
