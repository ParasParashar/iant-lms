import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SocketContextProvider } from "@/context/SocketProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ChatBotModel from "@/components/shared/ChatBotModel";

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
              <div className="h-full w-full">
                <ChatBotModel />
                {children}
              </div>
            </ThemeProvider>
          </body>
        </html>
      </SocketContextProvider>
    </ClerkProvider>
  );
}
