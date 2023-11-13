import Image from "next/image";

export interface TableRowProps {
  imageSrc: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  value: string;
}

const TableRow: React.FC<TableRowProps> = ({
  imageSrc,
  name,
  startDate,
  endDate,
  status,
  value,
}) => {
  const statusStyles: { [key: string]: string } = {
    Finalizado: "text-green-800 bg-green-200 rounded-lg bg-opacity-50",
    "A Finalizar": "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
    Suporte: "text-[#B93737] bg-[#FFD1D1] rounded-lg bg-opacity-50",
  };

  return (
    <tr className="bg-white">
      <td className="px-8 py-4 text-lg text-black whitespace-nowrap rounded-l-2xl">
        <div className="flex items-center gap-4">
          <Image
            src={imageSrc}
            alt="Perfil"
            width={50}
            height={50}
            className="object-cover rounded-full w-20 h-20"
          />
          <span className="font-semibold text-center">{name}</span>
        </div>
      </td>
      <td className="p-4 text-base text-[#879298] whitespace-nowrap">
        {startDate !== "" ? startDate : "--/--/----"}
      </td>
      <td className="p-4 text-base text-[#879298] whitespace-nowrap">
        {endDate !== "" ? endDate : "--/--/----"}
      </td>
      <td className="p-4 text-sm">
        <span className={`p-2 text-base font-medium whitespace-nowrap ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
      <td className="p-4 text-lg text-black font-semibold rounded-r-2xl whitespace-nowrap">
        {value}
      </td>
    </tr>
  );
};

export default TableRow;
