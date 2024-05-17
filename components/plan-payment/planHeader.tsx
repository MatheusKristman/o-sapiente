"use client";

import { useEffect, useState } from "react";
import { Plan } from "@prisma/client";

import { info } from "@/constants/plan-payment/plan-header-br";
import { PlanOption } from "./planOption";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import usePaymentStore from "@/stores/usePaymentStore";

interface Props {
  plans: Plan[];
}

export function PlanHeader({ plans }: Props) {
  const { paymentMethod, setPaymentMethod, planSelected, setPlanSelected } =
    usePaymentStore();

  useEffect(() => {
    setPlanSelected(plans[0]);
  }, [plans, setPlanSelected]);

  function handlePixSelect() {
    if (paymentMethod === "pix") {
      return;
    }

    setPaymentMethod("pix");
  }

  function handleBoletoSelect() {
    if (paymentMethod === "boleto") {
      return;
    }

    setPaymentMethod("boleto");
  }

  function handleCreditSelect() {
    if (paymentMethod === "credit_card") {
      return;
    }

    setPaymentMethod("credit_card");
  }

  return (
    <div className="w-full px-6 my-12 sm:px-16 lg:container lg:mx-auto xl:flex xl:justify-between xl:items-center xl:gap-12">
      <div className="w-full bg-green-primary px-6 py-9 rounded-xl mb-9 xl:mb-0 xl:max-w-md">
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
          {plans.map((plan) => (
            <PlanOption
              key={plan.id}
              plan={plan}
              selected={planSelected?.id === plan.id}
            />
          ))}
        </div>

        <div className="w-full flex flex-col gap-4 sm:flex-row">
          <Button
            variant={paymentMethod === "pix" ? "default" : "outline"}
            type="button"
            onClick={handlePixSelect}
            className="w-full sm:w-[230.41px]"
          >
            {info.pixBtn}
          </Button>

          <Button
            variant={paymentMethod === "boleto" ? "default" : "outline"}
            type="button"
            onClick={handleBoletoSelect}
            className="w-full sm:w-[230.41px]"
          >
            {info.boletoBtn}
          </Button>

          <Button
            variant={paymentMethod === "credit_card" ? "default" : "outline"}
            type="button"
            onClick={handleCreditSelect}
            className="w-full sm:w-fit"
          >
            {info.cardBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
