"use client";

import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import {
  requestDetailsOverlayAnimation,
  requestDetailsModalAnimation,
} from "@/constants/framer-animations/request-details-modal";
import RequestDetailsModalResume from "./RequestDetailsModalResume";
import RequestDetailsModalOfferForm from "./RequestDetailsModalOfferForm";
import { Button } from "@/components/ui/button";

interface RequestDetailModalProps {
  type?: string;
}

const RequestDetailModal = ({ type }: RequestDetailModalProps) => {
  const [isResume, setIsResume] = useState(true);
  const [isOfferForm, setIsOfferForm] = useState(false);

  const { isModalOpen, closeModal, reset } = useRequestDetailsModalStore();

  function handleCloseButton() {
    closeModal();

    setTimeout(() => {
      reset();
      setIsResume(true);
      setIsOfferForm(false);
      location.reload();
    }, 350);
  }

  function AcceptRequest() {
    setIsResume(false);

    setTimeout(() => {
      setIsOfferForm(true);
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
              className="w-full max-w-[650px] bg-white p-9 rounded-2xl relative inline-block align-middle overflow-x-hidden"
            >
              <div className="w-full flex justify-end items-center">
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  onClick={handleCloseButton}
                  className="mb-6"
                >
                  <BsXLg size={26} className="text-green-primary" />
                </Button>
              </div>

              <AnimatePresence>
                {isResume && (
                  <RequestDetailsModalResume
                    key="request-details-resume"
                    AcceptRequest={AcceptRequest}
                    type={type}
                    setIsResume={setIsResume}
                    setIsOfferForm={setIsOfferForm}
                  />
                )}
                {isOfferForm && (
                  <RequestDetailsModalOfferForm
                    handleCloseButton={handleCloseButton}
                    key="request-details-offer-form"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RequestDetailModal;
