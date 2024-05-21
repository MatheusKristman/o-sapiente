import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  title: string;
  desc: string;
  createdAt: Date;
  student: string;
}

const RecentsRequestsCard = ({ title, desc, createdAt, student }: Props) => {
  return (
    <div className="w-full h-full px-6 py-8 bg-white rounded-2xl shadow-lg flex flex-col justify-between gap-9">
      <div className="flex flex-col gap-6">
        <h4 className="text-xl text-[#2C383F] font-semibold">{title}</h4>

        <p className="text-base text-[#2C383F] line-clamp-3">{desc}</p>
      </div>

      <div className="w-full flex justify-between items-center">
        <p className="text-[13px] text-black text-opacity-50">
          {format(new Date(createdAt), "MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </p>
        <p className="text-[13px] text-black text-opacity-50">{student}</p>
      </div>
    </div>
  );
};

export default RecentsRequestsCard;
