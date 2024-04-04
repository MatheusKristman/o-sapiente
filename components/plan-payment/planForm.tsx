"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import axios from "axios";

import { PaymentCardForm } from "@/components/PaymentCardForm";
import { PaymentPersonalDataForm } from "@/components/PaymentPersonalDataForm";
import { Form } from "@/components/ui/form";
import usePaymentStore from "@/stores/usePaymentStore";

const dateReg = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const planSchema = z.object({
  birth: z.date(),
  ddd: z.string().min(2, { message: "Formato do DDD inválido" }),
  cel: z.string().min(10, { message: "Telefone inválido" }),
  cep: z.string(),
  city: z.string(),
  state: z.string(),
  address: z.string(),
  addressNumber: z.string(),
  district: z.string(),
  complement: z.string(),
});

const planSchemaForCredit = z.object({
  birth: z.date(),
  ddd: z.string().min(2, { message: "Formato do DDD inválido" }),
  cel: z.string().min(10, { message: "Telefone inválido" }),
  cep: z.string(),
  city: z.string(),
  state: z.string(),
  address: z.string(),
  addressNumber: z.string(),
  district: z.string(),
  complement: z.string(),
  creditNumber: z.string().min(16, { message: "Numero do cartão inválido" }),
  creditOwner: z.string().min(4, { message: "Nome é obrigatório" }),
  creditExpiry: z
    .string()
    .min(5, { message: "Data de nascimento é obrigatório" })
    .refine((val) => !dateReg.test(val), {
      message: "Data de nascimento inválida",
    }),
  creditCvc: z.string().min(3, { message: "Código de segurança inválido" }),
});

export const PlanForm = () => {
  const { paymentMethod, planSelected } = usePaymentStore();

  const form = useForm<z.infer<typeof planSchema | typeof planSchemaForCredit>>(
    {
      resolver: zodResolver(
        // @ts-ignore
        paymentMethod === "credit_card" ? planSchemaForCredit : planSchema
      ),
      defaultValues: {
        birth: undefined,
        ddd: "",
        cel: "",
        cep: "",
        city: "",
        state: "",
        address: "",
        addressNumber: "",
        district: "",
        complement: "",
        creditNumber: "",
        creditOwner: "",
        creditExpiry: "",
        creditCvc: "",
      },
    }
  );

  const creditNumber = form.watch("creditNumber");
  const creditOwner = form.watch("creditOwner");
  const creditExpiry = form.watch("creditExpiry");
  const creditCvc = form.watch("creditCvc");

  function onSubmit(
    values: z.infer<typeof planSchema | typeof planSchemaForCredit>
  ) {
    // TODO: adicionar request para /payment/plan e testar
    console.log(values);

    axios
      .post("/api/payment/plan", {
        ...values,
        planName: planSelected?.planName,
        planPrice: planSelected?.cost,
        planId: planSelected?.id,
        paymentMethod,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDDDFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 2);

    form.setValue("ddd", value);
  }

  function handleCelFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 9);
    const formattedNumber = value.replace(/(\d{5})(\d{4})/, "$1-$2");

    form.setValue("cel", formattedNumber);
  }

  function handleCreditNumberFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 16);
    const formattedNumber = value.replace(
      /(\d{4})(\d{4})(\d{4})(\d{4})/,
      "$1 $2 $3 $4"
    );

    form.setValue("creditNumber", formattedNumber);
  }

  function handleCreditExpiryFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 4);
    const formattedDate = value.replace(/(\d{2})(\d{2})/, "$1/$2");

    form.setValue("creditExpiry", formattedDate);
  }

  function handleCreditCvcFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 4);

    form.setValue("creditCvc", value);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PaymentPersonalDataForm
          control={form.control}
          handleDDDFormat={handleDDDFormat}
          handleCelFormat={handleCelFormat}
        />
        <PaymentCardForm
          control={form.control}
          setValue={form.setValue}
          handleCreditNumberFormat={handleCreditNumberFormat}
          handleCreditExpiryFormat={handleCreditExpiryFormat}
          handleCreditCvcFormat={handleCreditCvcFormat}
          creditNumber={creditNumber}
          creditOwner={creditOwner}
          creditExpiry={creditExpiry}
          creditCvc={creditCvc}
        />
      </form>
    </Form>
  );
};
