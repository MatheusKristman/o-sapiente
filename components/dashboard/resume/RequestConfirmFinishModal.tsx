import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

import {
  OverlayAnimation,
  ModalAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { confirmFinishModalInfo } from "@/constants/dashboard/resume-br";
import Image from "next/image";
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";

export function RequestConfirmFinishModal() {
  const { isModalOpen, closeModal } = useConfirmFinishModalStore();

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

                <h1 className="text-2xl text-gray-primary font-semibold text-left mb-12">
                  {confirmFinishModalInfo.title}
                </h1>

                <div className="w-full flex items-center justify-center mb-12">
                  <div className="bg-green-primary p-4 flex items-center gap-4 rounded-xl">
                    <Image
                      alt="Perfil"
                      src="/assets/images/default-user-photo.svg"
                      className="object-center object-contain rounded-full"
                      width={40}
                      height={40}
                    />

                    <span className="text-lg font-semibold text-white">
                      {`John Doe ${confirmFinishModalInfo.desc}`}
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    variant="outline"
                    onClick={closeModal}
                    className="w-full sm:w-1/2"
                  >
                    {confirmFinishModalInfo.cancelBtn}
                  </Button>

                  <Button className="w-full sm:w-1/2">
                    {confirmFinishModalInfo.confirmBtn}
                  </Button>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <p className="text-sm text-gray-primary text-center">
                    {confirmFinishModalInfo.supportDesc}
                  </p>

                  <Button variant="outline" className="w-full">
                    {confirmFinishModalInfo.supportBtn}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}