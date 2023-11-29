import Image from "next/image";

import { TableRowProps } from "./TableRow";
import { Dot } from "lucide-react";

const ResultCard = ({ imageSrc, name, startDate, endDate, status, value }: TableRowProps) => {
  const statusStyles: { [key: string]: string } = {
    Finalizado: "text-green-800 bg-green-200 rounded-lg bg-opacity-50",
    "A Finalizar": "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
    Suporte: "text-[#B93737] bg-[#FFD1D1] rounded-lg bg-opacity-50",
  };

  return (
    <div className="w-full bg-white px-7 py-4 rounded-2xl flex flex-col md:grid md:grid-cols-4 md:grid-rows-2">
      <div className="flex flex-col justify-center items-center gap-y-2 pb-2 border-b border-gray-100 md:col-span-full md:row-start-1 md:row-end-1 md:border-0">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={imageSrc} alt="Foto de perfil" fill className="object-cover" />
        </div>

        <span className="text-lg font-semibold">{name}</span>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2 border-b border-gray-100 md:col-start-1 md:col-end-1 md:row-start-2 md:row-end-2 md:flex-col md:border-0">
        <span className="text-base font-medium text-[#879298]">Data Início:</span>
        <span className="text-base text-gray-primary">
          {startDate !== "" ? startDate : "--/--/----"}
        </span>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2 border-b border-gray-100 md:col-start-2 md:col-end-2 md:row-start-2 md:row-end-2 md:flex-col md:border-0">
        <span className="text-base font-medium text-[#879298]">Data Finalização:</span>
        <span className="text-base text-gray-primary">
          {endDate !== "" ? endDate : "--/--/----"}
        </span>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2 border-b border-gray-100 md:col-start-3 md:col-end-3 md:row-start-2 md:row-end-2 md:flex-col md:border-0">
        <span className="text-base font-medium text-[#879298]">Status: </span>
        <span
          className={`flex gap-x-1 items-center py-1 px-2 text-base font-medium whitespace-nowrap ${statusStyles[status]}`}>
          <Dot size={10} strokeWidth={10} />
          {status}
        </span>
      </div>

      <div className="flex justify-center items-center gap-x-2 pt-2 md:col-start-4 md:col-end-4 md:row-start-2 md:row-end-2 md:flex-col">
        <span className="text-base font-medium text-[#879298]">Valor: </span>
        <span className="text-lg font-semibold text-gray-primary">{value}</span>
      </div>
    </div>
  );
};

export default ResultCard;
