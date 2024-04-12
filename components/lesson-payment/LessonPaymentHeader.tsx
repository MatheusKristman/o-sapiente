"use client";

import { useEffect } from "react";

import { info } from "@/constants/lesson-payment/lessonPaymentHeader-br";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import usePaymentStore from "@/stores/usePaymentStore";
import { formatPrice } from "@/libs/utils";

interface Props {
  lessonPrice: number;
}

export function LessonPaymentHeader({ lessonPrice }: Props) {
  const {
    paymentMethod,
    setPaymentMethod,
    certificateIncluded,
    toggleCertificateIncluded,
  } = usePaymentStore();

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
    <div className="w-full pt-12 px-6 mb-9 sm:px-16 lg:container lg:mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-primary mb-6">
        {info.titleGray}{" "}
        <strong className="text-green-primary font-semibold">
          {info.titleGreen}
        </strong>
      </h1>

      <div className="w-fit bg-white px-4 py-3 border-2 border-green-primary rounded-lg flex flex-col mb-6">
        <span className="text-base font-medium text-gray-primary">
          {info.paymentCostLabel}
        </span>

        <span className="text-green-primary font-semibold text-xl">
          {formatPrice(lessonPrice)}
        </span>
      </div>

      <div className="mb-6">
        <Checkbox
          id="includeCertificate"
          checked={certificateIncluded}
          onCheckedChange={toggleCertificateIncluded}
        />

        <label
          htmlFor="includeCertificate"
          className="ml-2 text-base font-medium text-gray-primary"
        >
          {info.certifiedLabel}
        </label>
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
          {info.creditCardBtn}
        </Button>
      </div>
    </div>
  );
}
