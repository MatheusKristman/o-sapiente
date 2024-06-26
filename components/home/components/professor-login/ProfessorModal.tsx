"use client";

import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import {
  professorOverlayAnimation,
  professorModalAnimation,
} from "@/constants/framer-animations/professor-modal";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { professorLoginInfo } from "@/constants/register/professor-register-br";
import { Button } from "@/components/ui/button";
import { ProfessorLoginForm } from "./ProfessorLoginForm";
import { ProfessorForgotPasswordForm } from "./ProfessorForgotPasswordForm";
import { ProfessorRecoverPasswordMessage } from "./ProfessorRecoverPasswordMessage";

const ProfessorModal = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    isModalOpen,
    closeModal,
    isLogin,
    setToLogin,
    forgotPassword,
    isRecoverPasswordMessage,
  } = useProfessorModalStore();

  function handleCloseButton() {
    closeModal();
    setToLogin();
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
            variants={professorOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={professorModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl overflow-x-hidden inline-block align-middle"
            >
              <div className="flex justify-end mb-6">
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  className="text-green-primary"
                  onClick={handleCloseButton}
                  disabled={isSubmitting}
                >
                  <BsXLg size={26} />
                </Button>
              </div>

              <h4 className="text-2xl text-[#2C383F] font-semibold mb-9 sm:text-3xl text-left">
                {professorLoginInfo.title}
              </h4>

              <AnimatePresence>
                {isLogin && (
                  <ProfessorLoginForm
                    setIsSubmitting={setIsSubmitting}
                    isSubmitting={isSubmitting}
                    handleCloseButton={handleCloseButton}
                    key="professor-login"
                  />
                )}
                {forgotPassword && (
                  <ProfessorForgotPasswordForm key="professor-forgot-password" />
                )}
                {isRecoverPasswordMessage && (
                  <ProfessorRecoverPasswordMessage key="professor-recover-password" />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfessorModal;
