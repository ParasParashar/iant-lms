import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-3 h-full overflow-y-auto main-scrollbar">
      <div className="flex flex-col md:px-40 px-8 ">
        <Navbar />
        <main className="mt-[65px] min-h-screen  ">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
