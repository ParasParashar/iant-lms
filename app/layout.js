import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SocketContextProvider } from "@/context/SocketProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IANT Learning Management System",
  description: "This is created by Paras Alok and Goutam",
};

export default function RootLayout({ children }) {
  // this is a main layout of a web-app don't edit it
  return (
    <ClerkProvider>
      <SocketContextProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </SocketContextProvider>
    </ClerkProvider>
  );
}
