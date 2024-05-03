"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { imageModalInfo } from "@/constants/dashboard/message-br";
import { Button } from "@/components/ui/button";
import {
  messageImageModalAnimation,
  messageImageOverlayAnimation,
} from "@/constants/framer-animations/message-image-modal";
import useConversationStore from "@/stores/useConversationStore";
import { useUploadThing } from "@/libs/uploadthing";
import axios from "axios";

interface Props {
  conversationId: string;
}

const MessagesImageModal = ({ conversationId }: Props) => {
  const [image, setImage] = useState<File[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const { isImageModalOpen, closeImageModal } = useConversationStore();

  const fileInput = useRef<HTMLInputElement | null>(null);

  function handleDeleteButton() {
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    setImage(null);
    setImageUrl("");
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles);
    setImageUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageMessage",
    {
      onClientUploadComplete: (res) => {
        toast.success("Imagem enviada com sucesso");
        handleDeleteButton();
        closeImageModal();
      },
      onUploadError: () => {
        toast.error("Ocorreu um erro no envio da imagem");
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={messageImageOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={messageImageModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle"
            >
              <div className="w-full flex items-center justify-end mb-4">
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  className="text-green-primary"
                  onClick={closeImageModal}
                >
                  <BsXLg size={26} />
                </Button>
              </div>

              <div className="w-full flex flex-col items-start">
                <h4 className="text-2xl text-gray-primary font-semibold mb-6 lg:text-3xl">
                  {imageModalInfo.title}
                </h4>

                {imageUrl && image ? (
                  <div className="w-full h-[250px] max-w-[250px] rounded-lg relative overflow-hidden shadow-md shadow-[rgba(0,0,0,0.25)] mx-auto mb-4">
                    <Image
                      src={imageUrl}
                      alt="Imagem"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className="bg-[#F0F5F8] rounded-2xl border-2 border-gray-primary/10 w-full p-6 flex flex-col items-center justify-center gap-y-4 mb-4 lg:cursor-pointer"
                  >
                    <input {...getInputProps()} />

                    <div className="bg-camera bg-no-repeat bg-contain w-10 h-10 opacity-60" />
                    <span className="text-base text-gray-primary font-medium max-w-[250px] opacity-60">
                      {imageModalInfo.inputPlaceholder}
                    </span>
                    <span className="text-sm text-gray-primary/60 font-medium">
                      {imageModalInfo.inputAdviser}
                    </span>
                  </div>
                )}

                {imageUrl && image && (
                  <div className="w-full flex items-center justify-center mb-6">
                    <Button
                      disabled={
                        !image || !imageUrl || isImageLoading || isUploading
                      }
                      onClick={handleDeleteButton}
                      className="flex items-center justify-center gap-2"
                    >
                      <Trash2 size={20} />
                      {imageModalInfo.removeBtn}
                    </Button>
                  </div>
                )}

                <Button
                  className="w-full flex items-center gap-2"
                  disabled={
                    !image || !imageUrl || isImageLoading || isUploading
                  }
                  onClick={() => startUpload(image!, { conversationId })}
                >
                  {isImageLoading || isUploading ? (
                    <>
                      {imageModalInfo.sendingBtn}
                      <Loader2 color="#fff" className="w-6 h-6 animate-spin" />
                    </>
                  ) : (
                    <>{imageModalInfo.sendBtn}</>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessagesImageModal;
