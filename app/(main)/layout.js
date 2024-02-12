import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const MainLayout = ({ children }) => {
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col gap-y-3 h-full overflow-y-auto main-scrollbar">
      <div className="flex flex-col md:px-40 px-8 ">
        <Navbar />
        <main className="mt-[65px] min-h-screen  ">{children}</main>
=======
    <div className="flex flex-col gap-y-3 h-full overflow-y-auto">
      <div className="flex flex-col md:px-20 px-10 ">
        <Navbar />
        <main className="mt-[65px] min-h-screen  max-sm:px-[20px] ">
          {children}
        </main>
>>>>>>> Stashed changes
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
