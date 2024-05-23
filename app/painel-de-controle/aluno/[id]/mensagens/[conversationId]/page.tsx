import { revalidatePath } from "next/cache";

import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesContacts from "@/components/dashboard/messages/MessagesContacts";
import getConversations from "@/app/action/getConversations";
import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import { LoadingComponent } from "@/components/LoadingComponent";

interface Props {
  params: {
    conversationId: string;
  };
}

const ConversationMessagesPage = async ({ params }: Props) => {
  revalidatePath("/painel-de-controle/aluno/[id]/mensagens/[conversationId]");

  const conversations = await getConversations();
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  const initialMessages = messages || [];

  if (!conversation) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full h-[calc(100vh-144px)] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
      <MessagesContacts initialConversations={conversations} conversationParams={params} userType="aluno" />

      <MessagesChatBox
        conversation={conversation}
        initialMessages={initialMessages}
        conversationParams={params}
        userType="aluno"
      />
    </div>
  );
};

export default ConversationMessagesPage;
