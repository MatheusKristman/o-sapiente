"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { professorResumeInfos } from "@/constants/dashboard/resume-br";
import { formatPrice } from "@/libs/utils";
import useResumeStore from "@/stores/useResumeStore";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";

const BalanceBox = () => {
  const { paymentRetrievable } = useResumeStore();
  const { openModal } = useRetrievePaymentModalStore();

  if (paymentRetrievable === undefined || paymentRetrievable === null) {
    return <BalanceBoxSkeleton />;
  }

  return (
    <div className="w-full h-full self-end p-9 bg-green-primary rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full h-full flex flex-col justify-between gap-y-4">
        <div className="w-full flex flex-col gap-y-2">
          <span className="text-lg text-white font-semibold">{professorResumeInfos.availableBalanceInfo}</span>

          <span className="text-2xl text-white font-semibold">{formatPrice(paymentRetrievable)}</span>
        </div>

        <Button onClick={openModal} disabled={paymentRetrievable === 0} variant="secondary" className="w-full">
          {professorResumeInfos.redeemBtn}
        </Button>
      </div>
    </div>
  );
};

function BalanceBoxSkeleton() {
  return (
    <div className="w-full h-full self-end p-9 bg-green-primary rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full h-full flex flex-col justify-between gap-y-4">
        <div className="w-full flex flex-col gap-y-2">
          <span className="text-lg text-white font-semibold">{professorResumeInfos.availableBalanceInfo}</span>

          <span className="text-2xl text-white font-semibold">
            <Skeleton className="h-10 w-20 bg-green-primary brightness-90" />
          </span>
        </div>

        <Skeleton className="h-12 w-full bg-green-primary brightness-90" />
      </div>
    </div>
  );
}

export default BalanceBox;
