"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Status } from "@prisma/client";
import { Dot } from "lucide-react";

import { RequestWithUsersAndOffers } from "@/types";
import { formatPrice } from "@/libs/utils";
import useUserStore from "@/stores/useUserStore";

interface Props {
  request: RequestWithUsersAndOffers;
}

const ResultCard = ({ request }: Props) => {
  const { userId } = useUserStore();
  const statusStyles: { [key: string]: string } = {
    finished: "text-green-800 bg-green-200 rounded-lg bg-opacity-50",
    inProgress: "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
    searchingProfessor: "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
    finishing: "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
    Suporte: "text-[#B93737] bg-[#FFD1D1] rounded-lg bg-opacity-50",
  };

  const hasOtherUser: boolean = request.users.length === 2;
  const otherUser = request.users.filter((user) => user.id !== userId)[0];
  const otherUserHasPhoto: boolean = hasOtherUser && otherUser.profilePhoto !== null;

  const profileImageUrl = hasOtherUser
    ? otherUserHasPhoto
      ? otherUser.profilePhoto!
      : "/assets/images/default-user-photo.svg"
    : "/assets/images/default-user-photo.svg";

  const profileName = hasOtherUser ? `${otherUser.firstName} ${otherUser.lastName}` : "Não definido";
  const startDate: Date | null = request.beginLessonDate;
  const endDate: Date | null = request.finishLessonDate;
  const status: Status = request.status;
  const price: number = request.offers[0]?.lessonPrice || 0;

  return (
    <div className="w-full bg-white px-7 py-4 rounded-2xl flex flex-col md:grid md:grid-cols-3 md:grid-rows-3">
      <div className="flex flex-col justify-center items-center gap-y-2 pb-2 border-b border-gray-100 md:col-span-full md:row-start-1 md:row-end-2 md:border-0">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={profileImageUrl} alt="Foto de perfil" fill className="object-cover" />
        </div>

        <span className="text-lg md:text-xl font-semibold">{profileName}</span>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2 border-b border-gray-100 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 md:flex-col md:border-0">
        <span className="text-base md:text-lg font-medium text-[#879298]">Data Início:</span>
        <span className="text-base text-gray-primary">
          {startDate ? format(startDate, "dd/MM/yyyy") : "--/--/----"}
        </span>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2 border-b border-gray-100 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 md:flex-col md:border-0">
        <span className="text-base md:text-lg font-medium text-[#879298]">Data Finalização:</span>
        <span className="text-base text-gray-primary">{endDate ? format(endDate, "dd/MM/yyyy") : "--/--/----"}</span>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2 border-b border-gray-100 md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-4 md:flex-col md:border-0">
        <span className="text-base md:text-lg font-medium text-[#879298]">Status: </span>
        <span
          className={`flex gap-x-1 items-center py-1 px-2 text-base font-medium whitespace-nowrap ${statusStyles[status]}`}
        >
          <Dot size={10} strokeWidth={10} />
          {status === Status.inProgress && "Em andamento"}
          {status === Status.support && "Suporte"}
          {status === Status.finished && "Finalizado"}
          {status === Status.finishing && "Finalizando"}
          {status === Status.searchingProfessor && "Aguardando proposta"}
        </span>
      </div>

      <div className="flex justify-center items-center gap-x-2 pt-2 md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3 md:flex-col">
        <span className="text-base md:text-lg font-medium text-[#879298]">Valor: </span>
        <span className="text-lg font-semibold text-gray-primary">{formatPrice(price)}</span>
      </div>
    </div>
  );
};

export default ResultCard;
