"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminRequestsModalStore from "@/stores/useAdminRequestsModalStore";
import useAdminStore from "@/stores/useAdminStore";
import useUserStore from "@/stores/useUserStore";
import { Loader2 } from "lucide-react";
import { RequestsModalText } from "@/constants/dashboard/admin-general-br";

interface Props {
  handleClose: () => void;
}

export function RequestsModalDeletionConfirmation({ handleClose }: Props) {
  const { setDeleteConfirmation, isLoading, setLoading, requestId } =
    useAdminRequestsModalStore();
  const { setUsers, setRequests } = useAdminStore();
  const { userId } = useUserStore();

  function handleCancel() {
    setDeleteConfirmation(false);
  }

  function handleConfirm() {
    setLoading(true);

    axios
      .post("/api/adm/requests/delete-request", { userId, requestId })
      .then((res) => {
        setUsers(res.data.users);
        setRequests(res.data.requests);
        toast.success(RequestsModalText.successMessage);
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
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-gray-primary font-semibold text-2xl sm:text-3xl text-left">
          {RequestsModalText.delTitle}
        </h2>

        <p className="text-gray-primary text-base text-left">
          {RequestsModalText.delDescription}
        </p>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center gap-4">
        <Button
          disabled={isLoading}
          onClick={handleCancel}
          variant="outline"
          className="w-full sm:w-1/2"
        >
          {RequestsModalText.cancelBtn}
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full sm:w-1/2 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {RequestsModalText.delBtn}
        </Button>
      </div>
    </motion.div>
  );
}
