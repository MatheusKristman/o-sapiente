"use client";

import { useEffect, useState } from "react";

import { cn } from "@/libs/utils";
import MessagesChatBody from "./MessagesChatBody";
import { Conversation as ConversationType, User } from "@prisma/client";
import { FullMessageType } from "@/types";
import MessagesChatHeader from "./MessagesChatHeader";
import MessagesChatForm from "./MessagesChatForm";
import useConversation from "@/hooks/useConversation";
import useConversationStore from "@/stores/useConversationStore";

interface Props {
  conversation: ConversationType & {
    users: User[];
  };
  initialMessages: FullMessageType[];
  conversationParams?: { conversationId: string };
  userType: "aluno" | "professor";
}

const MessagesChatBox = ({
  conversation,
  initialMessages,
  conversationParams,
  userType,
}: Props) => {
  const { isOpen } = useConversation(conversationParams);
  const { openImageModal, openVideoModal } = useConversationStore();

  const [isModalFooterOpen, setIsModalFooterOpen] = useState<boolean>(false);

  function handleFooterModal() {
    setIsModalFooterOpen((prev: boolean) => !prev);
  }

  function mobileOpenImageModal() {
    setIsModalFooterOpen(false);
    openImageModal();
  }

  function mobileOpenVideoModal() {
    setIsModalFooterOpen(false);
    openVideoModal();
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsModalFooterOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "relative flex-1 flex flex-col h-full lg:w-full lg:h-full lg:flex",
          isOpen ? "flex" : "hidden lg:flex",
        )}
      >
        <MessagesChatHeader conversation={conversation} userType={userType} />

        <MessagesChatBody
          initialMessages={initialMessages}
          conversationParams={conversationParams}
        />

        <MessagesChatForm
          conversationParams={conversationParams}
          handleFooterModal={handleFooterModal}
          mobileOpenImageModal={mobileOpenImageModal}
          mobileOpenVideoModal={mobileOpenVideoModal}
          isModalFooterOpen={isModalFooterOpen}
        />
      </div>
    </>
  );
};

export default MessagesChatBox;
