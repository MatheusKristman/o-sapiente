"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  ModalAnimation,
  OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import useAdminSubjectsDeleteModalStore from "@/stores/useAdminSubjectsDeleteModalStore";
import useAdminStore from "@/stores/useAdminStore";

export function SubjectsDeleteModal() {
  const {
    isModalOpen,
    closeModal,
    subjectId,
    setSubjectId,
    isLoading,
    setLoading,
  } = useAdminSubjectsDeleteModalStore();
  const { setSubjects } = useAdminStore();

  function handleClose() {
    closeModal();
    setSubjectId("");
  }

  function handleConfirm() {
    setLoading(true);

    axios
      .put("/api/adm/subject/delete", { subjectId })
      .then((res) => {
        setSubjects(res.data);
        toast.success("Matéria deletada com sucesso");
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
          >
            <div className="w-full flex justify-end items-center">
              <Button
                variant="link"
                size="icon"
                type="button"
                onClick={handleClose}
                className="mb-6"
              >
                <BsXLg size={26} className="text-green-primary" />
              </Button>
            </div>

            <div className="w-full flex flex-col gap-1 mb-6">
              <h2 className="text-xl sm:text-2xl text-gray-primary text-left font-semibold">
                Deseja deletar a matéria?
              </h2>

              <p className="text-base text-gray-primary text-left">
                Essa ação não pode ser desfeita.
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                disabled={isLoading}
                onClick={handleClose}
                variant="outline"
                className="w-full sm:w-1/2"
              >
                CANCELAR
              </Button>

              <Button
                disabled={isLoading}
                onClick={handleConfirm}
                className="w-full sm:w-1/2 flex items-center gap-2"
              >
                {isLoading && <Loader2 className="animate-spin" />}
                CONFIRMAR
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
