"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

import { RetrievePaymentMessage } from "./RetrievePaymentMessage";
import { RetrievePaymentForm } from "./RetrievePaymentForm";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";
import {
    ModalAnimation,
    OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";

export function RetrievePaymentModal() {
    const {
        isModalOpen,
        closeModal,
        isForm,
        isMessage,
        setIsMessage,
        setIsForm,
    } = useRetrievePaymentModalStore();

    function handleClose() {
        closeModal();
        setIsForm(true);

        setTimeout(() => {
            setIsMessage(false);
        }, 350);
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="retrieve-payment-modal"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={OverlayAnimation}
                        className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
                    >
                        <motion.div
                            key="retrieve-payment-modal"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={ModalAnimation}
                            className="w-full max-w-[550px] min-h-[400px] bg-white shadow-lg shadow-black/25 p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
                        >
                            <div className="w-full flex flex-col">
                                <div className="w-full flex items-center justify-end">
                                    <Button
                                        variant="link"
                                        size="icon"
                                        className="text-green-primary"
                                        onClick={handleClose}
                                    >
                                        <BsXLg size={26} />
                                    </Button>
                                </div>

                                <AnimatePresence>
                                    {isForm && (
                                        <RetrievePaymentForm key="retrieve-payment-form" />
                                    )}
                                    {isMessage && (
                                        <RetrievePaymentMessage key="retrieve-payment-message" />
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
