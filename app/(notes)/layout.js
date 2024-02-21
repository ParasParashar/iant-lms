import NotesNavbar from "@/components/notes/NotesNavbar";
import NotesSidebar from "@/components/notes/NotesSidebar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const NotesLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-20 h-full overflow-y-auto  ">
      <Navbar />
      <div className="px-10 max-sm:px-2 lg:px-40 flex w-full gap-4 mt-[65px] min-h-full ">
        <div className="max-lg:hidden">
        <NotesSidebar />

        </div>
        <main className="flex flex-col gap-2  text-black  w-full">
          <NotesNavbar />
          <div className="flex rounded-lg flex-col bg-secondary h-full w-full py-2 px-2">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NotesLayout;
