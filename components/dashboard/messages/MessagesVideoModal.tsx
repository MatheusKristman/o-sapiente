"use client";

import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

import { videoModalInfo } from "@/constants/dashboard/message-br";
import { messageVideoModalAnimation, messageVideoOverlayAnimation } from "@/constants/framer-animations/message-video-modal";

interface MessagesVideoModalProps {
    isVideoModalOpen: boolean;
    setIsVideoModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MessagesVideoModal = ({ isVideoModalOpen, setIsVideoModalOpen }: MessagesVideoModalProps) => {
    function handleCloseButton() {
        setIsVideoModalOpen(false);
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
                                <button type="button" className="text-green-primary" onClick={handleCloseButton}>
                                    <BsXLg size={26} />
                                </button>
                            </div>

                            <div className="w-full flex flex-col items-start">
                                <h4 className="text-2xl text-gray-primary font-semibold mb-6 lg:text-3xl">
                                    {videoModalInfo.title}
                                </h4>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MessagesVideoModal;
