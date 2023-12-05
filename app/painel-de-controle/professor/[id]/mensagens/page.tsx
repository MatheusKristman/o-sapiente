"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";

// para componentes das mensagens que são apresentadas na tela, usar o capitulo Chat Messages component do video fullstack discord clone do code with antonio, é uma boa referencia

const MessagesPage = () => {
    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
    const params = useParams();

    console.log(params);

    const router = useRouter();

    function handleNavigation() {
        setIsMessageOpen(true);
    }

    function handleBackBtn() {
        setIsMessageOpen(false);
    }

    return (
        <div className="w-full h-[calc(100vh-131px)] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
            <MessagesContactsBox
                handleNavigation={handleNavigation}
                isMessageOpen={isMessageOpen}
            />

            <MessagesChatBox isMessageOpen={isMessageOpen} handleBackBtn={handleBackBtn} />
        </div>
    );
};

export default MessagesPage;
