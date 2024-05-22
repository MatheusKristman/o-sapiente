"use cliente";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { find } from "lodash";
import { useSession } from "next-auth/react";

import { FullMessageType } from "@/types";
import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessagesBox from "./MessagesBox";
import MessagesChatImageModal from "./MessagesChatImageModal";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  initialMessages: FullMessageType[];
  conversationParams?: { conversationId: string };
}

const MessagesChatBody = ({ initialMessages = [], conversationParams }: Props) => {
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
        })
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
    return <SkeletonMessagesChatBody />;
  }

  return (
    <>
      <MessagesChatImageModal />

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

        <div ref={bottomRef} />
      </ScrollArea>
    </>
  );
};

const SkeletonMessagesChatBody = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="w-full flex flex-col gap-6 py-6 px-4">
        <div className="w-full flex flex-row-reverse items-center justify-start group">
          <Skeleton className="w-2/3 relative h-40 bg-[#D6E5EE] rounded-tl-lg rounded-br-lg rounded-bl-lg rounded-tr-none xl:w-2/5" />
        </div>

        <div className="w-full flex flex-row items-center justify-start group">
          <Skeleton className="w-2/3 relative h-24 bg-[#D6E5EE] rounded-tl-none rounded-br-lg rounded-bl-lg rounded-tr-lg xl:w-2/5" />
        </div>

        <div className="w-full flex flex-row items-center justify-start group">
          <Skeleton className="w-2/3 relative h-32 bg-[#D6E5EE] rounded-tl-none rounded-br-lg rounded-bl-lg rounded-tr-lg xl:w-2/5" />
        </div>

        <div className="w-full flex flex-row-reverse items-center justify-start group">
          <Skeleton className="w-2/3 relative h-52 bg-[#D6E5EE] rounded-tl-lg rounded-br-lg rounded-bl-lg rounded-tr-none xl:w-2/5" />
        </div>
      </div>
    </ScrollArea>
  );
};

export default MessagesChatBody;
