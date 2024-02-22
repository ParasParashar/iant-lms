import {
  getGroupConversation,
  getGroupUsersInfo,
} from "@/actions/messages.actions";
import { findOrCreateUser } from "@/actions/user.actions";
import GroupChatArea from "@/components/messages/GroupChatArea";
import GroupUsersSidebar from "@/components/messages/GroupUsersSidebar";
import MessageHeader from "@/components/messages/MessageHeader";
import MessageInput from "@/components/messages/MessageInput";
import MobileGroupSidebar from "@/components/messages/MobileGroupSidebar";
import { redirect } from "next/navigation";

const GroupPage = async ({ params }) => {
  const groupInfo = await getGroupUsersInfo({ groupId: params.groupId });
  const { _id } = await findOrCreateUser();
  const isMember = groupInfo?.members
    ?.map((user) => user.userId._id.toString())
    ?.includes(_id.toString());
  if (!isMember) redirect("/messages");
  if (!groupInfo) {
    return (
      <div className=" text-center flex-col font-bold text-xl text-muted-foreground justify-center  h-full  flex items-center w-full">
        <p className="text-lg font-light">Sorry!! Something Went wrong</p>
        <p>Group Not Found</p>
      </div>
    );
  }
  const groupConversation = await getGroupConversation({
    groupId: params.groupId,
  });
  return (
    <div className=" flex pb-3 w-full items-center h-full  gap-3">
      <main className="flex flex-col items-center w-full h-full rounded-lg bg-secondary">
        {/* group header */}
        <header className="w-full rounded-lg flex justify-between items-center  bg-slate-300/90 dark:bg-slate-700 pr-1">
          <MessageHeader title={groupInfo?.name} group />
          <div className="block xl:hidden  ">
            <MobileGroupSidebar id={params.groupId} />
          </div>
        </header>
        {/* group chat section */}
        <GroupChatArea groupConversation={groupConversation} />
        {/* group input section */}
        <MessageInput group groupId={params.groupId} />
      </main>
      <div className="hidden  w-[23rem] xl:flex h-full">
        <GroupUsersSidebar id={params.groupId} />
      </div>
    </div>
  );
};

export default GroupPage;
