"use client";

import { Plus, XCircleIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import MessagesChatBody from "./MessagesChatBody";
import { Conversation as ConversationType, User } from "@prisma/client";
import { FullMessageType } from "@/types";
import MessagesChatHeader from "./MessagesChatHeader";
import MessagesChatForm from "./MessagesChatForm";
import MessagesImageModal from "./MessagesImageModal";
import MessagesVideoModal from "./MessagesVideoModal";

interface Props {
  conversation: ConversationType & {
    users: User[];
  };
  initialMessages: FullMessageType[];
  conversationParams?: { conversationId: string };
}

const MessagesChatBox = ({
  conversation,
  initialMessages,
  conversationParams,
}: Props) => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  const [isModalNavOpen, setIsModalNavOpen] = useState<boolean>(false);
  const [isModalFooterOpen, setIsModalFooterOpen] = useState<boolean>(false);

  const session = useSession();
  const params = useParams();
  const router = useRouter();
  const messageInputRef = useRef<HTMLInputElement | null>(null);

  function handleBackBtn() {
    router.push(`/painel-de-controle/aluno/${params?.id}/mensagens`);
  }

  useEffect(() => {
    if (params?.requestId) {
      setIsMessageOpen(true);
    }

    return () => {
      setIsMessageOpen(false);
    };
  }, [params?.requestId]);

  const toggleModalNav = () => {
    setIsModalNavOpen(!isModalNavOpen);
  };

  const toggleModalFooter = () => {
    setIsModalFooterOpen(!isModalFooterOpen);
  };

  // const handleImageModalOpen = () => {
  //   setIsModalFooterOpen(false);
  //   setIsImageModalOpen(true);
  // };
  //
  // const handleVideoModalOpen = () => {
  //   setIsModalFooterOpen(false);
  //   setIsVideoModalOpen(true);
  // };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsModalNavOpen(false);
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
          "flex-1 flex flex-col lg:w-full lg:h-full lg:flex",
          isMessageOpen ? "flex" : "hidden lg:flex",
        )}
      >
        <MessagesChatHeader conversation={conversation} />

        <MessagesChatBody
          initialMessages={initialMessages}
          conversationParams={conversationParams}
        />

        <MessagesChatForm conversationParams={conversationParams} />
      </div>

      <MessagesImageModal />
      <MessagesVideoModal />
    </>
  );
};

export default MessagesChatBox;
