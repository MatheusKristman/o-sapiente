import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import {
  messageImageModalAnimation,
  messageImageOverlayAnimation,
} from "@/constants/framer-animations/message-image-modal";
import { Button } from "@/components/ui/button";
import useConversationStore from "@/stores/useConversationStore";

const MessagesChatImageModal = () => {
  const { isMessageImageModalOpen, closeMessageImageModal, messageImageUrl } =
    useConversationStore();

  return (
    <AnimatePresence>
      {isMessageImageModalOpen && (
        <motion.div
          key="message-image-modal"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={messageImageOverlayAnimation}
          className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto py-24 px-12 lg:p-24 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <Button
            onClick={closeMessageImageModal}
            variant="link"
            size="icon"
            className="fixed top-10 right-10"
          >
            <X className="text-white w-10 h-10" />
          </Button>

          <motion.div
            key="message-image-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={messageImageModalAnimation}
            className="w-full h-full inline-block align-middle"
          >
            <div className="w-full h-full relative">
              <Image
                src={messageImageUrl}
                alt="Imagem"
                fill
                className="object-contain object-center"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagesChatImageModal;
