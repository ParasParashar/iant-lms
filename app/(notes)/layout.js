import NotesNavbar from "@/components/notes/NotesNavbar";
import NotesSidebar from "@/components/notes/NotesSidebar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const NotesLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-20 h-full overflow-y-auto  ">
      <Navbar />
      <div className="px-10 lg:px-40 flex w-full gap-5 mt-[80px] min-h-full">
        <NotesSidebar />
        <main className="flex flex-col gap-5  text-black  w-full">
          <NotesNavbar />
          <div className="flex rounded-xl flex-col bg-secondary h-full w-full">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NotesLayout;
