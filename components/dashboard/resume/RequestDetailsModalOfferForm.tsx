"use client";

import { motion } from "framer-motion";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Offer } from "@prisma/client";
import { toast } from "react-hot-toast";

import Button from "@/components/Button";
import { requestDetailsOfferFormInfo } from "@/constants/requestDetails-br";
import { requestDetailsFormAnimation } from "@/constants/framer-animations/request-details-modal";
import {
  IRequestDetailsOfferForm,
  requestDetailsOfferFormSchema,
} from "@/constants/schemas/requestDetailsOfferFormSchema";
import { cn } from "@/libs/utils";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";

interface RequestDetailsModalOfferFormProps {
  setOffers?: Dispatch<SetStateAction<Offer[]>>;
  handleCloseButton: () => void;
}

const RequestDetailsModalOfferForm = ({
  setOffers,
  handleCloseButton,
}: RequestDetailsModalOfferFormProps) => {
  const { requestId } = useRequestDetailsModalStore();

  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestDetailsOfferFormSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: IRequestDetailsOfferForm) {
    if (setOffers) {
      setIsSending(true);

      axios
        .post("/api/offer/create", { message: values.message, requestId })
        .then((res) => {
          setOffers((prev: Offer[]) => [...prev, res.data]);

          handleCloseButton();
        })
        .catch((error) => {
          console.log(error);

          toast.error(error.response.data);
        })
        .finally(() => setIsSending(false));
    }
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
        {requestDetailsOfferFormInfo.title}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <textarea
          {...register("message")}
          disabled={isSending}
          placeholder={requestDetailsOfferFormInfo.placeholder}
          className={cn(
            "w-full h-64 px-4 py-2 mb-9 rounded-lg bg-[#EBEFF1] text-base text-gray-primary resize-none placeholder:text-[#96A3AB] placeholder:font-medium focus:border-2 focus:border-[#96A3AB] outline-none transition-[border]",
            {
              "mb-2": errors?.message,
            },
          )}
        />

        {errors?.message && (
          <span className="text-sm text-[#FF7373] text-left mb-6">
            {errors.message.message}
          </span>
        )}

        <Button
          disabled={isSending}
          label={requestDetailsOfferFormInfo.btn}
          fullWidth
          type="submit"
          primary
          onClick={() => {}}
        />
      </form>
    </motion.div>
  );
};

export default RequestDetailsModalOfferForm;
