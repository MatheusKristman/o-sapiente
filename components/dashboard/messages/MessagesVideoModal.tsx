"use client";

import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState, useRef } from "react";
import Video from "next-video";

import { videoModalInfo } from "@/constants/dashboard/message-br";
import {
  messageVideoModalAnimation,
  messageVideoOverlayAnimation,
} from "@/constants/framer-animations/message-video-modal";
import Button from "@/components/Button";

interface MessagesVideoModalProps {
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MessagesVideoModal = ({
  isVideoModalOpen,
  setIsVideoModalOpen,
}: MessagesVideoModalProps) => {
  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  function handleCloseButton() {
    setIsVideoModalOpen(false);
  }

  function handleVideo(event: React.ChangeEvent<HTMLInputElement>) {
    setIsVideoLoading(true);

    if (!event.target.files) {
      setIsVideoLoading(false);
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      setIsVideoLoading(false);
      return;
    }

    const maxSizeInBytes = 10 * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      toast.error("Tamanho do arquivo excede o limite permitido (10MB )");
      setIsVideoLoading(false);
      return;
    }

    if (file && file.type.startsWith("video/")) {
      setVideoUrl(URL.createObjectURL(file));
      setVideo(file);
      setIsVideoLoading(false);
      return;
    }

    toast.error("Formado do video é inválido");

    setIsVideoLoading(false);
  }

  function handleDeleteButton() {
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    setVideo(null);
    setVideoUrl("");
  }

  return (
    <>
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={messageVideoOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={messageVideoModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle"
            >
              <div className="w-full flex items-center justify-end mb-4">
                <button
                  type="button"
                  className="text-green-primary"
                  onClick={handleCloseButton}
                >
                  <BsXLg size={26} />
                </button>
              </div>

              <div className="w-full flex flex-col items-start">
                <h4 className="text-2xl text-gray-primary font-semibold mb-6 lg:text-3xl">
                  {videoModalInfo.title}
                </h4>

                {videoUrl && video ? (
                  <div className="w-full aspect-video rounded-lg relative overflow-hidden shadow-md shadow-[rgba(0,0,0,0.25)] mx-auto mb-4">
                    <Video src={videoUrl} />
                  </div>
                ) : (
                  <label
                    htmlFor="messageVideo"
                    className="bg-[#C8D6DF] rounded-2xl border-2 border-dashed border-gray-primary/50 w-full p-6 flex flex-col items-center justify-center gap-y-4 mb-4 lg:cursor-pointer"
                  >
                    <div className="bg-videoFile bg-no-repeat bg-contain w-10 h-10 opacity-60" />
                    <span className="text-base text-gray-primary font-medium max-w-[240px] opacity-60">
                      {videoModalInfo.inputPlaceholder}
                    </span>
                  </label>
                )}

                <input
                  ref={fileInput}
                  type="file"
                  id="messageVideo"
                  name="messageVideo"
                  className="hidden"
                  disabled={isVideoLoading}
                  onChange={(event) => handleVideo(event)}
                />

                {videoUrl && video && (
                  <div className="w-full flex items-center justify-center mb-6">
                    <Button
                      onClick={handleDeleteButton}
                      label={videoModalInfo.removeBtn}
                      icon={<Trash2 size={20} />}
                      primary
                    />
                  </div>
                )}

                <Button label={videoModalInfo.sendBtn} fullWidth primary />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessagesVideoModal;
