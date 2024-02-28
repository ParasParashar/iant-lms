import {
  getPersonalConversations,
  getReceiverUser,
} from "@/actions/messages.actions";
import { findOrCreateUser } from "@/actions/user.actions";
import MessagePageLoader from "@/components/SkeletonLoaders/MessagePageLoader";
import ChatArea from "@/components/messages/ChatArea";
import MessageHeader from "@/components/messages/MessageHeader";
import MessageInput from "@/components/messages/MessageInput";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async ({ params }) => {
  const { _id } = await findOrCreateUser();
  if (_id.toString() === params.messageId.toString()) redirect("/messages");
  const messageReceiver = await getReceiverUser(params.messageId);
  const userConversations = await getPersonalConversations({
    receiverId: params.messageId,
  });

  return (
    <Suspense fallback={<MessagePageLoader />}>
      <div className="h-full">
        <main className="flex flex-col px-2 lg:px-0  items-center w-full h-full">
          <MessageHeader
            title={messageReceiver.name}
            email={messageReceiver.email}
            authId={messageReceiver.authId}
            converId={userConversations._id}
            path={params.messageId}
          />
          <ChatArea userConversations={userConversations.messages} />
          <MessageInput receiverId={params.messageId} />
        </main>
      </div>
    </Suspense>
  );
};

export default page;
