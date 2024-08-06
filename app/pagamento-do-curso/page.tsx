"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CoursePaymentButtons } from "@/components/course-payment/CoursePaymentButtons";
import { CoursePaymentForm } from "@/components/course-payment/CoursePaymentForm";
import { coursePaymentInfo } from "@/constants/course-payment";
import { formatPrice } from "@/libs/utils";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const dateReg = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Nome obrigatório" })
      .min(4, { message: "Precisa ter no mínimo 4 caracteres" }),
    email: z
      .string()
      .min(1, { message: "E-mail obrigatório" })
      .email({ message: "E-mail inválido" }),
    cpf: z
      .string()
      .min(1, { message: "CPF obrigatório" })
      .min(14, { message: "CPF inválido" }),
    birthDate: z.date({
      required_error: "Data de nascimento obrigatória",
      invalid_type_error: "Data de nascimento inválida",
    }),
    tel: z.string().min(12, { message: "Celular inválido" }),
    country: z.string().min(1, { message: "País obrigatório" }),
    city: z.string().min(1, { message: "Cidade obrigatória" }),
    state: z.string().min(1, { message: "Estado obrigatório" }),
    address: z.string().min(1, { message: "Endereço obrigatório" }),
    addressNumber: z
      .string()
      .min(1, { message: "Número do endereço obrigatório" }),
    cep: z.string().min(1, { message: "CEP obrigatório" }),
    district: z.string().min(1, { message: "Bairro obrigatório" }),
    complement: z.string(),
    paymentMethod: z.enum(["credit", "pix", "boleto"]),
    creditNumber: z.string(),
    creditOwner: z.string(),
    creditExpiry: z.string(),
    creditCvc: z.string(),
  })
  .superRefine(
    (
      { paymentMethod, creditNumber, creditOwner, creditExpiry, creditCvc },
      ctx,
    ) => {
      if (paymentMethod === "credit" && creditNumber.length < 16) {
        ctx.addIssue({
          path: ["creditNumber"],
          code: "custom",
          message: "Número do cartão inválido",
        });
      }

      if (paymentMethod === "credit" && creditOwner.length < 4) {
        ctx.addIssue({
          path: ["creditOwner"],
          code: "custom",
          message: "Titular do cartão inválido",
        });
      }

      if (
        paymentMethod === "credit" &&
        creditExpiry.length < 5 &&
        !dateReg.test(creditExpiry)
      ) {
        ctx.addIssue({
          path: ["creditExpiry"],
          code: "custom",
          message: "Data de validade inválida",
        });
      }

      if (paymentMethod === "credit" && creditCvc.length < 3) {
        ctx.addIssue({
          path: ["creditCvc"],
          code: "custom",
          message: "CVV inválido",
        });
      }
    },
  );

//TODO: criar formulário para o pagamento

export default function CoursePaymentPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      birthDate: undefined,
      tel: "",
      country: "",
      city: "",
      state: "",
      address: "",
      addressNumber: "",
      cep: "",
      district: "",
      complement: "",
      paymentMethod: "pix",
      creditNumber: "",
      creditOwner: "",
      creditExpiry: "",
      creditCvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col relative">
        <div className="w-full px-6 flex flex-col-reverse gap-12">
          <CoursePaymentForm form={form} />

          <div className="bg-[#E2EBEF] px-6 py-9 rounded-2xl flex flex-col gap-8">
            <div className="w-full flex flex-col items-center">
              <span className="text-gray-primary text-base font-medium">
                {coursePaymentInfo.totalCostLabel}
              </span>

              <span className="text-green-primary font-semibold text-3xl text-center">
                {formatPrice(499.99)}
              </span>

              <div className="flex items-center gap-2">
                <Image
                  src="assets/icons/lock.svg"
                  alt="Seguro"
                  width={24}
                  height={24}
                />

                <span className="text-[#5A727D] text-sm">
                  {coursePaymentInfo.securePaymentInfo}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-[#C8D6DF]" />

            <span className="text-[#5A727D] text-base font-medium">
              {coursePaymentInfo.resume}
            </span>

            <div className="w-full flex items-center justify-between">
              <span className="text-gray-primary text-base font-medium">
                Constitucional do Zero
              </span>

              <span className="text-gray-primary text-base font-medium">
                {formatPrice(499.99)}
              </span>
            </div>

            <div className="w-full h-px bg-[#C8D6DF]" />

            <div className="w-full flex items-center justify-between">
              <span className="text-[#5A727D] text-base font-medium">
                {coursePaymentInfo.subtotal}
              </span>

              <span className="text-[#5A727D] text-base font-medium">
                {formatPrice(499.99)}
              </span>
            </div>

            <div className="w-full h-px bg-[#C8D6DF]" />

            <div className="w-full flex items-center justify-between">
              <span className="text-[#37474F] text-lg font-semibold">
                {coursePaymentInfo.total}
              </span>

              <span className="text-[#37474F] text-lg font-semibold">
                {formatPrice(499.99)}
              </span>
            </div>

            <CoursePaymentButtons className="hidden lg:flex" />
          </div>
        </div>

        <CoursePaymentButtons className="bg-[#f0f5f8] sticky bottom-0 py-6 px-6 shadow-[0px_-2px_30px_rgba(0,0,0,0.25)] lg:hidden" />
      </form>
    </Form>
  );
}
