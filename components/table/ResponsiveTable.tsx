import React from "react";
import Image from "next/image";

interface TableRowProps {
  imageSrc: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  value: string;
}

interface ResponsiveTableProps {
  data: TableRowProps[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ data }) => {
  return (
    <div className="px-5 py-10">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-5">
          <thead>
            <tr>
              <th className="w-40 min-w-[300px] p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                Professor
              </th>
              <th className="w-24 p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                Data Início
              </th>
              <th className="w-24 p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                Data Finalização
              </th>
              <th className="w-24 p-3 text-base font-medium tracking-wide text-left text-[#879298]">
                Status
              </th>
              <th className="w-32 p-3 text-base font-medium tracking-wide text-left text-[#879298]">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow key={index} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow: React.FC<TableRowProps> = ({
  imageSrc,
  name,
  startDate,
  endDate,
  status,
  value,
}) => {
  return (
    <tr className="bg-white">
      <td className="px-8 py-9 text-lg text-black whitespace-nowrap rounded-l-lg">
        <div className="flex items-center gap-4">
          <Image
            src={imageSrc}
            alt="Perfil"
            width={50}
            height={50}
            className="object-cover rounded-full w-20 h-20"
          />
          <span className="font-bold text-center">{name}</span>
        </div>
      </td>
      <td className="p-3 text-base text-[#879298] whitespace-nowrap">
        {startDate !== "" ? startDate : "--/--/----"}
      </td>
      <td className="p-3 text-base text-[#879298] whitespace-nowrap">
        {endDate !== "" ? endDate : "--/--/----"}
      </td>
      <td className="p-3 text-sm">
        <span
          className={`p-2 text-base font-medium whitespace-nowrap ${statusStyles[status]}`}
        >
          {status}
        </span>
      </td>
      <td className="p-3 text-lg text-black font-bold rounded-r-lg whitespace-nowrap">
        {value}
      </td>
    </tr>
  );
};

const statusStyles: { [key: string]: string } = {
  Finalizado: "text-green-800 bg-green-200 rounded-lg bg-opacity-50",
  "A Finalizar": "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
  Suporte: "text-[#B93737] bg-[#FFD1D1] rounded-lg bg-opacity-50",
};

export default ResponsiveTable;
