"use client";

import { BsXLg } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
    ModalAnimation,
    OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { info } from "@/constants/offer/paymentMethodModal-br";
import useOfferViaLinkStore from "@/stores/useOfferViaLinkStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import toast from "react-hot-toast";

interface Props {
    offerId: string;
    otherUserId: string;
    requestId: string;
    currentUserId: string;
}

export function PaymentMethodModal({
    offerId,
    otherUserId,
    requestId,
    currentUserId,
}: Props) {
    const [isPlatformSelected, setIsPlatformSelected] = useState<boolean>(true);
    const [isAgreedSelected, setIsAgreedSelected] = useState<boolean>(false);

    const { isModalOpen, closeModal } = useOfferViaLinkStore();
    const router = useRouter();

    function selectPlatform() {
        if (!isPlatformSelected) {
            setIsPlatformSelected(true);
            setIsAgreedSelected(false);
        }
    }

    function selectAgreed() {
        if (!isAgreedSelected) {
            setIsPlatformSelected(false);
            setIsAgreedSelected(true);
        }
    }

    function handlePayment() {
        if (isPlatformSelected) {
            router.push(`/pagamento-da-aula/${offerId}`);
        }

        if (isAgreedSelected) {
            axios
                .post("/api/conversations", { otherUserId, requestId })
                .then(() =>
                    router.replace(
                        `${menuItems[0].studentHref}${currentUserId}${menuItems[0].pageHref}`,
                    ),
                )
                .catch((error) => {
                    console.error(error);
                    toast.error(
                        "Ocorreu um erro ao aceitar a proposta, tente novamente mais tarde!",
                    );
                });

            return;
        }
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="payment-method-modal"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={OverlayAnimation}
                        className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
                    >
                        <motion.div
                            key="payment-method-modal"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={ModalAnimation}
                            className="w-full max-w-[650px] bg-white shadow-lg shadow-black/25 p-9 rounded-2xl inline-block align-middle"
                        >
                            <div className="w-full flex flex-col">
                                <div className="w-full flex items-center justify-end">
                                    <Button
                                        variant="link"
                                        size="icon"
                                        className="text-green-primary"
                                        onClick={closeModal}
                                    >
                                        <BsXLg size={26} />
                                    </Button>
                                </div>

                                <div className="w-full flex flex-col gap-4 mb-9">
                                    <h1 className="text-2xl sm:text-3xl text-gray-primary font-semibold text-left">
                                        {info.title}
                                    </h1>

                                    <p className="text-base text-left text-gray-primary">
                                        {info.desc}
                                    </p>
                                </div>

                                <div className="w-full grid grid-cols-1 grid-rows-2 gap-6 mb-12 sm:grid-cols-2 sm:grid-rows-1">
                                    <Toggle
                                        pressed={isPlatformSelected}
                                        onPressedChange={selectPlatform}
                                    >
                                        <h6 className="text-xl font-semibold mb-4">
                                            {info.platformTitle}
                                        </h6>

                                        <span className="text-sm font-medium">
                                            {info.platformDesc}
                                        </span>
                                    </Toggle>

                                    <Toggle
                                        pressed={isAgreedSelected}
                                        onPressedChange={selectAgreed}
                                    >
                                        <h6 className="text-xl font-semibold mb-4">
                                            {info.agreedTitle}
                                        </h6>

                                        <span className="text-sm font-medium">
                                            {info.agreedDesc}
                                        </span>
                                    </Toggle>
                                </div>

                                <Button
                                    onClick={handlePayment}
                                    className="w-full"
                                >
                                    {info.nextButton}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
