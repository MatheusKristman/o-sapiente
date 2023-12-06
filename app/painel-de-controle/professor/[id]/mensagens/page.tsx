"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import MessagesEmpty from "@/components/dashboard/messages/MessagesEmpty";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";

// para componentes das mensagens que são apresentadas na tela, usar o capitulo Chat Messages component do video fullstack discord clone do code with antonio, é uma boa referencia

const MessagesPage = () => {
    const params = useParams();

    console.log(params);

    return (
        <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
            <MessagesContactsBox />

            <MessagesEmpty />
        </div>
    );
};

export default MessagesPage;
