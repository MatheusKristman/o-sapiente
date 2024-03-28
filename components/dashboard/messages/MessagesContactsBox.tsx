"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { cn } from "@/libs/utils";
import useHeaderStore from "@/stores/useHeaderStore";
import { FullConversationType } from "@/types";
import { ImageIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
    conversation: FullConversationType;
    selected: boolean;
    userType: string;
    unreadMessages: number;
}

export function MessagesContactsBox({
    conversation,
    selected,
    userType,
    unreadMessages,
}: Props) {
    const otherUser = useOtherUser(conversation);
    const { userId } = useHeaderStore();

    const lastMessage = useMemo(() => {
        const messages = conversation.messages || [];

        return messages[messages.length - 1];
    }, [conversation.messages]);

    // TODO: adicionar skeleton enquanto não tem o otherUser
    if (!otherUser) {
        return (
            <div>
                <div>carregando...</div>
            </div>
        );
    }

    return (
        <Link
            href={`/painel-de-controle/${userType}/${userId}/mensagens/${conversation.id}`}
            className={cn(
                "w-full block bg-white hover:bg-green-primary transition ease-in-out delay-150 group px-9 py-6 lg:cursor-pointer",
                {
                    "bg-green-primary": selected,
                },
            )}
        >
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex gap-5 items-center">
                    <div className="relative flex justify-center items-center w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-full overflow-hidden">
                        {otherUser.profilePhoto ? (
                            <Image
                                src={otherUser.profilePhoto}
                                alt="Perfil"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <Image
                                src="/assets/images/default-user-photo.svg"
                                alt="Perfil"
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>

                    <div
                        className={cn(
                            "flex flex-col gap-y-1 group-hover:text-white transition ease-in-out delay-150 max-w-[200px]",
                            {
                                "text-white": selected,
                            },
                        )}
                    >
                        <span className="font-semibold">{`${otherUser.firstName} ${otherUser.lastName}`}</span>

                        <span className="text-sm whitespace-nowrap truncate flex items-center gap-2">
                            {lastMessage ? (
                                lastMessage.senderId === otherUser.id ? (
                                    otherUser.firstName + ": "
                                ) : (
                                    <>Voce: </>
                                )
                            ) : null}
                            {lastMessage ? (
                                lastMessage.imageUrl ? (
                                    <div className="flex items-center gap-1 text-sm whitespace-nowrap truncate">
                                        <ImageIcon size="20px" />
                                        Enviou uma imagem
                                    </div>
                                ) : lastMessage.videoUrl ? (
                                    <div className="flex items-center gap-1 text-sm whitespace-nowrap truncate">
                                        <VideoIcon size="20px" />
                                        Enviou um vídeo
                                    </div>
                                ) : (
                                    lastMessage.content
                                )
                            ) : (
                                <>Conversa Iniciada</>
                            )}
                        </span>
                    </div>
                </div>

                {unreadMessages > 0 && (
                    <span
                        className={cn(
                            "rounded-3xl w-12 h-12 bg-green-primary text-white flex justify-center items-center font-semibold group-hover:text-green-primary group-hover:bg-white transition ease-in-out delay-150",
                            {
                                "text-green-primary bg-white": selected,
                            },
                        )}
                    >
                        {unreadMessages}
                    </span>
                )}
            </div>
        </Link>
    );
}
