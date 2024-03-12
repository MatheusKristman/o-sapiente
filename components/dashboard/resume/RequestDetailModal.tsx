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

const RequestDetailModal = () => {
  const [isResume, setIsResume] = useState(true);
  const [isOfferForm, setIsOfferForm] = useState(false);

  const { isModalOpen, closeModal, reset } = useRequestDetailsModalStore();

  function handleCloseButton() {
    closeModal();

    setTimeout(() => {
      reset();
      setIsResume(true);
      setIsOfferForm(false);
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
              className="w-full max-w-[650px] min-h-[542.5px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
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

              <AnimatePresence>
                {isResume && (
                  <RequestDetailsModalResume
                    key="request-details-resume"
                    AcceptRequest={AcceptRequest}
                  />
                )}
                {isOfferForm && (
                  <RequestDetailsModalOfferForm key="request-details-offer-form" />
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
