import { Plus, XCircleIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/useConversation";
import useConversationStore from "@/stores/useConversationStore";
import MessagesImageModal from "./MessagesImageModal";
import MessagesVideoModal from "./MessagesVideoModal";

interface Props {
  conversationParams?: { conversationId: string };
  handleFooterModal: () => void;
  mobileOpenImageModal: () => void;
  mobileOpenVideoModal: () => void;
  isModalFooterOpen: boolean;
}

const formSchema = z.object({
  message: z.string().min(1),
});

const MessagesChatForm = ({
  conversationParams,
  handleFooterModal,
  mobileOpenImageModal,
  mobileOpenVideoModal,
  isModalFooterOpen,
}: Props) => {
  const { conversationId } = useConversation(conversationParams);
  const { status } = useSession();
  const { openImageModal, openVideoModal } = useConversationStore();

  const [isSending, setIsSending] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSending(true);
    setValue("message", "", { shouldValidate: true });

    axios
      .post("/api/messages", {
        ...values,
        conversationId,
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  if (status === "loading") {
    return (
      <div>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <>
      {isModalFooterOpen && (
        <div className="absolute bottom-[calc(80px)] left-0 flex flex-col-reverse justify-start w-[233px]">
          <div className="flex flex-col gap-4 items-center h-fit bg-white shadow-lg rounded-r-lg rounded-tl-lg p-6">
            <Button
              onClick={mobileOpenImageModal}
              className="gap-2.5 w-full flex justify-start items-center"
            >
              <div className="bg-galleryIcon bg-no-repeat bg-contain w-7 h-7" />
              Enviar Imagem
            </Button>

            <Button
              onClick={mobileOpenVideoModal}
              className="gap-2.5 w-full flex justify-start items-center"
            >
              <div className="bg-videoIcon bg-no-repeat bg-contain w-7 h-7" />
              Enviar Video
            </Button>
          </div>
        </div>
      )}

      <div className="w-full flex bg-[#2C383F] mt-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-row px-6 py-4 gap-8 sm:px-16"
        >
          <div className="flex flex-row items-center justify-start gap-3.5">
            <Button
              type="button"
              onClick={handleFooterModal}
              className="flex w-12 px-0 md:hidden justify-center items-center"
            >
              {isModalFooterOpen ? <XCircleIcon /> : <Plus />}
            </Button>

            <Button
              type="button"
              onClick={openImageModal}
              className="hidden w-12 px-0 md:flex justify-center items-center"
            >
              <div className="bg-galleryIcon bg-no-repeat bg-contain w-7 h-7" />
            </Button>

            <Button
              type="button"
              onClick={openVideoModal}
              className="hidden w-12 px-0 md:flex justify-center items-center"
            >
              <div className="bg-videoIcon bg-no-repeat bg-contain w-7 h-7" />
            </Button>
          </div>

          <div className="w-full flex items-center">
            <Input
              {...register("message")}
              disabled={isSending}
              // ref={messageInputRef}
              type="text"
              name="message"
              placeholder="Digite a sua mensagem"
              className="w-full input-message"
            />
          </div>

          <Button
            disabled={isSending}
            type="submit"
            className="flex justify-center items-center gap-2.5 font-semibold"
          >
            <div className="bg-sendIcon w-7 h-7 text-white bg-no-repeat bg-contain" />
            <span className="hidden md:block">
              {isSending ? <>Enviando</> : <>Enviar</>}
            </span>
          </Button>
        </form>
      </div>

      <MessagesImageModal conversationId={conversationId} />
      <MessagesVideoModal conversationId={conversationId} />
    </>
  );
};

export default MessagesChatForm;
