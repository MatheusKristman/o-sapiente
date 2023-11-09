import React from "react";

import ResultCard from "@/components/dashboard/history/ResultCard";
import TableRow, { TableRowProps } from "@/components/dashboard/history/TableRow";

interface ResponsiveTableProps {
  data: TableRowProps[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ data }) => {
  return (
    <div className="relative pb-12 pt-12">
      <div className="sticky top-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" />
      <div className="hidden lg:block sm:overflow-x-auto">
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

      <div className="relative w-full flex flex-col gap-y-5 overflow-y-auto max-h-80 md:max-h-[500px] lg:hidden">
        <div className="sticky top-0 left-0 w-full h-6 min-h-[24px] bg-gradient-to-b from-[#F0F5F8] to-transparent z-[9]" />

        <ResultCard {...data[0]} />

        <ResultCard {...data[1]} />

        <ResultCard {...data[2]} />

        <div className="sticky bottom-0 left-0 w-full h-6 min-h-[24px] bg-gradient-to-t from-[#F0F5F8] to-transparent z-[9]" />
      </div>
    </div>
  );
};

export default ResponsiveTable;
