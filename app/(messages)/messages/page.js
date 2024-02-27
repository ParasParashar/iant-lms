import MessageHomeSkeleton from "@/components/SkeletonLoaders/MessageHomeSkeleton";
import MobileSidebar from "@/components/messages/MobileSidebar";
import SearchUsers from "@/components/messages/SearchUsers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";
import { BiSolidMessageDetail } from "react-icons/bi";

const page = () => {
  return (
    <Suspense fallback={<MessageHomeSkeleton />}>
      <main className="flex flex-col  items-center  w-full h-full  justify-center gap-2">
        <section className="relative h-1/2 w-1/2">
          <Image src={"/chatImage.png"} alt="Chat Image" fill />
        </section>
        <div className="text-sm lg:text-lg font-mono text-muted-foreground flex items-center">
          <h4 className="text-center">
            Select a conversation to start messaging.
          </h4>
          <Button variant="secondary" size="sm" className="block lg:hidden">
            <MobileSidebar />
            <span>Select Conversation</span>
          </Button>
        </div>
        <SearchUsers>
          <Button
            variant="secondary"
            className=" font-bold text-lg font-mono"
            size="sm"
          >
            Create a Chat{" "}
            <BiSolidMessageDetail size={20} className="text-blue-500" />
          </Button>
        </SearchUsers>
      </main>
    </Suspense>
  );
};

export default page;
