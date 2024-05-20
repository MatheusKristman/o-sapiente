"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { requestDetailsInfo } from "@/constants/requestDetails-br";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import { Button } from "@/components/ui/button";
import { requestDetailsFormAnimation } from "@/constants/framer-animations/request-details-modal";
import Link from "next/link";
import useResumeStore from "@/stores/useResumeStore";
import { Dispatch, SetStateAction } from "react";

interface RequestDetailsModalResumeProps {
  AcceptRequest: () => void;
  type?: string;
  setIsResume: Dispatch<SetStateAction<boolean>>;
  setIsOfferForm: Dispatch<SetStateAction<boolean>>;
}

const RequestDetailsModalResume = ({
  AcceptRequest,
  type,
  setIsResume,
  setIsOfferForm,
}: RequestDetailsModalResumeProps) => {
  const { plan } = useResumeStore();
  const { studentImage, studentName, subject, message, closeModal, reset } =
    useRequestDetailsModalStore();

  function handleCloseButton() {
    closeModal();

    setTimeout(() => {
      reset();
      setIsResume(true);
      setIsOfferForm(false);
    }, 350);
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={requestDetailsFormAnimation}
      className="w-full flex flex-col"
    >
      <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
        {requestDetailsInfo.title}
      </h3>

      <div className="w-full flex items-center gap-x-4 mb-4">
        <div className="relative w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={
              studentImage
                ? studentImage
                : "/assets/images/default-user-photo.svg"
            }
            alt="Aluno"
            fill
            className="object-cover object-center"
          />
        </div>

        <h5 className="text-lg font-semibold text-gray-primary">
          {studentName}
        </h5>
      </div>

      <div className="w-full flex gap-x-2 mb-4">
        <span className="text-lg font-semibold text-green-primary">
          {requestDetailsInfo.subject}
        </span>

        <span className="text-base text-gray-primary mt-1">{subject}</span>
      </div>

      <div className="w-full flex gap-x-2 mb-6">
        <span className="text-lg font-semibold text-green-primary">
          {requestDetailsInfo.message}
        </span>

        <span className="text-base text-gray-primary text-left mt-1">
          {message}
        </span>
      </div>

      <Button
        className="w-full"
        disabled={type === "Professor" && !plan}
        onClick={AcceptRequest}
      >
        {requestDetailsInfo.btn}
      </Button>

      {type === "Professor" && !plan && (
        <span className="mt-4 text-base text-gray-primary text-center max-w-md mx-auto">
          {requestDetailsInfo.noPlanDesc}
          <Link
            onClick={handleCloseButton}
            href="/pagamento-do-plano"
            className="font-semibold text-green-primary"
          >
            {requestDetailsInfo.noPlanLink}
          </Link>
          .
        </span>
      )}
    </motion.div>
  );
};

export default RequestDetailsModalResume;
