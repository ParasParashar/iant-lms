import { getAllConversationsOfUser } from "@/actions/messages.actions";
import MessageSidebar from "@/components/messages/MessageSidebar";
import Navbar from "@/components/shared/Navbar";

const MessageLayout = async ({ children }) => {
  const data = await getAllConversationsOfUser();
  return (
    <div className="flex flex-col lg:px-36 h-full overflow-hidden ">
      <Navbar />
      <section className="flex gap-2 mt-[63px] h-full ">
        <div className="hidden md:flex h-full w-64  mt-[63px] flex-col fixed inset-y-0 z-50">
          <MessageSidebar data={data} />
        </div>
        <main className=" md:pl-[267px] h-full w-full ">{children}</main>
      </section>
    </div>
  );
};

export default MessageLayout;
