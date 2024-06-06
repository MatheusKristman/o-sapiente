"use client";

import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
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
  const [pixValue, setPixValue] = useState<string>("");
  const [pixEditValue, setPixEditValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPixValueError, setPixValueError] = useState<boolean>(false);
  const [isPixEditValueError, setPixEditValueError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

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

  function onSubmit() {
    let pixError: boolean;
    let pixEditError: boolean;
    let passwordError: boolean;
    setIsSubmitting(true);

    if (isEditing) {
      if (pixEditValue.length < 11) {
        pixEditError = true;
      } else {
        pixEditError = false;
      }

      if (password.length === 0) {
        passwordError = true;
      } else {
        passwordError = false;
      }

      setPixEditValueError(pixEditError);
      setPasswordError(passwordError);

      if (pixEditError || passwordError) {
        setIsSubmitting(false);
        return;
      }

      axios
        .post("/api/request/retrieve-payment-auth", { password })
        .then(() => {
          setIsEditing(false);

          axios
            .post("/api/user/retrieve-payment", { pixCode: pixEditValue })
            .then((res) => {
              setPixCode(res.data.pixCode);
              setIsForm(false);
              setIsEditing(false);

              setPixEditValue("");
              setPassword("");

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

    if (pixValue.length < 11) {
      pixError = true;
    } else {
      pixError = false;
    }

    setPixValueError(pixError);

    if (pixError) {
      setIsSubmitting(false);
      return;
    }

    axios
      .post("/api/user/retrieve-payment", { pixCode: pixValue })
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
    console.log("executando");
    // setIsSubmitting(true);

    // axios
    //   .post("/api/user/retrieve-payment", { pixCode })
    //   .then((res) => {
    //     setPixCode(res.data.pixCode);
    //     setIsForm(false);

    //     setTimeout(() => {
    //       setIsMessage(true);
    //     }, 350);
    //   })
    //   .catch((error) => {
    //     console.error(error);

    //     toast.error(error.response.data);
    //   })
    //   .finally(() => {
    //     setIsSubmitting(false);
    //   });
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
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <Input
                disabled={isSubmitting}
                className="input"
                value={pixEditValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPixEditValue(e.target.value)}
                placeholder={retrievePaymentModalInfo.inputPlaceholder}
              />

              {isPixEditValueError && (
                <span className="text-sm text-[#FF7373] font-medium">
                  Código do Pix inválido, verifique e tente novamente
                </span>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <Input
                disabled={isSubmitting}
                className="input"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder={retrievePaymentModalInfo.passwordPlaceholder}
              />

              {isPasswordError && <span className="text-sm text-[#FF7373] font-medium">Senha é obrigatória</span>}
            </div>

            <Button onClick={onSubmit} disabled={isSubmitting}>
              {retrievePaymentModalInfo.btn}
            </Button>
          </div>
        ) : !isEditing && pixCode ? (
          <Button disabled={isSubmitting} onClick={RetrievePaymentWithSavedPix}>
            {retrievePaymentModalInfo.btn}
          </Button>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <Input
                disabled={isSubmitting}
                className="input"
                value={pixValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPixValue(e.target.value)}
                placeholder={retrievePaymentModalInfo.inputPlaceholder}
              />

              {isPixValueError && (
                <span className="text-sm text-[#FF7373] font-medium">
                  Código do Pix inválido, verifique e tente novamente
                </span>
              )}
            </div>

            <Button onClick={onSubmit} disabled={isSubmitting}>
              {retrievePaymentModalInfo.btn}
            </Button>

            <div className="w-full flex flex-col gap-2">
              {retrievePaymentModalInfo.disclaimer.map((text, index) => (
                <span key={`p-${index}`} className="w-full text-center text-sm text-gray-primary/50">
                  {text}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
