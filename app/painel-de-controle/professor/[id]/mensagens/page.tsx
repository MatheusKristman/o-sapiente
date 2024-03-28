import MessagesEmpty from "@/components/dashboard/messages/MessagesEmpty";
import MessagesContacts from "@/components/dashboard/messages/MessagesContacts";
import getConversations from "@/app/action/getConversations";

export const dynamic = "force-dynamic";

const MessagesPage = async () => {
    const conversations = await getConversations();

    return (
        <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
            <MessagesContacts
                initialConversations={conversations}
                userType="professor"
            />

            <MessagesEmpty />
        </div>
    );
};

export default MessagesPage;
