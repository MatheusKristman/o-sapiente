import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

import {
  OverlayAnimation,
  ModalAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { confirmFinishModalInfo } from "@/constants/dashboard/resume-br";
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";
import useResumeStore from "@/stores/useResumeStore";
import { RequestWithUsersAndOffers } from "@/types";
import useUserStore from "@/stores/useUserStore";

export function RequestConfirmFinishModal() {
  const { setRequests, setCurrentLesson } = useResumeStore();
  const { isModalOpen, closeModal, requestSelected } =
    useConfirmFinishModalStore();
  const { userId } = useUserStore();

  if (!requestSelected) {
    //TODO: loading skeleton
    return null;
  }

  const filteredUser = requestSelected?.usersVotedToFinish.filter(
    (user) => user.id !== userId,
  )[0];

  function handleFinish() {
    if (!requestSelected) {
      toast.error("Ocorreu um erro ao finalizar a solicitação");
      return;
    }

    axios
      .put("/api/request/finish", { requestId: requestSelected.id })
      .then((res) => {
        console.log("request from finish: ", res.data);
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
              className="w-full max-w-[650px] bg-white shadow-lg shadow-black/25 p-9 overflow-x-hidden rounded-2xl inline-block align-middle"
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
                    {requestSelected ? (
                      <Image
                        alt="Perfil"
                        src={
                          filteredUser.profilePhoto
                            ? filteredUser.profilePhoto
                            : "/assets/images/default-user-photo.svg"
                        }
                        className="object-center object-contain rounded-full"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Image
                        alt="Perfil"
                        src="/assets/images/default-user-photo.svg"
                        className="object-center object-contain rounded-full"
                        width={40}
                        height={40}
                      />
                    )}

                    <span className="text-lg font-semibold text-white">
                      {requestSelected
                        ? `${filteredUser.firstName} ${filteredUser.lastName} ${confirmFinishModalInfo.desc}`
                        : `O outro usuário ${confirmFinishModalInfo.desc}`}
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

                  <Button onClick={handleFinish} className="w-full sm:w-1/2">
                    {confirmFinishModalInfo.confirmBtn}
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
