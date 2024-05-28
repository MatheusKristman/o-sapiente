"use client";

import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminRequestsModalStore from "@/stores/useAdminRequestsModalStore";

import { motion } from "framer-motion";

//TODO: adicionar função para deletar solicitação
export function RequestsModalDeletionConfirmation() {
  const { setDeleteConfirmation } = useAdminRequestsModalStore();

  function handleCancel() {
    setDeleteConfirmation(false);
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-gray-primary font-semibold text-2xl sm:text-3xl text-left">
          Deseja deletar essa solicitação?
        </h2>

        <p className="text-gray-primary text-base text-left">
          Essa ação não pode ser desfeita.
        </p>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center gap-4">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full sm:w-1/2"
        >
          CANCELAR
        </Button>

        <Button className="w-full sm:w-1/2">DELETAR</Button>
      </div>
    </motion.div>
  );
}
