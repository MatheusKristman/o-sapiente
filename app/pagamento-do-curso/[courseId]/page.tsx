"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

import { CoursePaymentButtons } from "@/components/course-payment/CoursePaymentButtons";
import { CoursePaymentForm } from "@/components/course-payment/CoursePaymentForm";
import { coursePaymentInfo } from "@/constants/course-payment";
import { formatPrice } from "@/libs/utils";
import { Form } from "@/components/ui/form";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "@/components/LoadingComponent";
import toast from "react-hot-toast";

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
    paymentMethod: z.enum(["credit_card", "pix", "boleto"]),
    creditNumber: z.string(),
    creditOwner: z.string(),
    creditExpiry: z.string(),
    creditCvc: z.string(),
    installments: z.string(),
  })
  .superRefine(
    (
      { paymentMethod, creditNumber, creditOwner, creditExpiry, creditCvc },
      ctx,
    ) => {
      if (paymentMethod === "credit_card" && creditNumber.length < 16) {
        ctx.addIssue({
          path: ["creditNumber"],
          code: "custom",
          message: "Número do cartão inválido",
        });
      }

      if (paymentMethod === "credit_card" && creditOwner.length < 4) {
        ctx.addIssue({
          path: ["creditOwner"],
          code: "custom",
          message: "Titular do cartão inválido",
        });
      }

      if (
        paymentMethod === "credit_card" &&
        creditExpiry.length < 5 &&
        !dateReg.test(creditExpiry)
      ) {
        ctx.addIssue({
          path: ["creditExpiry"],
          code: "custom",
          message: "Data de validade inválida",
        });
      }

      if (paymentMethod === "credit_card" && creditCvc.length < 3) {
        ctx.addIssue({
          path: ["creditCvc"],
          code: "custom",
          message: "CVV inválido",
        });
      }
    },
  );

export default function CoursePaymentPage({
  params,
}: {
  params: { courseId: string };
}) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const courseId = params.courseId;
  const router = useRouter();

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
      installments: "1",
    },
  });

  useEffect(() => {
    axios
      .get(`/api/courses/get-by-id/${courseId}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.error(error);

        router.push("/");
      });
  }, [courseId, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!course) {
      return;
    }

    setIsSubmitting(true);

    axios
      .post("/api/payment/course", {
        ...values,
        courseName: course.courseName,
        coursePrice: course.price,
        courseId: course.id,
        paymentMethod: form.getValues("paymentMethod"),
      })
      .then((res) => {
        if (res.data.charges[0].payment_method === "pix") {
          router.replace(
            `/pagamento-do-curso/pos-pagamento?transaction_type=${res.data.charges[0].payment_method}&status=${res.data.charges[0].last_transaction.status}&qr_code_url=${res.data.charges[0].last_transaction.qr_code_url}&pix_code=${res.data.charges[0].last_transaction.qr_code}&expires_at=${res.data.charges[0].last_transaction.expires_at}&course_name=${course.courseName}&course_id=${course.id}`,
          );
          return;
        }

        if (res.data.charges[0].payment_method === "boleto") {
          router.replace(
            `/pagamento-do-curso/pos-pagamento?transaction_type=${res.data.charges[0].payment_method}&status=${res.data.charges[0].last_transaction.status}&pdf=${res.data.charges[0].last_transaction.pdf}&boleto_code=${res.data.charges[0].last_transaction.line}&course_name=${course.courseName}&course_id=${course.id}`,
          );
          return;
        }

        router.replace(
          `/pagamento-do-curso/pos-pagamento?transaction_type=${res.data.charges[0].payment_method}&status=${res.data.charges[0].last_transaction.status}&course_name=${course.courseName}&course_id=${course.id}`,
        );
      })
      .catch((error) => {
        toast.error(
          "Ocorreu um erro durante o pagamento, verifique os dados e tente novamente",
        );
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    console.log(values);
  }

  if (!course) {
    return <LoadingComponent />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col relative mt-24"
      >
        <div className="w-full px-6 flex flex-col-reverse gap-12 sm:px-16 lg:container lg:mx-auto lg:grid lg:grid-cols-[1fr_500px]">
          <CoursePaymentForm
            form={form}
            isSubmitting={isSubmitting}
            course={course}
          />

          <div className="h-fit bg-[#E2EBEF] px-6 py-9 rounded-2xl flex flex-col gap-8 lg:sticky lg:top-10">
            <div className="w-full flex flex-col items-center">
              <span className="text-gray-primary text-base font-medium">
                {coursePaymentInfo.totalCostLabel}
              </span>

              <span className="text-green-primary font-semibold text-3xl text-center">
                {formatPrice(course.price / 100)}
              </span>

              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/lock.svg"
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
                {course.courseName}
              </span>

              <span className="text-gray-primary text-base font-medium">
                {formatPrice(course.price / 100)}
              </span>
            </div>

            <div className="w-full h-px bg-[#C8D6DF]" />

            <div className="w-full flex items-center justify-between">
              <span className="text-[#5A727D] text-base font-medium">
                {coursePaymentInfo.subtotal}
              </span>

              <span className="text-[#5A727D] text-base font-medium">
                {formatPrice(course.price / 100)}
              </span>
            </div>

            <div className="w-full h-px bg-[#C8D6DF]" />

            <div className="w-full flex items-center justify-between">
              <span className="text-[#37474F] text-lg font-semibold">
                {coursePaymentInfo.total}
              </span>

              <span className="text-[#37474F] text-lg font-semibold">
                {formatPrice(course.price / 100)}
              </span>
            </div>

            <CoursePaymentButtons
              isSubmitting={isSubmitting}
              className="hidden lg:flex"
            />
          </div>
        </div>

        <CoursePaymentButtons
          isSubmitting={isSubmitting}
          className="bg-[#f0f5f8] sticky bottom-0 py-6 px-6 shadow-[0px_-2px_30px_rgba(0,0,0,0.25)] lg:hidden"
        />
      </form>
    </Form>
  );
}
