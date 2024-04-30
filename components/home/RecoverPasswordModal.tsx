"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

import {
  ModalAnimation,
  OverlayAnimation,
} from "@/constants/framer-animations/modal";
import useRecoverPasswordModalStore from "@/stores/useRecoverPasswordModalStore";
import { Button } from "@/components/ui/button";
import { recoverPasswordModalInfo } from "@/constants/recoverPasswordModal-br";
import RecoverPasswordForm from "./components/recover-password/RecoverPasswordForm";
import RecoverPasswordMessage from "./components/recover-password/RecoverPasswordMessage";

function RecoverPasswordModal() {
  const { isModalOpen, closeModal, isForm, isMessage, setForm, unsetMessage } =
    useRecoverPasswordModalStore();

  useEffect(() => {
    setForm();
    unsetMessage();
  }, []);

  function handleCloseButton() {
    closeModal();
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="recover-password-modal"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
          >
            <div className="w-full flex justify-end">
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

            {!isMessage && (
              <h4 className="text-2xl text-[#2C383F] font-semibold mb-9 sm:text-3xl text-left">
                {recoverPasswordModalInfo.title}
              </h4>
            )}

            <AnimatePresence>
              {isForm && <RecoverPasswordForm key="recover-password-form" />}
              {isMessage && (
                <RecoverPasswordMessage key="recover-password-message" />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RecoverPasswordModal;
