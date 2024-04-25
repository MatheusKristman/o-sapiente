import { BsXLg } from "react-icons/bs";

import useOffersModalStore from "@/stores/useOffersModalStore";
import { offersModalInfo } from "@/constants/offersModal-br";
import OfferItem from "./OfferItem";
import { AnimatePresence, motion } from "framer-motion";
import {
    offersModalAnimation,
    offersOverlayAnimation,
} from "@/constants/framer-animations/offers-modal";
import { Button } from "@/components/ui/button";

const OffersModal = () => {
    const { isModalOpen, closeModal, requestSelectedOffers } =
        useOffersModalStore();

    function handleCloseButton() {
        closeModal();
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="details-modal"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={offersOverlayAnimation}
                        className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
                    >
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={offersModalAnimation}
                            className="w-full max-w-[650px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
                        >
                            <div className="w-full flex justify-end items-center">
                                <Button
                                    variant="link"
                                    size="icon"
                                    type="button"
                                    onClick={handleCloseButton}
                                    className="mb-6"
                                >
                                    <BsXLg
                                        size={26}
                                        className="text-green-primary"
                                    />
                                </Button>
                            </div>

                            <div className="w-full flex flex-col">
                                <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
                                    {offersModalInfo.title}
                                </h3>

                                <div className="w-full h-[400px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20 flex flex-col gap-y-6 overflow-x-hidden">
                                    {requestSelectedOffers.length > 0 ? (
                                        requestSelectedOffers.map((offer) => (
                                            <OfferItem
                                                offer={offer}
                                                key={offer.id}
                                                handleCloseButton={
                                                    handleCloseButton
                                                }
                                            />
                                        ))
                                    ) : (
                                        <span className="text-lg text-center text-gray-primary/40">
                                            Nenhuma proposta no momento
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default OffersModal;
