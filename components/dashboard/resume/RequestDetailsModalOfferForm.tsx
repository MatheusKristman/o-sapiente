import { requestDetailsOfferFormInfo } from "@/constants/requestDetails-br";

const RequestDetailsModalOfferForm = () => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
        {requestDetailsOfferFormInfo.title}
      </h3>
    </div>
  );
};

export default RequestDetailsModalOfferForm;
