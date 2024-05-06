import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

import {
  OverlayAnimation,
  ModalAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { confirmFinishModalInfo } from "@/constants/dashboard/resume-br";
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";
import { RequestConfirmFinishForm } from "./RequestConfirmFinishForm";
import { RequestConfirmFinishSupport } from "./RequestConfirmFinishSupport";

export function RequestConfirmFinishModal() {
  const { isModalOpen, closeModal, isSupport, isForm, setForm } =
    useConfirmFinishModalStore();

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setForm();
    }, 350);
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="request-confirm-finish-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={OverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="request-confirm-finish-modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={ModalAnimation}
              className="w-full max-w-[650px] bg-white shadow-lg shadow-black/25 p-9 overflow-x-hidden rounded-2xl inline-block align-middle"
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

                <h1 className="text-2xl text-gray-primary font-semibold text-left mb-12">
                  {confirmFinishModalInfo.title}
                </h1>

                <AnimatePresence mode="wait">
                  {isForm && (
                    <RequestConfirmFinishForm key="confirm-finish-form" />
                  )}
                  {isSupport && (
                    <RequestConfirmFinishSupport key="confirm-finish-support" />
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
