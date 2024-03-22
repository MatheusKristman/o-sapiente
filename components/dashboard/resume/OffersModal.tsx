import { BsXLg } from "react-icons/bs";

import useOffersModalStore from "@/stores/useOffersModalStore";
import { offersModalInfo } from "@/constants/offersModal-br";
import OfferItem from "./OfferItem";
import { AnimatePresence, motion } from "framer-motion";
import {
  offersModalAnimation,
  offersOverlayAnimation,
} from "@/constants/framer-animations/offers-modal";

const OffersModal = () => {
  const { isModalOpen, closeModal } = useOffersModalStore();

  function handleCloseButton() {
    closeModal();

    // setTimeout(() => {
    //   reset();
    // }, 350);
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
            variants={offersOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={offersModalAnimation}
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
                  {offersModalInfo.title}
                </h3>

                <div className="w-full h-[400px] overflow-auto flex flex-col gap-y-6">
                  <OfferItem />
                  <OfferItem />
                  <OfferItem />
                  <OfferItem />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OffersModal;