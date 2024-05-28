"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  ModalAnimation,
  OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { RequestsModalDetails } from "./RequestsModalDetails";
import { RequestsModalDeletionConfirmation } from "./RequestsModalDeletionConfirmation";
import useAdminRequestsModalStore from "@/stores/useAdminRequestsModalStore";

export function RequestsModal() {
  const {
    isModalOpen,
    isDeleteConfirmation,
    setDeleteConfirmation,
    closeModal,
  } = useAdminRequestsModalStore();

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setDeleteConfirmation(false);
    });
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="admin-request-modal"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
          >
            <div className="w-full flex justify-end items-center">
              <Button
                variant="link"
                size="icon"
                type="button"
                onClick={handleClose}
                className="mb-6"
              >
                <BsXLg size={26} className="text-green-primary" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {!isDeleteConfirmation && (
                <RequestsModalDetails key="requests-modal-details" />
              )}
              {isDeleteConfirmation && (
                <RequestsModalDeletionConfirmation key="requests-modal-deletion-confirmation" />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
