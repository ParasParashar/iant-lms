import NotesNavbar from "@/components/notes/NotesNavbar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const NotesLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-10 h-full overflow-y-auto main-scrollbar ">
      <Navbar />
      <main className="flex flex-col gap-2 pb-5 text-black  w-full px-10 max-sm:px-2 lg:px-40  mt-[65px] min-h-screen">
        <NotesNavbar />
        <div className="flex rounded-lg flex-col bg-secondary  h-full w-full p-2  dark:border-neutral-600 border-2">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotesLayout;
