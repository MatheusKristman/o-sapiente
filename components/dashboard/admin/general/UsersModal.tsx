"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

import {
  ModalAnimation,
  OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import useAdminUsersModalStore from "@/stores/useAdminUsersModalStore";
import { UsersModalDetails } from "./UsersModalDetails";
import { UsersModalBanConfirmation } from "./UsersModalBanConfirmation";
import { UsersModalDeleteRequestConfirmation } from "./UsersModalDeleteRequestConfirmation";

export function UsersModal() {
  const {
    isModalOpen,
    closeModal,
    isUserBanConfirmation,
    isRequestDeletionConfirmation,
    setRequestDeletionConfirmation,
    setUserBanConfirmation,
  } = useAdminUsersModalStore();

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setRequestDeletionConfirmation(false);
      setUserBanConfirmation(false);
    }, 350);
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="users-modal"
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
              {!isUserBanConfirmation && !isRequestDeletionConfirmation && (
                <UsersModalDetails key="users-modal-details" />
              )}
              {isUserBanConfirmation && !isRequestDeletionConfirmation && (
                <UsersModalBanConfirmation key="users-modal-ban-confirmation" />
              )}
              {!isUserBanConfirmation && isRequestDeletionConfirmation && (
                <UsersModalDeleteRequestConfirmation key="users-modal-delete-request-confirmation" />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
