"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  messageImageModalAnimation,
  messageImageOverlayAnimation,
} from "@/constants/framer-animations/message-image-modal";
import useConversationStore from "@/stores/useConversationStore";
import { useUploadThing } from "@/libs/uploadthing";
import { fileModalInfo } from "@/constants/dashboard/message-br";

interface Props {
  conversationId: string;
}

function MessagesFileModal({ conversationId }: Props) {
  const [file, setFile] = useState<File[] | null>(null);

  const { isFileModalOpen, closeFileModal } = useConversationStore();

  const fileInput = useRef<HTMLInputElement | null>(null);

  function handleDeleteButton() {
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    setFile(null);
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing("archiveMessage", {
    onClientUploadComplete: () => {
      toast.success("Documento enviado com sucesso");
      handleDeleteButton();
      closeFileModal();
    },
    onUploadError: (error) => {
      console.error(error);
      console.error(error.data);

      if (error.data?.message === "Unable to get presigned urls") {
        toast.error("Tipo ou tamanho do documento inválido, verifique e tente novamente. (PDF - 2MB)");

        return;
      }

      toast.error("Ocorreu um erro ao enviar o documento, verifique e tente novamente");
    },
  });

  const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <AnimatePresence>
        {isFileModalOpen && (
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
                  onClick={closeFileModal}
                >
                  <BsXLg size={26} />
                </Button>
              </div>

              <div className="w-full flex flex-col items-start">
                <h4 className="text-2xl text-gray-primary font-semibold mb-6 lg:text-3xl">{fileModalInfo.title}</h4>

                {file ? (
                  <div className="bg-[#F0F5F8] p-6 w-full h-[250px] max-w-[250px] flex flex-col items-center justify-center gap-2 rounded-lg relative overflow-hidden shadow-md shadow-[rgba(0,0,0,0.25)] mx-auto mb-4">
                    <div className="bg-documentIcon bg-no-repeat bg-contain w-10 h-10 opacity-60" />
                    <span className="text-sm text-gray-primary text-center">{file[0].name}</span>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className="bg-[#F0F5F8] rounded-2xl border-2 border-gray-primary/10 w-full p-6 flex flex-col items-center justify-center gap-y-4 mb-4 lg:cursor-pointer"
                  >
                    <input {...getInputProps()} />

                    <div className="bg-documentIcon bg-no-repeat bg-contain w-10 h-10 opacity-60" />
                    <span className="text-base text-gray-primary font-medium max-w-[250px] opacity-60">
                      {fileModalInfo.inputPlaceholder}
                    </span>
                    <span className="text-sm text-gray-primary/60 font-medium">{fileModalInfo.inputAdviser}</span>
                  </div>
                )}

                {file && (
                  <div className="w-full flex items-center justify-center mb-6">
                    <Button
                      disabled={!file || isUploading}
                      onClick={handleDeleteButton}
                      className="flex items-center justify-center gap-2"
                    >
                      <Trash2 size={20} />
                      {fileModalInfo.removeBtn}
                    </Button>
                  </div>
                )}

                <Button
                  className="w-full flex items-center gap-2"
                  disabled={!file || isUploading}
                  onClick={() => startUpload(file!, { conversationId })}
                >
                  {isUploading ? (
                    <>
                      <Loader2 color="#fff" className="w-6 h-6 animate-spin" />
                      {fileModalInfo.sendingBtn}
                    </>
                  ) : (
                    <>{fileModalInfo.sendBtn}</>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MessagesFileModal;
