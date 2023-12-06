"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesImageModal from "@/components/dashboard/messages/MessagesImageModal";
import MessagesVideoModal from "@/components/dashboard/messages/MessagesVideoModal";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";

// para componentes das mensagens que são apresentadas na tela, usar o capitulo Chat Messages component do video fullstack discord clone do code with antonio, é uma boa referencia

const MessagesPage = () => {
    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(true);
    const params = useParams();
    const router = useRouter();

    function handleNavigation() {
        setIsMessageOpen(true);
    }

    function handleBackBtn() {
        setIsMessageOpen(false);
    }

    return (
        <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
            <MessagesContactsBox
                handleNavigation={handleNavigation}
                isMessageOpen={isMessageOpen}
            />

            <MessagesChatBox
                isMessageOpen={isMessageOpen}
                handleBackBtn={handleBackBtn}
                requestId={params?.requestId as string}
                setIsImageModalOpen={setIsImageModalOpen}
                setIsVideoModalOpen={setIsVideoModalOpen}
            />
            <MessagesImageModal
                isImageModalOpen={isImageModalOpen}
                setIsImageModalOpen={setIsImageModalOpen}
            />
            <MessagesVideoModal
                isVideoModalOpen={isVideoModalOpen}
                setIsVideoModalOpen={setIsVideoModalOpen}
            />
        </div>
    );
};

export default MessagesPage;
