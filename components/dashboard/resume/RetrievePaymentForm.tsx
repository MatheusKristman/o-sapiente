"use client";

import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";

import { retrievePaymentModalInfo } from "@/constants/dashboard/resume-br";
import { newRequestFormAnimation } from "@/constants/framer-animations/new-request-modal";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const retrievePaymentSchema = z.object({
  pixValue: z.string().min(11, "Código do Pix inválido, verifique e tente novamente"),
  password: z.string().min(1, "Senha é obrigatória").optional(),
});

export function RetrievePaymentForm() {
  const { setIsForm, setIsMessage, pixCode, setPixCode, isEditing, setIsEditing, isSubmitting, setIsSubmitting } =
    useRetrievePaymentModalStore();

  const form = useForm<z.infer<typeof retrievePaymentSchema>>({
    //@ts-ignore
    resolver: zodResolver(retrievePaymentSchema),
    defaultValues: {
      pixValue: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof retrievePaymentSchema>) {
    setIsSubmitting(true);

    if (isEditing) {
      axios
        .post("/api/request/retrieve-payment-auth", values)
        .then(() => {
          setIsEditing(false);

          axios
            .post("/api/user/retrieve-payment", { pixCode: values.pixValue })
            .then((res) => {
              setPixCode(res.data.pixCode);
              setIsForm(false);
              setIsEditing(false);

              setTimeout(() => {
                setIsMessage(true);
              }, 350);
            })
            .catch((error) => {
              console.error(error);

              toast.error(error.response.data);
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        })
        .catch((error) => {
          console.error(error);

          setIsSubmitting(false);
          toast.error(error.response.data);
        });
    }

    axios
      .post("/api/user/retrieve-payment", { pixCode: values.pixValue })
      .then((res) => {
        setPixCode(res.data.pixCode);
        setIsForm(false);
        setIsEditing(false);

        setTimeout(() => {
          setIsMessage(true);
        }, 350);
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function RetrievePaymentWithSavedPix() {
    setIsSubmitting(true);

    axios
      .post("/api/user/retrieve-payment", { pixCode })
      .then((res) => {
        setPixCode(res.data.pixCode);
        setIsForm(false);

        setTimeout(() => {
          setIsMessage(true);
        }, 350);
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      <motion.div
        variants={newRequestFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex flex-col gap-1 mb-4"
      >
        <h1 className="text-2xl sm:text-3xl text-gray-primary font-semibold text-left">
          {retrievePaymentModalInfo.title}
        </h1>

        <p className="text-base text-gray-primary font-normal text-left">{retrievePaymentModalInfo.desc}</p>
      </motion.div>

      <motion.div
        variants={newRequestFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex flex-col gap-6"
      >
        <div className="w-full flex items-center justify-center">
          {pixCode ? (
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-green-primary text-lg font-medium">
                *****{pixCode.substring(5, pixCode.length - 1)}
              </span>

              <Button disabled={isSubmitting} onClick={() => setIsEditing(true)} variant="link" size="icon">
                <Pencil className="text-green-primary" />
              </Button>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-primary/40 text-center">
              {retrievePaymentModalInfo.noPixKey}
            </p>
          )}
        </div>

        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="pixValue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="input"
                        placeholder={retrievePaymentModalInfo.inputPlaceholder}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isSubmitting}
                        className="input"
                        placeholder={retrievePaymentModalInfo.passwordPlaceholder}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium" />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type="submit">
                {retrievePaymentModalInfo.passwordBtn}
              </Button>
            </form>
          </Form>
        ) : !isEditing && pixCode ? (
          <Button disabled={isSubmitting} onClick={RetrievePaymentWithSavedPix}>
            {retrievePaymentModalInfo.btn}
          </Button>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="pixValue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="input"
                        placeholder={retrievePaymentModalInfo.inputPlaceholder}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium" />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type="submit">
                {retrievePaymentModalInfo.btn}
              </Button>
            </form>
          </Form>
        )}
      </motion.div>
    </>
  );
}
