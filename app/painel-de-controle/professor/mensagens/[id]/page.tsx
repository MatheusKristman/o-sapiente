"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";

const MessagesPage = () => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  const router = useRouter();

  function handleNavigation() {
    setIsMessageOpen(true);
  }

  function handleBackBtn() {
    setIsMessageOpen(false);
  }

  return (
    <div className="w-full h-[calc(100vh-131px)] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row ">
      <MessagesContactsBox handleNavigation={handleNavigation} isMessageOpen={isMessageOpen} />

      <MessagesChatBox isMessageOpen={isMessageOpen} handleBackBtn={handleBackBtn} />
    </div>
  );
};

export default MessagesPage;
