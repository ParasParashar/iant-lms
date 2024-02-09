import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iant-LMS",
  description: "This is created by Paras Alok and Goutam",
};

export default function RootLayout({ children }) {
  // this is a main layout of a web-app don't edit it
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col md:px-40 px-10">
              <Navbar />
              <main className="mt-[65px] min-h-screen  max-sm:px-[20px]">{children}</main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
