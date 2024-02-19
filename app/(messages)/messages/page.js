import SearchUsers from "@/components/messages/SearchUsers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BiSolidMessageDetail } from "react-icons/bi";

const page = () => {
  return (
    <main className="flex flex-col  items-center  w-full h-full  justify-center gap-2">
      <section className="relative h-1/2 w-1/2">
        <Image src={"/chatImage.png"} alt="Chat Image" fill />
      </section>
      <h3 className="text-lg font-mono text-muted-foreground">
        Select a chat to start messaging.
      </h3>
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
  );
};

export default page;
