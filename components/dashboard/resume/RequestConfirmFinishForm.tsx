import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

import { RequestWithUsersAndOffers } from "@/types";
import { confirmFinishModalInfo } from "@/constants/dashboard/resume-br";
import { Button } from "@/components/ui/button";
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";
import useResumeStore from "@/stores/useResumeStore";
import { FormAnimation } from "@/constants/framer-animations/modal";

export function RequestConfirmFinishForm() {
  const { setRequests, setCurrentLesson } = useResumeStore();
  const { closeModal, requestSelected, setSupport, setForm } =
    useConfirmFinishModalStore();

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setForm();
    }, 350);
  }

  function handleFinish() {
    if (!requestSelected) {
      toast.error("Ocorreu um erro ao finalizar a solicitação");
      return;
    }

    axios
      .put("/api/request/finish", { requestId: requestSelected.id })
      .then((res) => {
        console.log("request from finish: ", res.data);
        setRequests(res.data);
        setCurrentLesson(
          res.data.filter(
            (request: RequestWithUsersAndOffers) => request.isOfferAccepted
          )
        );
        handleClose();
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao finalizar a solicitação");
        console.error(error);
      });
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
    >
      <div className="w-full flex items-center justify-center mb-12">
        <div className="bg-green-primary p-4 flex items-center gap-4 rounded-xl">
          {requestSelected ? (
            <Image
              alt="Perfil"
              src={
                requestSelected.usersVotedToFinish[0].profilePhoto
                  ? requestSelected.usersVotedToFinish[0].profilePhoto
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
              ? `${requestSelected.usersVotedToFinish[0].firstName} ${requestSelected.usersVotedToFinish[0].lastName} ${confirmFinishModalInfo.desc}`
              : `O outro usuário ${confirmFinishModalInfo.desc}`}
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handleClose}
          className="w-full sm:w-1/2"
        >
          {confirmFinishModalInfo.cancelBtn}
        </Button>

        <Button onClick={handleFinish} className="w-full sm:w-1/2">
          {confirmFinishModalInfo.confirmBtn}
        </Button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-primary text-center">
          {confirmFinishModalInfo.supportDesc}
        </p>

        <Button onClick={setSupport} variant="outline" className="w-full">
          {confirmFinishModalInfo.supportBtn}
        </Button>
      </div>
    </motion.div>
  );
}
