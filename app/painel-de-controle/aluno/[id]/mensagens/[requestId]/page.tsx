"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import MessagesChatBox from "@/components/dashboard/messages/MessagesChatBox";
import MessagesContactsBox from "@/components/dashboard/messages/MessagesContactsBox";
import axios from "axios";
import { RequestWithUsers } from "@/types";
import MessagesImageModal from "@/components/dashboard/messages/MessagesImageModal";
import MessagesVideoModal from "@/components/dashboard/messages/MessagesVideoModal";

const DashboardPage = () => {
  // TODO: verificar se precisa do state aqui ou direto no componente
  // const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  // function handleNavigation() {
  //   setIsMessageOpen(true);
  // }

  // function handleBackBtn() {
  //   setIsMessageOpen(false);
  // }

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
    router.push(`/painel-de-controle/aluno/${params?.id}/mensagens`);
  }

  if (!request) {
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
export default DashboardPage;
