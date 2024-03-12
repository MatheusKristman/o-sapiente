"use client";

import { motion } from "framer-motion";

import Button from "@/components/Button";
import { requestDetailsOfferFormInfo } from "@/constants/requestDetails-br";
import { requestDetailsFormAnimation } from "@/constants/framer-animations/request-details-modal";

const RequestDetailsModalOfferForm = () => {
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

      <form className="w-full flex flex-col gap-y-9">
        <textarea
          placeholder={requestDetailsOfferFormInfo.placeholder}
          className="w-full h-64 px-4 py-2 rounded-lg bg-[#EBEFF1] text-base text-gray-primary resize-none placeholder:text-[#96A3AB] placeholder:font-medium focus:border-2 focus:border-[#96A3AB] outline-none transition-[border]"
        />

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
