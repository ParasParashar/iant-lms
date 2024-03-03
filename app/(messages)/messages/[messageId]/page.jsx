import {
  createMessage,
  getPersonalConversations,
  getReceiverUser,
} from "@/actions/messages.actions";
import { findOrCreateUser } from "@/actions/user.actions";
import PersonalMessageSkeleton from "@/components/SkeletonLoaders/PersonalMessageSkeleton";
import MessageHeader from "@/components/messages/MessageHeader";
import PersonalMessageArea from "@/components/messages/PersonalMessageArea";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async ({ params }) => {
  const { _id } = await findOrCreateUser();
  if (_id.toString() === params.messageId.toString()) redirect("/messages");
  const messageReceiver = await getReceiverUser(params.messageId);
  const userConversations = await getPersonalConversations({
    receiverId: params.messageId,
  });

  // create personal messages
  async function createPersonalMessage(value) {
    "use server";
    const response = await createMessage({
      receiverId: params.messageId,
      content: value,
    });
    return response;
  }

  return (
    <Suspense fallback={<PersonalMessageSkeleton />}>
      <div className="h-full">
        <main className="flex flex-col px-2 lg:px-0  items-center w-full h-full">
          <MessageHeader
            title={messageReceiver.name}
            email={messageReceiver.email}
            authId={messageReceiver.authId}
            converId={userConversations._id}
            path={params.messageId}
          />
          {/* <ChatArea userConversations={userConversations.messages} /> */}
          {/* <MessageInput receiverId={params.messageId} /> */}
          <PersonalMessageArea
            userConversations={userConversations.messages}
            receiverId={params.messageId}
            senderId={JSON.parse(JSON.stringify(_id))}
            handleCreateMessage={createPersonalMessage}
          />
        </main>
      </div>
    </Suspense>
  );
};

export default page;
