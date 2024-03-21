"use client";

import { ChangeEvent, useState } from "react";
import Cards from "react-credit-cards-2";

import { info } from "@/constants/paymentCardForm-br";
import { cn } from "@/libs/utils";
import { PaymentButtons } from "./PaymentButtons";

type stateType = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: "name" | "cvc" | "expiry" | "number";
};

export function PaymentCardForm() {
  const [state, setState] = useState<stateType>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "name",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setState((prev: stateType) => ({ ...prev, [name]: value }));
  }

  function handleInputFocus(event: ChangeEvent<HTMLInputElement>) {
    setState((prev: stateType) => ({
      ...prev,
      focus: event.target.name as stateType["focus"],
    }));
  }

  return (
    <div className="w-full px-6 mb-12 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row lg:justify-between">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />

      <div className="w-full flex flex-col gap-12 lg:max-w-xl">
        <div className="w-full bg-white px-6 py-9 rounded-2xl shadow-md shadow-black/25 flex flex-col gap-2 ">
          <h3 className="text-xl text-gray-primary font-semibold">
            {info.title}
          </h3>

          <div className="w-full flex flex-col gap-4">
            <input
              maxLength={16}
              name="number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={info.numberCardPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <input
              name="name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={info.ownerCardPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <input
              maxLength={5}
              name="expiry"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={info.validityCardPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <input
              maxLength={3}
              name="cvc"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={info.cvvCardPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />
          </div>
        </div>

        <PaymentButtons />
      </div>
    </div>
  );
}
