import {
  getPersonalConversations,
  getReceiverUser,
} from "@/actions/messages.actions";
import ChatArea from "@/components/messages/ChatArea";
import MessageHeader from "@/components/messages/MessageHeader";
import MessageInput from "@/components/messages/MessageInput";

const page = async ({ params }) => {
  const messageReceiver = await getReceiverUser(params.messageId);
  const userConversations = await getPersonalConversations({
    receiverId: params.messageId,
  });
  return (
    <main className="flex px-2 lg:px-0 flex-col justify-around items-center w-full h-[90%]  ">
      <MessageHeader
        title={messageReceiver.name}
        email={messageReceiver.email}
        authId={messageReceiver.authId}
      />
      <ChatArea
        userConversations={JSON.parse(JSON.stringify(userConversations))}
      />
      <MessageInput receiverId={params.messageId} />
    </main>
  );
};

export default page;
