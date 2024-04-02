"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PaymentCardForm } from "@/components/PaymentCardForm";
import { PaymentPersonalDataForm } from "@/components/PaymentPersonalDataForm";
import { Form } from "@/components/ui/form";

const dateReg = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const planSchema = z.object({
  birth: z
    .string()
    .min(8, { message: "Data de nascimento é obrigatório" })
    .refine((val) => !dateReg.test(val), {
      message: "Data de nascimento inválida",
    }),
  ddd: z.string().min(2, { message: "Formato do DDD inválido" }),
  cel: z.string().min(10, { message: "Telefone inválido" }),
  cep: z.string(),
  city: z.string(),
  state: z.string(),
  address: z.string(),
  addressNumber: z.string(),
  district: z.string(),
  complement: z.string(),
  creditNumber: z
    .string()
    .min(16, { message: "Numero do cartão inválido" })
    .optional(),
  creditOwner: z.string().min(4, { message: "Nome é obrigatório" }).optional(),
  creditExpiry: z
    .string()
    .min(8, { message: "Data de nascimento é obrigatório" })
    .refine((val) => !dateReg.test(val), {
      message: "Data de nascimento inválida",
    })
    .optional(),
  creditCvc: z
    .string()
    .min(3, { message: "Código de segurança inválido" })
    .optional(),
});

export const PlanForm = () => {
  const form = useForm<z.infer<typeof planSchema>>({
    // @ts-ignore
    resolver: zodResolver(planSchema),
    defaultValues: {
      birth: "",
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
  });

  function onSubmit(values: z.infer<typeof planSchema>) {
    console.log(values);
  }

  // function handleBirth(event: ChangeEvent<HTMLInputElement>) {
  //   const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 8);
  //   const formattedDate = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

  //   setValue("birth", formattedDate);
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PaymentPersonalDataForm control={form.control} />
        <PaymentCardForm />
      </form>
    </Form>
  );
};
