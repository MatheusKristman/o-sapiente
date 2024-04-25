"use client";

import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { find } from "lodash";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { FullConversationType } from "@/types";
import useConversation from "@/hooks/useConversation";
import { MessagesContactsBox } from "./MessagesContactsBox";
import { pusherClient } from "@/libs/pusher";
import useUserStore from "@/stores/useUserStore";
import { Input } from "@/components/ui/input";

interface Props {
    initialConversations: FullConversationType[];
    conversationParams?: { conversationId: string };
    userType: "aluno" | "professor";
}

const MessagesContacts = ({
    initialConversations,
    conversationParams,
    userType,
}: Props) => {
    const [conversations, setConversations] =
        useState<FullConversationType[]>(initialConversations);
    const [filteredConversations, setFilteredConversations] = useState<
        FullConversationType[]
    >([]);
    const [unreadMessages, setUnreadMessages] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");

    const { isOpen, conversationId } = useConversation(conversationParams);
    const { userId } = useUserStore();
    const { data: session } = useSession();
    const router = useRouter();

    const pusherKey = useMemo(() => {
        return session?.user?.email;
    }, [session?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType) => {
            setConversations((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current];
            });
        };

        const updateHandler = (conversation: FullConversationType) => {
            setConversations((current) =>
                current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.messages,
                        };
                    }

                    return currentConversation;
                }),
            );

            const messages = conversation.messages || [];

            setUnreadMessages(
                messages.filter((message) => !message.seenIds.includes(userId))
                    .length,
            );
        };

        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:update", updateHandler);
    }, [pusherKey, router, userId]);

    useEffect(() => {
        if (searchValue.length > 2) {
            setFilteredConversations(
                conversations.filter(
                    (conversation) =>
                        conversation.users[0].firstName
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(
                                searchValue
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase(),
                            ) ||
                        conversation.users[0].lastName
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(
                                searchValue
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase(),
                            ) ||
                        conversation.users[1].firstName
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(
                                searchValue
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase(),
                            ) ||
                        conversation.users[1].lastName
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(
                                searchValue
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase(),
                            ),
                ),
            );
        }
    }, [searchValue, conversations]);

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    return (
        <div
            className={cn(
                "flex-1 w-full flex flex-col bg-white lg:max-w-md lg:min-w-[448px] pt-9",
                isOpen ? "hidden lg:flex" : "flex",
            )}
        >
            <div className="px-9 w-full">
                <div className="w-full flex items-center justify-between input focus-within:ring-2 focus-within:ring-[#9DA5AA]">
                    <Input
                        value={searchValue}
                        onChange={handleSearch}
                        type="text"
                        name="search"
                        placeholder="Faça sua pesquisa aqui..."
                        className="bg-transparent outline-none w-full "
                    />

                    <Search
                        className="h-6 w-6 min-h-[24px] min-w-[24px]"
                        style={{
                            color: "#9DA5AA",
                        }}
                    />
                </div>
            </div>

            <div className="w-full h-56 scrollbar scrollbar-thumb-slate-100 mt-9">
                {searchValue.length > 2 ? (
                    filteredConversations.length > 0 ? (
                        filteredConversations.map((conversation) => (
                            <MessagesContactsBox
                                key={conversation.id}
                                conversation={conversation}
                                selected={conversationId === conversation.id}
                                userType={userType}
                                unreadMessages={unreadMessages}
                            />
                        ))
                    ) : (
                        <span className="mx-auto block text-lg font-medium text-center text-gray-primary/50">
                            Nenhum contato encontrado
                        </span>
                    )
                ) : conversations.length > 0 ? (
                    conversations.map((conversation) => (
                        <MessagesContactsBox
                            key={conversation.id}
                            conversation={conversation}
                            selected={conversationId === conversation.id}
                            userType={userType}
                            unreadMessages={unreadMessages}
                        />
                    ))
                ) : (
                    <span className="mx-auto block text-lg font-medium text-center text-gray-primary/50">
                        Nenhum contato
                    </span>
                )}
            </div>

            <div className="flex px-9 pb-6 mt-auto">
                <Button className="w-full">Suporte</Button>
            </div>
        </div>
    );
};

export default MessagesContacts;
