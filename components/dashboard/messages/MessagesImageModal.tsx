"use client";

import { Trash2 } from "lucide-react";
import { BsXLg } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { imageModalInfo } from "@/constants/dashboard/message-br";
import Button from "@/components/Button";
import { messageImageModalAnimation, messageImageOverlayAnimation } from "@/constants/framer-animations/message-image-modal";

interface MessagesImageModalProps {
    isImageModalOpen: boolean;
    setIsImageModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MessagesImageModal = ({ isImageModalOpen, setIsImageModalOpen }: MessagesImageModalProps) => {
    function handleCloseButton() {
        setIsImageModalOpen(false);
    }

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
                            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle">
                            <div className="w-full flex items-center justify-end mb-4">
                                <button type="button" className="text-green-primary" onClick={handleCloseButton}>
                                    <BsXLg size={26} />
                                </button>
                            </div>
                            <div className="w-full flex flex-col items-start">
                                <h4 className="text-2xl text-gray-primary font-semibold mb-6 lg:text-3xl">{imageModalInfo.title}</h4>

                                <label htmlFor="messageImage" className="bg-[#C8D6DF] rounded-2xl w-full p-6 flex flex-col items-center justify-center gap-y-4 mb-4 lg:cursor-pointer">
                                    <div className="bg-camera bg-no-repeat bg-contain w-10 h-10" />
                                    <span className="text-base text-gray-primary font-medium max-w-[250px]">{imageModalInfo.inputPlaceholder}</span>
                                </label>

                                <input
                                    type="file"
                                    id="messageImage"
                                    name="messageImage"
                                    className="hidden"
                                // disabled={isSendingImage}
                                // onChange={(event) => handleImage(event)}
                                />

                                <div className="w-full flex items-center justify-center mb-6">
                                    <Button label={imageModalInfo.removeBtn} icon={<Trash2 size={20} />} primary />
                                </div>

                                <Button label={imageModalInfo.sendBtn} fullWidth primary />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default MessagesImageModal;
