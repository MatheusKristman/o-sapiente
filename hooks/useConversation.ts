import { useMemo } from "react";

const useConversation = (params: { conversationId?: string } | undefined) => {
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [conversationId, isOpen]
  );
};

export default useConversation;
