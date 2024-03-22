"use client";

import { info } from "@/constants/plan-payment/plan-header-br";
import { PlanOption } from "./planOption";
import { cn } from "@/libs/utils";
import { useState } from "react";

export function PlanHeader() {
  // TODO: para teste, depois aplicar logica do gateway de pagamento
  const [paymentType, setPaymentType] = useState<"pix" | "credit">("pix");

  function handlePixSelect() {
    if (paymentType === "pix") {
      return;
    }

    setPaymentType("pix");
  }

  function handleCreditSelect() {
    if (paymentType === "credit") {
      return;
    }

    setPaymentType("credit");
  }

  return (
    <div className="w-full px-6 my-12 sm:px-16 lg:container lg:mx-auto lg:flex lg:justify-between lg:items-center lg:gap-12">
      <div className="w-full bg-green-primary px-6 py-9 rounded-xl mb-9 lg:mb-0 lg:max-w-md">
        <p className="text-white font-normal text-base sm:text-lg">
          {info.greenBox}
        </p>
      </div>

      <div className="w-full">
        <h2 className="text-2xl text-gray-primary font-semibold mb-6 sm:text-3xl">
          {info.title}{" "}
          <strong className="font-semibold text-green-primary">
            {info.titleGreen}
          </strong>
        </h2>

        <div className="w-full flex flex-col gap-y-4 mb-6 sm:flex-row">
          <PlanOption />
        </div>

        <div className="w-full flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={handlePixSelect}
            className={cn("w-full sm:w-[230.41px]", {
              "green-button": paymentType === "pix",
              "outline-green-button": paymentType === "credit",
            })}
          >
            {info.pixBtn}
          </button>

          <button
            type="button"
            onClick={handleCreditSelect}
            className={cn("w-full sm:w-fit", {
              "green-button": paymentType === "credit",
              "outline-green-button": paymentType === "pix",
            })}
          >
            {info.cardBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
