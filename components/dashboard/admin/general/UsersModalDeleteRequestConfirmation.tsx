"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { UsersModalText } from "@/constants/dashboard/admin-general-br";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminUsersModalStore from "@/stores/useAdminUsersModalStore";
import useUserStore from "@/stores/useUserStore";
import useAdminStore from "@/stores/useAdminStore";
import { Loader2 } from "lucide-react";

interface Props {
  handleClose: () => void;
}

export function UsersModalDeleteRequestConfirmation({ handleClose }: Props) {
  const { setRequestDeletionConfirmation, requestId, isLoading, setLoading } =
    useAdminUsersModalStore();
  const { setUsers } = useAdminStore();
  const { userId } = useUserStore();

  function handleConfirm() {
    setLoading(true);

    axios
      .post("/api/adm/users/delete-user-request", { userId, requestId })
      .then((res) => {
        setUsers(res.data);
        toast.success("Solicitação deletada com sucesso");
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
          disabled={isLoading}
          onClick={handleCancel}
          variant="outline"
          className="w-full sm:w-1/2"
        >
          {UsersModalText.deleteRequestConfirmationCancelBtn}
        </Button>

        <Button
          disabled={isLoading}
          onClick={handleConfirm}
          className="w-full sm:w-1/2 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {UsersModalText.deleteRequestConfirmationConfirmBtn}
        </Button>
      </div>
    </motion.div>
  );
}
