"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesImageModal from "@/components/dashboard/messages/MessagesImageModal";
import MessagesVideoModal from "@/components/dashboard/messages/MessagesVideoModal";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";
import { RequestWithUsers } from "@/types";
import ActiveStatus from "@/components/ActiveStatus";

// para componentes das mensagens que são apresentadas na tela, usar o capitulo Chat Messages component do video fullstack discord clone do code with antonio, é uma boa referencia

const MessagesPage = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [request, setRequest] = useState<RequestWithUsers | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.requestId) {
      axios
        .get(`/api/request/get-requests/${params?.requestId}`)
        .then((res) => {
          setRequest(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params?.requestId]);

  function handleBackBtn() {
    router.push(`/painel-de-controle/professor/${params?.id}/mensagens`);
  }

  if (!request) {
    // TODO depois inserir um loading
    return (
      <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row"></div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-131px)] min-h-[500px] mx-auto flex flex-col lg:h-[calc(100vh-147px)] lg:flex-row">
      <MessagesContactsBox />

      <ActiveStatus />
      <MessagesChatBox
        handleBackBtn={handleBackBtn}
        requestId={params?.requestId as string}
        request={request}
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
