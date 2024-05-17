"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import axios from "axios";

import { PaymentCardForm } from "@/components/PaymentCardForm";
import { PaymentPersonalDataForm } from "@/components/PaymentPersonalDataForm";
import { Form } from "@/components/ui/form";
import usePaymentStore from "@/stores/usePaymentStore";
import { Offer, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const dateReg = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const planSchema = z.object({
  name: z.string().min(4, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  cpf: z.string().min(14, { message: "CPF inválido" }),
  birth: z.date(),
  cel: z.string().min(12, { message: "Celular inválido" }),
  country: z.string().min(2, { message: "País é obrigatório" }),
  cep: z.string().min(9, { message: "CEP é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  addressNumber: z
    .string()
    .min(1, { message: "Numero do endereço é obrigatório" }),
  district: z.string().min(1, { message: "Bairro é obrigatório" }),
  complement: z.string(),
});

const planSchemaForCredit = z.object({
  name: z.string().min(4, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  cpf: z.string().min(14, { message: "CPF inválido" }),
  birth: z.date(),
  cel: z.string().min(12, { message: "Celular inválido" }),
  country: z.string().min(2, { message: "País é obrigatório" }),
  cep: z.string().min(9, { message: "CEP é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  addressNumber: z
    .string()
    .min(1, { message: "Numero do endereço é obrigatório" }),
  district: z.string().min(1, { message: "Bairro é obrigatório" }),
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

interface Props {
  currentUser: User;
  offer: Offer;
}

export function LessonPaymentForm({ currentUser, offer }: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { paymentMethod, certificateIncluded } = usePaymentStore();

  const router = useRouter();

  const form = useForm<z.infer<typeof planSchema | typeof planSchemaForCredit>>(
    {
      resolver: zodResolver(
        // @ts-ignore
        paymentMethod === "credit_card" ? planSchemaForCredit : planSchema
      ),
      defaultValues: {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        cpf: "",
        birth: undefined,
        cel: "",
        country: "",
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
    setIsSubmitting(true);

    axios
      .post("/api/payment/lesson", {
        ...values,
        lessonPrice: offer.lessonPrice,
        offerId: offer.id,
        paymentMethod,
        certificateRequested: certificateIncluded,
      })
      .then((res) => {
        if (res.data.charges[0].payment_method === "pix") {
          router.replace(
            `/pagamento-da-aula/${offer.id}/pos-pagamento?user_type=${res.data.userType}&transaction_type=${res.data.charges[0].payment_method}&status=${res.data.charges[0].last_transaction.status}&qr_code_url=${res.data.charges[0].last_transaction.qr_code_url}&pix_code=${res.data.charges[0].last_transaction.qr_code}&expires_at=${res.data.charges[0].last_transaction.expires_at}`
          );
          return;
        }

        if (res.data.charges[0].payment_method === "boleto") {
          router.replace(
            `/pagamento-da-aula/${offer.id}/pos-pagamento?user_type=${res.data.userType}&transaction_type=${res.data.charges[0].payment_method}&status=${res.data.charges[0].last_transaction.status}&pdf=${res.data.charges[0].last_transaction.pdf}&boleto_code=${res.data.charges[0].last_transaction.line}`
          );
          return;
        }

        router.replace(
          `/pagamento-da-aula/${offer.id}/pos-pagamento?user_type=${res.data.userType}&transaction_type=${res.data.charges[0].payment_method}&status=${res.data.charges[0].last_transaction.status}`
        );
      })
      .catch((error) => {
        toast.error(
          "Ocorreu um erro durante o pagamento, verifique os dados e tente novamente"
        );
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleCPFFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 14);
    const formattedNumber = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    form.setValue("cpf", formattedNumber);
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
          handleCPFFormat={handleCPFFormat}
          currentUser={currentUser}
          isSubmitting={isSubmitting}
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
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
