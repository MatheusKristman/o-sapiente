"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { UsersModalText } from "@/constants/dashboard/admin-general-br";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminUsersModalStore from "@/stores/useAdminUsersModalStore";

export function UsersModalDeleteRequestConfirmation() {
  const { setRequestDeletionConfirmation } = useAdminUsersModalStore();

  function handleCancel() {
    setRequestDeletionConfirmation(false);
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <div className="w-full flex flex-col gap-1 mb-6">
        <h2 className="text-xl sm:text-2xl text-gray-primary text-left font-semibold">
          {UsersModalText.deleteRequestConfirmationTitle}
        </h2>

        <p className="text-base text-gray-primary text-left">
          {UsersModalText.deleteRequestConfirmationDesc}
        </p>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full sm:w-1/2"
        >
          {UsersModalText.deleteRequestConfirmationCancelBtn}
        </Button>

        <Button className="w-full sm:w-1/2">
          {UsersModalText.deleteRequestConfirmationConfirmBtn}
        </Button>
      </div>
    </motion.div>
  );
}
