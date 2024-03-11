import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { requestDetailsInfo } from "@/constants/requestDetails-br";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import Button from "@/components/Button";
import {
  requestDetailsOverlayAnimation,
  requestDetailsModalAnimation,
} from "@/constants/framer-animations/request-details-modal";

const RequestDetailModal = () => {
  const {
    isModalOpen,
    closeModal,
    requestId,
    studentImage,
    studentName,
    subject,
    message,
    reset,
  } = useRequestDetailsModalStore();

  function handleCloseButton() {
    closeModal();

    setTimeout(() => {
      reset();
    }, 350);
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
            variants={requestDetailsOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={requestDetailsModalAnimation}
              className="w-full max-w-[650px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
            >
              <div className="w-full flex justify-end items-center">
                <button
                  type="button"
                  onClick={handleCloseButton}
                  className="mb-6"
                >
                  <BsXLg size={26} className="text-green-primary" />
                </button>
              </div>

              <div className="w-full flex flex-col">
                <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
                  {requestDetailsInfo.title}
                </h3>

                <div className="w-full flex items-center gap-x-4 mb-4">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src={
                        studentImage
                          ? studentImage
                          : "/assets/images/default-user-photo.svg"
                      }
                      alt="Aluno"
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <h5 className="text-lg font-semibold text-gray-primary">
                    {studentName}
                  </h5>
                </div>

                <div className="w-full flex gap-x-2 mb-4">
                  <span className="text-lg font-semibold text-green-primary">
                    {requestDetailsInfo.subject}
                  </span>

                  <span className="text-base text-gray-primary mt-1">
                    {subject}
                  </span>
                </div>

                <div className="w-full flex gap-x-2 mb-6">
                  <span className="text-lg font-semibold text-green-primary">
                    {requestDetailsInfo.message}
                  </span>

                  <span className="text-base text-gray-primary text-left mt-1">
                    {message}
                  </span>
                </div>

                <Button
                  label={requestDetailsInfo.btn}
                  fullWidth
                  primary
                  type="button"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RequestDetailModal;
