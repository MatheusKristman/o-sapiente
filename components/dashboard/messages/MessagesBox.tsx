import { cn } from "@/libs/utils";
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  otherMessage?: boolean;
  message: FullMessageType;
  isLast?: boolean;
}

const MessagesBox = ({ otherMessage, message, isLast }: Props) => {
  const { data: session } = useSession();

  // TODO talvez entre
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState<string>(message.content);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const isOwn = session?.user?.email === message.sender.email;
  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.firstName + " " + user.lastName)
    .join(", ");

  function handleEditing() {
    setIsEditing(true);
    setIsPopoverOpen(false);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setIsPopoverOpen(false);
  }

  function handleMessageChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedMessage(e.target.value);
  }

  function handleCloseImageModal() {
    setImageModalOpen(false);
  }

  function handleOpenImageModal() {
    setImageModalOpen(true);
  }

  function submitEdit(message: FullMessageType) {
    if (editedMessage.length === 0) {
      toast.error("Mensagem não pode ser enviada vazia");
      return;
    }

    // TODO: criar função de envio para edição
    // axios
    //   .put("/api/messages/edit", { message, editedMessage })
    //   .then((res) => {
    //     toast.success(res.data);

    //     setIsEditing(false);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data);

    //     console.error(error);
    //   });
  }

  function handlePopover(open: boolean) {
    setIsPopoverOpen(open);
  }

  return (
    <div
      className={cn(
        "w-full flex flex-row-reverse items-center justify-start group",
        { "flex-row": otherMessage }
      )}
    >
      {message.fileUrl ? (
        <div className="w-2/3 relative pb-2 xl:w-2/3 cursor-pointer">
          <div
            className={cn(
              "relative w-full aspect-square rounded-tl-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden",
              {
                "rounded-tl-none rounded-tr-3xl": otherMessage,
              }
            )}
          >
            <Image
              src={message.fileUrl}
              alt="Mensagem"
              fill
              className="object-cover object-center transition-all duration-500 hover:scale-125"
            />
          </div>

          <span className="text-white/50 text-[10px]">
            {format(new Date(message.createdAt), "p")}
          </span>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "w-2/3 px-6 relative pt-6 pb-2 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl bg-[#C8D6DF] xl:w-2/5",
              {
                "bg-green-primary rounded-tl-none rounded-tr-3xl": otherMessage,
              }
            )}
          >
            {isEditing ? (
              <div></div>
            ) : (
              <p
                className={cn("text-white text-base", {
                  "text-gray-primary": otherMessage,
                })}
              >
                {message.content}
              </p>
            )}

            <span className="text-white/50 text-[10px]">
              {format(new Date(message.createdAt), "p")}
            </span>
          </div>

          {/* TODO: verificar e personalizar */}
          {!otherMessage ? (
            <Popover open={isPopoverOpen} onOpenChange={handlePopover}>
              <PopoverTrigger className="mr-6 transition-opacity opacity-0 group-hover:opacity-100">
                <MoreHorizontal color="#FFFFFF" />
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="bg-[#212A35] border-none rounded-xl rounded-tr-none space-y-6"
              >
                {isEditing ? (
                  <Button
                    variant="destructive"
                    onClick={handleCancelEditing}
                    className="w-full text-base font-semibold"
                  >
                    Cancelar Edição de mensagem
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleEditing}
                      className="w-full text-base font-semibold"
                    >
                      Editar mensagem
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full text-base font-semibold"
                    >
                      Apagar mensagem
                    </Button>
                  </>
                )}
              </PopoverContent>
            </Popover>
          ) : null}
        </>
      )}
    </div>
  );
};

export default MessagesBox;
