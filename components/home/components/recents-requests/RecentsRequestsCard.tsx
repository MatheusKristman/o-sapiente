import { recentsRequestsInfo } from "@/constants/recentsRequests-br";

const RecentsRequestsCard = () => {
  return (
    <div className="w-full px-6 py-8 bg-white rounded-2xl shadow-lg">
      <h4 className="text-xl text-[#2C383F] font-semibold mb-6">
        {recentsRequestsInfo.card.title}
      </h4>

      <p className="text-base text-[#2C383F] mb-9">{recentsRequestsInfo.card.desc}</p>

      <div className="w-full flex justify-between items-center">
        <p className="text-[13px] text-black text-opacity-50">{recentsRequestsInfo.card.date}</p>
        <p className="text-[13px] text-black text-opacity-50">{recentsRequestsInfo.card.student}</p>
      </div>
    </div>
  );
};

export default RecentsRequestsCard;
