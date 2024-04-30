import { motion } from "framer-motion";
import Image from "next/image";

import { FormAnimation } from "@/constants/framer-animations/modal";
import { newRequestMessageAnimation } from "@/constants/framer-animations/new-request-modal";
import { recoverPasswordModalInfo } from "@/constants/recoverPasswordModal-br";
import { Button } from "@/components/ui/button";
import useRecoverPasswordModalStore from "@/stores/useRecoverPasswordModalStore";

function RecoverPasswordMessage() {
  const { closeModal, setForm, unsetMessage } = useRecoverPasswordModalStore();

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setForm();
      unsetMessage();
    }, 350);
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full flex flex-col items-center"
    >
      <div className="relative w-36 h-36 mb-9">
        <Image
          src="/assets/icons/confirm.gif"
          alt="Confirmado"
          fill
          className="object-cover"
        />
      </div>

      <motion.h4
        initial="initial"
        animate="animate"
        exit="exit"
        variants={newRequestMessageAnimation}
        className="text-lg !leading-normal text-gray-primary font-medium text-center mb-12"
      >
        {recoverPasswordModalInfo.message}
      </motion.h4>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={newRequestMessageAnimation}
        className="w-full"
      >
        <Button className="w-full" onClick={handleClose}>
          {recoverPasswordModalInfo.closeBtn}
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default RecoverPasswordMessage;
