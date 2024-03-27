"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { find } from "lodash";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { FullConversationType } from "@/types";
import useConversation from "@/hooks/useConversation";
import { MessagesContactsBox } from "./MessagesContactsBox";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { useRouter } from "next/navigation";

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

  const { isOpen, conversationId } = useConversation(conversationParams);
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
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
  }, [pusherKey, router]);

  return (
    <div
      className={cn(
        "flex-1 w-full flex flex-col bg-white lg:max-w-md lg:min-w-[448px] pt-9",
        isOpen ? "hidden lg:flex" : "flex",
      )}
    >
      <div className="px-9 w-full">
        <div className="w-full flex items-center justify-between h-[46px] bg-[#EBEFF1] rounded-lg px-5 peer">
          <input
            type="text"
            name="search"
            placeholder="Faça sua pesquisa aqui..."
            className="bg-transparent outline-none w-full"
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
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <MessagesContactsBox
              key={conversation.id}
              conversation={conversation}
              selected={conversationId === conversation.id}
              userType={userType}
            />
          ))
        ) : (
          <span>Nenhum contato</span>
        )}
      </div>

      <div className="flex px-9 pb-6 mt-auto">
        <Button className="w-full">Suporte</Button>
      </div>
    </div>
  );
};

export default MessagesContacts;
