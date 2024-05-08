import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  OverlayAnimation,
  ModalAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { finishModalInfo } from "@/constants/dashboard/resume-br";
import useFinishModalStore from "@/stores/useFinishModalStore";
import { RequestWithUsersAndOffers } from "@/types";
import useResumeStore from "@/stores/useResumeStore";

interface Props {
  type: "PROFESSOR" | "STUDENT";
}

export function RequestFinishModal({ type }: Props) {
  const { setRequests, setCurrentLesson } = useResumeStore();
  const { isModalOpen, closeModal, requestSelected } = useFinishModalStore();

  function handleFinish() {
    if (!requestSelected) {
      toast.error("Ocorreu um erro ao finalizar a solicitação");
      return;
    }

    axios
      .put("/api/request/finish", { requestId: requestSelected.id })
      .then((res) => {
        setRequests(
          res.data.filter(
            (request: RequestWithUsersAndOffers) =>
              !request.isConcluded && !request.isOfferAccepted,
          ),
        );
        setCurrentLesson(
          res.data.filter(
            (request: RequestWithUsersAndOffers) =>
              !request.isConcluded && request.isOfferAccepted,
          ),
        );
        closeModal();
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao finalizar a solicitação");
        console.error(error);
      });
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="request-finish-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={OverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="request-finish-modal"
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

                <div className="w-full flex flex-col gap-4 mb-6">
                  <h1 className="text-2xl sm:text-3xl text-gray-primary font-semibold text-left">
                    {finishModalInfo.title}
                  </h1>

                  {type === "PROFESSOR" && (
                    <p className="text-base text-gray-primary text-left">
                      {finishModalInfo.descProfessor}
                    </p>
                  )}

                  {type === "STUDENT" && (
                    <p className="text-base text-gray-primary text-left">
                      {finishModalInfo.descStudent}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={closeModal}
                    className="w-full sm:w-1/2"
                  >
                    {finishModalInfo.cancelBtn}
                  </Button>

                  <Button onClick={handleFinish} className="w-full sm:w-1/2">
                    {finishModalInfo.confirmBtn}
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
