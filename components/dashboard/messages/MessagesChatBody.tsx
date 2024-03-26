"use cliente";

import { useEffect, useRef, useState } from "react";

import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import axios from "axios";
import { find } from "lodash";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessagesBox from "./MessagesBox";

interface Props {
  initialMessages: FullMessageType[];
  conversationParams?: { conversationId: string };
}

const MessagesChatBody = ({ initialMessages, conversationParams }: Props) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);

  const { data: session, status } = useSession();
  const { conversationId } = useConversation(conversationParams);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        }),
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ block: "end" });
  }, [messages, status]);

  if (status === "loading") {
    return (
      <div>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="w-full flex flex-col gap-6 py-6 px-4">
        {messages.map((message, index) => (
          <MessagesBox
            key={message.id}
            isLast={index === messages.length - 1}
            message={message}
            otherMessage={session?.user?.email !== message.sender.email}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessagesChatBody;
