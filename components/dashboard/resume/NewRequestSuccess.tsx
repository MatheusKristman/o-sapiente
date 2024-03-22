import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/Button";
import { studentNewRequestInfo } from "@/constants/dashboard/resume-br";
import { newRequestMessageAnimation } from "@/constants/framer-animations/new-request-modal";

interface NewRequestSuccessProps {
  handleCloseButton: () => void;
}

const NewRequestSuccess = ({ handleCloseButton }: NewRequestSuccessProps) => {
  return (
    <div className="w-full flex flex-col items-center">
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
        className="text-xl text-gray-primary font-semibold text-center mb-12"
      >
        {studentNewRequestInfo.successMessage}
      </motion.h4>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={newRequestMessageAnimation}
        className="w-full"
      >
        <Button
          primary
          fullWidth
          label={studentNewRequestInfo.closeBtn}
          onClick={handleCloseButton}
        />
      </motion.div>
    </div>
  );
};

export default NewRequestSuccess;
