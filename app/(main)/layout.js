import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-3 h-full overflow-y-auto">
      <div className="flex flex-col md:px-40 px-10 ">
        <Navbar />
        <main className="mt-[65px] min-h-screen   max-sm:px-[20px] ">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
