"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { imageModalInfo } from "@/constants/dashboard/message-br";
import { Button } from "@/components/ui/button";
import {
  messageImageModalAnimation,
  messageImageOverlayAnimation,
} from "@/constants/framer-animations/message-image-modal";

const MessagesImageModal = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  function handleCloseButton() {
    // setIsImageModalOpen(false);
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    setIsImageLoading(true);

    if (!event.target.files) {
      setIsImageLoading(false);
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      setIsImageLoading(false);
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
      setIsImageLoading(false);
      return;
    }

    toast.error("Formato da imagem é inválido");

    setIsImageLoading(false);
  }

  function handleDeleteButton() {
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    setImage(null);
    setImageUrl("");
  }

  return (
    <>
      <AnimatePresence>
        {/* TODO: adicionar estado para lidar com modal */}
        {false && (
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
                  onClick={handleCloseButton}
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
                  <label
                    htmlFor="messageImage"
                    className="bg-[#C8D6DF] rounded-2xl border-2 border-gray-primary/10 w-full p-6 flex flex-col items-center justify-center gap-y-4 mb-4 lg:cursor-pointer"
                  >
                    <div className="bg-camera bg-no-repeat bg-contain w-10 h-10 opacity-60" />
                    <span className="text-base text-gray-primary font-medium max-w-[250px] opacity-60">
                      {imageModalInfo.inputPlaceholder}
                    </span>
                  </label>
                )}

                <input
                  ref={fileInput}
                  type="file"
                  id="messageImage"
                  name="messageImage"
                  className="hidden"
                  disabled={isImageLoading}
                  onChange={(event) => handleImage(event)}
                />

                {imageUrl && image && (
                  <div className="w-full flex items-center justify-center mb-6">
                    <Button
                      onClick={handleDeleteButton}
                      className="flex items-center justify-center gap-2"
                    >
                      <Trash2 size={20} />
                      {imageModalInfo.removeBtn}
                    </Button>
                  </div>
                )}

                <Button className="w-full">{imageModalInfo.sendBtn}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessagesImageModal;
