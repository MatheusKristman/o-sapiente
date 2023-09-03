import { recentsRequestsInfo } from "@/constants/recentsRequests-br";
import RecentsRequestsSlider from "@/components/home/components/recents-requests/RecentsRequestsSlider";

const RecentsRequests = () => {
  return (
    <div className="w-full">
      <h1 className="w-full mx-auto px-6 md:px-16 text-2xl text-[#2C383F] font-semibold lg:container">
        {recentsRequestsInfo.title}
      </h1>

      <RecentsRequestsSlider />
    </div>
  );
};

export default RecentsRequests;
