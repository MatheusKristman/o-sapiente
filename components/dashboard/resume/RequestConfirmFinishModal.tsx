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
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RequestConfirmFinishModal() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setRequests, setCurrentLesson } = useResumeStore();
  const { isModalOpen, closeModal, requestSelected, setRequestSelected } =
    useConfirmFinishModalStore();
  const { userId } = useUserStore();
  const filteredUser = requestSelected?.usersVotedToFinish.filter(
    (user) => user.id !== userId
  )[0];
  const router = useRouter();

  if (isModalOpen && !requestSelected && !filteredUser) {
    return <RequestConfirmFinishModalSkeleton handleClose={handleClose} />;
  }

  function handleClose() {
    closeModal();
    setRequestSelected(null);
  }

  function handleFinish() {
    if (!requestSelected) {
      toast.error("Ocorreu um erro ao finalizar a solicitação");
      return;
    }

    setIsSubmitting(true);

    axios
      .put("/api/request/finish", { requestId: requestSelected.id })
      .then((res) => {
        setRequests(
          res.data.filter(
            (request: RequestWithUsersAndOffers) =>
              !request.isConcluded && !request.isOfferAccepted
          )
        );
        setCurrentLesson(
          res.data.filter(
            (request: RequestWithUsersAndOffers) =>
              !request.isConcluded && request.isOfferAccepted
          )
        );
        closeModal();
        router.refresh();
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao finalizar a solicitação");
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
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
                    disabled={isSubmitting}
                    variant="link"
                    size="icon"
                    className="text-green-primary"
                    onClick={handleClose}
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
                          filteredUser?.profilePhoto
                            ? filteredUser.profilePhoto
                            : "/assets/images/default-user-photo.svg"
                        }
                        className="w-[40px] min-w-[40px] h-[40px] min-h-[40px] object-center object-cover rounded-full"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Image
                        alt="Perfil"
                        src="/assets/images/default-user-photo.svg"
                        className="w-[40px] min-w-[40px] h-[40px] min-h-[40px] object-center object-cover rounded-full"
                        width={40}
                        height={40}
                      />
                    )}

                    <span className="text-lg font-semibold text-white">
                      {requestSelected
                        ? `${filteredUser?.firstName} ${filteredUser?.lastName} ${confirmFinishModalInfo.desc}`
                        : `O outro usuário ${confirmFinishModalInfo.desc}`}
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    disabled={isSubmitting}
                    variant="outline"
                    onClick={closeModal}
                    className="w-full sm:w-1/2"
                  >
                    {confirmFinishModalInfo.cancelBtn}
                  </Button>

                  <Button
                    disabled={isSubmitting}
                    onClick={handleFinish}
                    className="w-full sm:w-1/2 flex items-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="animate-spin" />}
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

function RequestConfirmFinishModalSkeleton({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <div className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
      <div className="w-full max-w-[650px] bg-white shadow-lg shadow-black/25 p-9 overflow-x-hidden rounded-2xl inline-block align-middle">
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-end">
            <Button
              variant="link"
              size="icon"
              className="text-green-primary"
              onClick={handleClose}
            >
              <BsXLg size={26} />
            </Button>
          </div>

          <h1 className="text-2xl text-gray-primary font-semibold text-left mb-12">
            {confirmFinishModalInfo.title}
          </h1>

          <div className="w-full flex items-center justify-center mb-12">
            <div className="bg-green-primary p-4 flex items-center gap-4 rounded-xl">
              <Skeleton className="w-10 h-10 rounded-full" />

              <Skeleton className="h-9 w-40" />
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
            <Button disabled variant="outline" className="w-full sm:w-1/2">
              {confirmFinishModalInfo.cancelBtn}
            </Button>

            <Button disabled className="w-full sm:w-1/2">
              {confirmFinishModalInfo.confirmBtn}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
