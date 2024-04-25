import { BsXLg } from "react-icons/bs";

import { studentNewRequestInfo } from "@/constants/dashboard/resume-br";
import { AnimatePresence, motion } from "framer-motion";
import useNewRequestStore from "@/stores/useNewRequestStore";
import {
    newRequestModalAnimation,
    newRequestOverlayAnimation,
} from "@/constants/framer-animations/new-request-modal";
import NewRequestForm from "./NewRequestForm";
import NewRequestSuccess from "./NewRequestSuccess";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NewRequestModal = () => {
    const { isModalOpen, closeModal, isForm, isMessage, resetModalContent } =
        useNewRequestStore();
    const router = useRouter();

    function handleCloseButton() {
        closeModal();

        setTimeout(() => {
            resetModalContent();
            router.refresh();
        }, 350);
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="modal"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={newRequestOverlayAnimation}
                        className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
                    >
                        <motion.div
                            key="modal"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={newRequestModalAnimation}
                            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
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

                            <AnimatePresence>
                                {isForm ? (
                                    <NewRequestForm key="new-request-form" />
                                ) : null}
                                {isMessage ? (
                                    <NewRequestSuccess
                                        key="new-request-message"
                                        handleCloseButton={handleCloseButton}
                                    />
                                ) : null}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NewRequestModal;
