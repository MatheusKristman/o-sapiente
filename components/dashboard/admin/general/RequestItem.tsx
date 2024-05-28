"use client";

import { Dot } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import { cn } from "@/libs/utils";
import useAdminRequestsModalStore from "@/stores/useAdminRequestsModalStore";
import { Request } from "@prisma/client";

interface Props {
  last?: boolean;
  request: Request;
}

//TODO: adicionar dados da request
export function RequestItem({ last, request }: Props) {
  const { openModal, setDeleteConfirmation } = useAdminRequestsModalStore();

  function handleModal() {
    //TODO: adicionar o que precisar para ter as informações no modal
    setDeleteConfirmation(false);
    openModal();
  }

  return (
    <div
      className={cn(
        "w-full bg-white p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-center gap-2 mb-4",
        { "mb-0": last },
      )}
    >
      <div className="w-full sm:w-fit flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
        <div className="w-10 min-w-[40px] h-10 min-h-[40px] relative rounded-full overflow-hidden">
          <Image
            src="/assets/images/default-user-photo.svg"
            alt="Usuário"
            fill
            className="object-center object-cover"
          />
        </div>

        <div className="w-fit flex items-center">
          <span className="text-lg font-semibold !leading-tight text-green-primary">
            John Doe
          </span>

          <Dot style={{ width: "35px", height: "35px" }} color="#03C988" />

          <span className="text-base font-semibold !leading-tight text-green-primary">
            Matemática
          </span>
        </div>
      </div>

      <Button onClick={handleModal} className="w-full sm:w-fit">
        {AdminGeneralText.requestBtn}
      </Button>
    </div>
  );
}
