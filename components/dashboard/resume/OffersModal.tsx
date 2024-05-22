import { BsXLg } from "react-icons/bs";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import useOffersModalStore from "@/stores/useOffersModalStore";
import { offersModalInfo } from "@/constants/offersModal-br";
import OfferItem from "./OfferItem";
import { offersModalAnimation, offersOverlayAnimation } from "@/constants/framer-animations/offers-modal";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";
import usePaymentStore from "@/stores/usePaymentStore";
import { PaymentMethodModal } from "@/components/offer/PaymentMethodModal";

const OffersModal = () => {
  const { isModalOpen, closeModal, requestSelected } = useOffersModalStore();
  const { userId } = useUserStore();
  const { offer } = usePaymentStore();

  const studentImage = requestSelected?.users[0].profilePhoto;
  const studentName = `${requestSelected?.users[0].firstName} ${requestSelected?.users[0].lastName}`;
  const subject = requestSelected?.subject;
  const message = requestSelected?.description;

  function handleCloseButton() {
    closeModal();
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && requestSelected && (
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
                <Button variant="link" size="icon" type="button" onClick={handleCloseButton} className="mb-6">
                  <BsXLg size={26} className="text-green-primary" />
                </Button>
              </div>

              <div className="w-full flex flex-col">
                <div className="w-full flex items-center gap-x-4 mb-4">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src={studentImage ? studentImage : "/assets/images/default-user-photo.svg"}
                      alt="Aluno"
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <h5 className="text-lg font-semibold text-gray-primary">{studentName}</h5>
                </div>

                <div className="w-full flex gap-x-2 mb-4">
                  <span className="text-lg font-semibold text-green-primary">{offersModalInfo.subject}</span>

                  <span className="text-base text-gray-primary mt-1">{subject}</span>
                </div>

                <div className="w-full flex gap-x-2 mb-6">
                  <span className="text-lg font-semibold text-green-primary">{offersModalInfo.message}</span>

                  <span className="text-base text-gray-primary text-left mt-1">{message}</span>
                </div>

                <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">{offersModalInfo.title}</h3>

                <div className="w-full h-[400px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20 flex flex-col gap-y-6 overflow-x-hidden">
                  {requestSelected.offers.length > 0 ? (
                    requestSelected.offers.map((offer) => (
                      <OfferItem offer={offer} key={offer.id} handleCloseButton={handleCloseButton} />
                    ))
                  ) : (
                    <span className="text-lg text-center text-gray-primary/40">{offersModalInfo.noOfferText}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentMethodModal offer={offer} currentUserId={userId} />
    </>
  );
};

export default OffersModal;
