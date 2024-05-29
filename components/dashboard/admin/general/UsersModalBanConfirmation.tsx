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

export function UsersModalBanConfirmation({ handleClose }: Props) {
  const { setUserBanConfirmation, isLoading, setLoading, userSelected } =
    useAdminUsersModalStore();
  const { setUsers, setRequests } = useAdminStore();
  const { userId } = useUserStore();

  function handleCancel() {
    setUserBanConfirmation(false);
  }

  function handleConfirm() {
    if (userSelected) {
      setLoading(true);

      axios
        .post("/api/adm/users/ban-user", {
          adminId: userId,
          userId: userSelected.id,
        })
        .then((res) => {
          toast.success("Usuário banido com sucesso");

          setUsers(res.data.users);
          setRequests(res.data.requests);
          handleClose();
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return;
    }
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
          {UsersModalText.banConfirmationTitle}
        </h2>

        <p className="text-base text-gray-primary text-left">
          {UsersModalText.banConfirmationDesc}
        </p>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          disabled={isLoading}
          onClick={handleCancel}
          variant="outline"
          className="w-full sm:w-1/2"
        >
          {UsersModalText.banConfirmationCancelBtn}
        </Button>

        <Button
          disabled={isLoading}
          onClick={handleConfirm}
          className="w-full sm:w-1/2 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {UsersModalText.banConfirmationConfirmBtn}
        </Button>
      </div>
    </motion.div>
  );
}
