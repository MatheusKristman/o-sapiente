import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";
import MessagesImageModal from "@/components/dashboard/messages/MessagesImageModal";
import MessagesVideoModal from "@/components/dashboard/messages/MessagesVideoModal";
import getConversations from "@/app/action/getConversations";

const DashboardPage = async () => {
  // TODO: verificar se precisa do state aqui ou direto no componente
  // const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  const conversations = await getConversations();

  if (!conversations) {
    // TODO depois inserir um loading
    return (
      <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row"></div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-131px)] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
      {/* <MessagesContactsBox handleNavigation={handleNavigation} isMessageOpen={isMessageOpen} /> */}
      <MessagesContactsBox />

      {/* <MessagesChatBox isMessageOpen={isMessageOpen} handleBackBtn={handleBackBtn} /> */}
      <MessagesChatBox
        // requestId={params?.requestId as string}
        requestId=""
      />
      <MessagesImageModal />
      <MessagesVideoModal />
    </div>
  );
};
export default DashboardPage;
