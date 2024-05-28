"use client";

import { Plus } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import useAdminUsersModalStore from "@/stores/useAdminUsersModalStore";
import { UsersWithRequests } from "@/types";

interface Props {
  last?: boolean;
  user: UsersWithRequests;
}

export function UserItem({ last, user }: Props) {
  const { openModal, setUserSelected } = useAdminUsersModalStore();

  function handleModal() {
    setUserSelected(user);
    openModal();
  }

  return (
    <div
      className={cn(
        "w-full bg-green-primary p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between lg:flex-col lg:justify-start items-center gap-6 mb-4",
        { "mb-0": last },
      )}
    >
      <div className="w-full sm:w-fit lg:w-full flex flex-col sm:flex-row lg:flex-col items-center sm:gap-6 lg:gap-2 gap-2">
        <div className="w-12 min-w-[48px] h-12 min-h-[48px] rounded-full relative overflow-hidden">
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt="Usuário"
              fill
              className="object-cover object-center"
            />
          ) : (
            <Image
              src="/assets/images/default-user-photo.svg"
              alt="Usuário"
              fill
              className="object-cover object-center"
            />
          )}
        </div>

        <div className="flex flex-col sm:items-start lg:items-center items-center">
          <span className="text-white text-lg font-semibold text-center !leading-tight sm:text-left lg:text-center">
            {`${user.firstName} ${user.lastName}`}
          </span>

          <span className="text-white text-base font-semibold text-center !leading-tight sm:text-left lg:text-center">
            {user.accountType === "PROFESSOR" ? "Professor" : "Aluno"}
          </span>
        </div>
      </div>

      <Button
        onClick={handleModal}
        variant="secondary"
        className="w-full sm:w-fit lg:w-full flex items-center gap-2"
      >
        <Plus className="text-green-primary" />
        <span className="text-green-primary font-semibold text-base uppercase">
          Ver detalhes
        </span>
      </Button>
    </div>
  );
}
