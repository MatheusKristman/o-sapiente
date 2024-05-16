import { Button } from "@/components/ui/button";
import { professorResumeInfos } from "@/constants/dashboard/resume-br";
import { formatPrice } from "@/libs/utils";
import useResumeStore from "@/stores/useResumeStore";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";
import { useEffect } from "react";

const BalanceBox = () => {
  const { paymentRetrievable } = useResumeStore();
  const { openModal } = useRetrievePaymentModalStore();

  // TODO: ajustar primeiro o webhook de pagamento, para depois ajustar o valor de resgate
  useEffect(() => {
    console.log(paymentRetrievable);
  }, [paymentRetrievable]);

  return (
    <div className="w-full h-full self-end p-9 bg-green-primary rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full h-full flex flex-col justify-between gap-y-4">
        <div className="w-full flex flex-col gap-y-2">
          <span className="text-lg text-white font-semibold">
            {professorResumeInfos.availableBalanceInfo}
          </span>

          <span className="text-2xl text-white font-semibold">
            {formatPrice(paymentRetrievable)}
          </span>
        </div>

        <Button
          onClick={openModal}
          disabled={paymentRetrievable === 0}
          variant="secondary"
          className="w-full"
        >
          {professorResumeInfos.redeemBtn}
        </Button>
      </div>
    </div>
  );
};

export default BalanceBox;
