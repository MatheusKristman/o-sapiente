import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Check, MoreHorizontal, X } from "lucide-react";
import ReactPlayer from "react-player";

import { cn } from "@/libs/utils";
import { FullMessageType } from "@/types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useConversationStore from "@/stores/useConversationStore";

interface Props {
    otherMessage?: boolean;
    message: FullMessageType;
    isLast?: boolean;
}

const MessagesBox = ({ otherMessage, message, isLast }: Props) => {
    const { data: session } = useSession();

    // TODO talvez entre
    const [editedMessage, setEditedMessage] = useState<string>(message.content);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const isOwn = session?.user?.email === message.sender.email;
    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.firstName + " " + user.lastName)
        .join(", ");
    const { openMessageImageModal, setMessageImageUrl } =
        useConversationStore();

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

    // TODO: adicionar loading no delete
    function handleDelete() {
        axios
            .put("/api/messages/delete", {
                messageId: message.id,
            })
            .then((res) => {
                toast.success(res.data);

                setIsPopoverOpen(false);
            })
            .catch((error) => {
                toast.error(error.response.data);

                console.error(error);
            });
    }

    function handleOpenImage(imageUrl: string) {
        setMessageImageUrl(imageUrl);
        openMessageImageModal();
    }

    function submitEdit() {
        if (editedMessage.length === 0) {
            toast.error("Mensagem não pode ser enviada vazia");
            return;
        }

        // TODO: criar função de envio para edição
        axios
            .put("/api/messages/edit", { message, editedMessage })
            .then((res) => {
                toast.success(res.data);

                setIsEditing(false);
            })
            .catch((error) => {
                toast.error(error.response.data);

                console.error(error);
            });
    }

    function handlePopover(open: boolean) {
        setIsPopoverOpen(open);
    }

    return (
        <div
            className={cn(
                "w-full flex flex-row-reverse items-center justify-start group",
                { "flex-row": otherMessage },
            )}
        >
            {message.videoUrl && !message.isDeleted ? (
                <div className="w-2/3 relative pb-2 xl:w-2/5 cursor-pointer">
                    <div
                        className={cn(
                            "relative w-full aspect-video rounded-tl-lg rounded-br-lg rounded-bl-lg overflow-hidden",
                            {
                                "rounded-tl-none rounded-tr-lg": otherMessage,
                            },
                        )}
                    >
                        <ReactPlayer
                            url={message.videoUrl}
                            width="100%"
                            height="100%"
                            volume={0.5}
                            controls
                        />
                    </div>

                    <span className="text-gray-primary font-medium text-[10px]">
                        {format(new Date(message.createdAt), "p")}
                    </span>
                </div>
            ) : message.imageUrl && !message.isDeleted ? (
                <div className="w-2/3 relative pb-2 xl:w-2/5 cursor-pointer">
                    <div
                        role="button"
                        onClick={() => handleOpenImage(message.imageUrl!)}
                        className={cn(
                            "relative w-full aspect-square rounded-tl-lg rounded-br-lg rounded-bl-lg overflow-hidden",
                            {
                                "rounded-tl-none rounded-tr-lg": otherMessage,
                            },
                        )}
                    >
                        <Image
                            src={message.imageUrl}
                            alt="Mensagem"
                            fill
                            className="object-cover object-center transition-all duration-500 hover:scale-125"
                        />
                    </div>

                    <span className="text-gray-primary font-medium text-[10px]">
                        {format(new Date(message.createdAt), "p")}
                    </span>
                </div>
            ) : (
                <>
                    <div
                        className={cn(
                            "w-2/3 px-6 relative pt-6 pb-2 rounded-tl-lg rounded-br-lg rounded-bl-lg bg-green-primary xl:w-2/5",
                            {
                                "bg-[#C8D6DF] rounded-tl-none rounded-tr-lg":
                                    otherMessage,
                                "pointer-events-none select-none":
                                    message.isDeleted,
                            },
                        )}
                    >
                        {isEditing ? (
                            <div className="w-full flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                                <input
                                    type="text"
                                    value={editedMessage}
                                    onChange={handleMessageChange}
                                    className="w-full text-base text-white bg-transparent block outline-none lg:w-1/2"
                                />

                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        onClick={handleCancelEditing}
                                        variant="link"
                                        className="bg-white px-2 w-10 h-10 rounded-full flex items-center justify-center"
                                    >
                                        <X color="#03C988" size="20" />
                                    </Button>

                                    <Button
                                        onClick={submitEdit}
                                        variant="link"
                                        className="bg-white px-2 w-10 h-10 rounded-full flex items-center justify-center"
                                    >
                                        <Check color="#03C988" size="20" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p
                                className={cn("text-white text-base", {
                                    "text-gray-primary": otherMessage,
                                    "text-opacity-80": message.isDeleted,
                                })}
                            >
                                {message.content}
                            </p>
                        )}

                        <span
                            className={cn(
                                "text-white font-medium text-[10px]",
                                {
                                    "text-gray-primary/90": otherMessage,
                                },
                            )}
                        >
                            {format(new Date(message.createdAt), "p")}
                        </span>
                    </div>
                </>
            )}

            {!otherMessage && !message.isDeleted ? (
                <Popover open={isPopoverOpen} onOpenChange={handlePopover}>
                    <PopoverTrigger className="mr-6 transition-opacity opacity-0 group-hover:opacity-100">
                        <MoreHorizontal color="#03C988" />
                    </PopoverTrigger>

                    <PopoverContent
                        align="end"
                        className="bg-white border-none rounded-xl rounded-tr-none space-y-6"
                    >
                        {isEditing ? (
                            <Button
                                variant="destructive"
                                onClick={handleCancelEditing}
                                className="w-full text-sm font-semibold"
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
                                    onClick={handleDelete}
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
        </div>
    );
};

export default MessagesBox;
