import {
  getGroupConversation,
  getGroupUsersInfo,
} from "@/actions/messages.actions";
import { findOrCreateUser } from "@/actions/user.actions";
import GroupPageSkeleton from "@/components/SkeletonLoaders/GroupPageSkeleton";
import GroupChatArea from "@/components/messages/GroupChatArea";
import GroupInfoSidebar from "@/components/messages/GroupInfoSidebar";
import MessageHeader from "@/components/messages/MessageHeader";
import MessageHeaderPopover from "@/components/messages/MessageHeaderPopover";
import MessageInput from "@/components/messages/MessageInput";
import MobileGroupSidebar from "@/components/messages/MobileGroupSidebar";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
    <Suspense fallback={<GroupPageSkeleton />}>
      <div className=" flex pb-3 w-full items-center h-full  gap-3">
        <main className="flex flex-col items-center w-full h-full rounded-lg bg-secondary">
          <header className="w-full rounded-lg flex  justify-between items-center  bg-slate-300/90 dark:bg-slate-700 pr-1">
            <MessageHeader title={groupInfo?.name} group />
            <div className="flex gap-1 items-center">
              <div className="block xl:hidden  ">
                <MobileGroupSidebar id={params.groupId} />
              </div>
              <MessageHeaderPopover
                converId={groupConversation._id}
                path={params.groupId}
                isGroup
              />
            </div>
          </header>
          {/* group chat section */}
          <GroupChatArea groupConversation={groupConversation.messages} />
          {/* group input section */}
          <MessageInput group groupId={params.groupId} />
        </main>
        <div className="hidden  w-[23rem] xl:flex h-full">
          <GroupInfoSidebar id={params.groupId} />
        </div>
      </div>
    </Suspense>
  );
};

export default GroupPage;
