"use client";

import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button";
import { requestDetailsOfferFormInfo } from "@/constants/requestDetails-br";
import { requestDetailsFormAnimation } from "@/constants/framer-animations/request-details-modal";
import {
  IRequestDetailsOfferForm,
  requestDetailsOfferFormSchema,
} from "@/constants/schemas/requestDetailsOfferFormSchema";
import { cn } from "@/libs/utils";

const RequestDetailsModalOfferForm = () => {
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
    console.log(values);
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
