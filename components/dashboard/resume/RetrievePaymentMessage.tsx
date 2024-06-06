"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { retrievePaymentModalInfo } from "@/constants/dashboard/resume-br";
import { newRequestMessageAnimation } from "@/constants/framer-animations/new-request-modal";
import { Button } from "@/components/ui/button";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";
import { useRouter } from "next/navigation";

export function RetrievePaymentMessage() {
  const { closeModal, setIsForm, setIsMessage } = useRetrievePaymentModalStore();

  function handleClose() {
    closeModal();
    setIsForm(true);

    setTimeout(() => {
      setIsMessage(false);
      location.reload();
    }, 350);
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-36 h-36 mb-9">
          <Image src="/assets/icons/confirm.gif" alt="Confirmado" fill className="object-cover" />
        </div>

        <motion.h4
          initial="initial"
          animate="animate"
          exit="exit"
          variants={newRequestMessageAnimation}
          className="text-xl text-gray-primary font-semibold text-center mb-12"
        >
          {retrievePaymentModalInfo.successTitle}
        </motion.h4>

        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={newRequestMessageAnimation}
          className="w-full"
        >
          <Button className="w-full" onClick={handleClose}>
            {retrievePaymentModalInfo.closeBtn}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
