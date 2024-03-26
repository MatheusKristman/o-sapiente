import MessagesEmpty from "@/components/dashboard/messages/MessagesEmpty";
import MessagesContacts from "@/components/dashboard/messages/MessagesContacts";
import getConversations from "@/app/action/getConversations";

// para componentes das mensagens que são apresentadas na tela, usar o capitulo Chat Messages component do video fullstack discord clone do code with antonio, é uma boa referencia

const MessagesPage = async () => {
  const conversations = await getConversations();

  return (
    <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
      <MessagesContacts initialConversations={conversations} userType="aluno" />

      <MessagesEmpty />
    </div>
  );
};

export default MessagesPage;
