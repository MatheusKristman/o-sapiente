"use client";

import { ChangeEvent, useState } from "react";
import Cards from "react-credit-cards-2";
import { Control, SetValueConfig, UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";

import { info } from "@/constants/paymentCardForm-br";
import { cn } from "@/libs/utils";
import { PaymentButtons } from "@/components/PaymentButtons";
import usePaymentStore from "@/stores/usePaymentStore";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

type stateType = {
  creditNumber: string;
  creditExpiry: string;
  creditCvc: string;
  creditOwner: string;
  focus: "name" | "cvc" | "expiry" | "number";
};

interface Props {
  control: Control<
    | {
        name: string;
        email: string;
        cpf: string;
        birth: Date;
        cel: string;
        country: string;
        cep: string;
        city: string;
        state: string;
        address: string;
        addressNumber: string;
        district: string;
        complement: string;
      }
    | {
        name: string;
        email: string;
        cpf: string;
        birth: Date;
        cel: string;
        country: string;
        cep: string;
        city: string;
        state: string;
        address: string;
        addressNumber: string;
        district: string;
        complement: string;
        creditNumber: string;
        creditExpiry: string;
        creditOwner: string;
        creditCvc: string;
      }
  >;
  setValue: UseFormSetValue<
    | {
        name: string;
        email: string;
        cpf: string;
        birth: Date;
        cel: string;
        country: string;
        cep: string;
        city: string;
        state: string;
        address: string;
        addressNumber: string;
        district: string;
        complement: string;
      }
    | {
        name: string;
        email: string;
        cpf: string;
        birth: Date;
        cel: string;
        country: string;
        cep: string;
        city: string;
        state: string;
        address: string;
        addressNumber: string;
        district: string;
        complement: string;
        creditNumber: string;
        creditExpiry: string;
        creditOwner: string;
        creditCvc: string;
      }
  >;
  handleCreditNumberFormat: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreditExpiryFormat: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreditCvcFormat: (event: ChangeEvent<HTMLInputElement>) => void;
  creditNumber: string;
  creditOwner: string;
  creditExpiry: string;
  creditCvc: string;
  isSubmitting: boolean;
}

export function PaymentCardForm({
  control,
  setValue,
  handleCreditNumberFormat,
  handleCreditExpiryFormat,
  handleCreditCvcFormat,
  creditNumber,
  creditOwner,
  creditExpiry,
  creditCvc,
  isSubmitting,
}: Props) {
  const [state, setState] = useState<stateType>({
    creditNumber: "",
    creditExpiry: "",
    creditCvc: "",
    creditOwner: "",
    focus: "number",
  });

  const { paymentMethod } = usePaymentStore();

  function handleInputFocus(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.name;
    let name: stateType["focus"];

    switch (value) {
      case "creditNumber":
        name = "number";
        break;
      case "creditExpiry":
        name = "expiry";
        break;
      case "creditOwner":
        name = "name";
        break;
      case "creditCvc":
        name = "cvc";
        break;
      default:
        toast.error("Erro ao selecionar o campo dos dados do cartão");
    }

    setState((prev: stateType) => ({
      ...prev,
      focus: name,
    }));
  }

  return (
    <>
      {paymentMethod === "credit_card" ? (
        <div className="w-full px-6 mb-12 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row lg:justify-between">
          <Cards number={creditNumber} expiry={creditExpiry} cvc={creditCvc} name={creditOwner} focused={state.focus} />

          <div className="w-full flex flex-col gap-12 lg:max-w-xl">
            <div className="w-full bg-white px-6 py-9 rounded-2xl shadow-md shadow-black/25 flex flex-col gap-2 ">
              <h3 className="text-xl text-gray-primary font-semibold">{info.title}</h3>

              <div className="w-full flex flex-col gap-4">
                <FormField
                  control={control}
                  name="creditNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          maxLength={19}
                          onFocus={handleInputFocus}
                          placeholder={info.numberCardPlaceholder}
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={handleCreditNumberFormat}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="creditOwner"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          onFocus={handleInputFocus}
                          placeholder={info.ownerCardPlaceholder}
                          className={cn("input", {
                            "input-error": false,
                          })}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="creditExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          maxLength={5}
                          onFocus={handleInputFocus}
                          placeholder={info.validityCardPlaceholder}
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={handleCreditExpiryFormat}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="creditCvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          maxLength={4}
                          onFocus={handleInputFocus}
                          placeholder={info.cvvCardPlaceholder}
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={handleCreditCvcFormat}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <PaymentButtons isSubmitting={isSubmitting} />
          </div>
        </div>
      ) : (
        <div className="w-full px-6 mb-12 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row lg:justify-end">
          <div className="w-full flex flex-col gap-12 lg:max-w-xl">
            <PaymentButtons isSubmitting={isSubmitting} />
          </div>
        </div>
      )}
    </>
  );
}
