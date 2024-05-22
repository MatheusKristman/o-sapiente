"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { newRequestMessageAnimation } from "@/constants/framer-animations/new-request-modal";
import { professorRecoverMessageInfo } from "@/constants/register/professor-register-br";
import { Button } from "@/components/ui/button";
import useProfessorModalStore from "@/stores/useProfessorModalStore";

export function ProfessorRecoverPasswordMessage() {
  const { closeModal, setToNotRecoverPasswordMessage, setToLogin } = useProfessorModalStore();

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setToNotRecoverPasswordMessage();
      setToLogin();
    }, 350);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-36 h-36 mb-9">
        <Image src="/assets/icons/confirm.gif" alt="Confirmado" fill className="object-cover" />
      </div>

      <motion.h4
        initial="initial"
        animate="animate"
        exit="exit"
        variants={newRequestMessageAnimation}
        className="text-lg !leading-normal text-gray-primary font-medium text-center mb-12"
      >
        {professorRecoverMessageInfo.text}
      </motion.h4>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={newRequestMessageAnimation}
        className="w-full"
      >
        <Button className="w-full" onClick={handleClose}>
          {professorRecoverMessageInfo.closeBtn}
        </Button>
      </motion.div>
    </div>
  );
}
