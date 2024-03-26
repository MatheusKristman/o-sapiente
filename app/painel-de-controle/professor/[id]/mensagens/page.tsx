"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import MessagesEmpty from "@/components/dashboard/messages/MessagesEmpty";
import MessagesContacts from "@/components/dashboard/messages/MessagesContacts";

// para componentes das mensagens que são apresentadas na tela, usar o capitulo Chat Messages component do video fullstack discord clone do code with antonio, é uma boa referencia

const MessagesPage = () => {
  const params = useParams();

  return (
    <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
      <MessagesContacts />

      <MessagesEmpty />
    </div>
  );
};

export default MessagesPage;
