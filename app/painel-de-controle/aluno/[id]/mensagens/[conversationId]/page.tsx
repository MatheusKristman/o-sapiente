import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesContacts from "@/components/dashboard/messages/MessagesContacts";
import MessagesImageModal from "@/components/dashboard/messages/MessagesImageModal";
import MessagesVideoModal from "@/components/dashboard/messages/MessagesVideoModal";
import getConversations from "@/app/action/getConversations";
import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";

interface Props {
  params: {
    conversationId: string;
  };
}

const DashboardPage = async ({ params }: Props) => {
  const conversations = await getConversations();
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    // TODO depois inserir um loading
    return (
      <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row"></div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-144px)] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
      <MessagesContacts
        initialConversations={conversations}
        conversationParams={params}
        userType="aluno"
      />

      <MessagesChatBox
        conversation={conversation}
        initialMessages={messages}
        conversationParams={params}
        userType="aluno"
      />
    </div>
  );
};

export default DashboardPage;
