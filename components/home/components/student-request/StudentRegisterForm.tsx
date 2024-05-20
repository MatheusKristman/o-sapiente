import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

import { studentRegisterInfo } from "@/constants/studentModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useStudentModalStore from "@/stores/useStudentModalStore";
import studentRegisterSchema from "@/constants/schemas/studentRegisterSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";

const StudentRegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    setToLogin,
    setToNotRegister,
    subject,
    description,
    closeModal,
    setSubject,
    setDescription,
    deactivateBackBtn,
  } = useStudentModalStore();

  const form = useForm<z.infer<typeof studentRegisterSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      password: "",
      passwordConfirm: "",
    },
    // @ts-ignore
    resolver: zodResolver(studentRegisterSchema),
  });

  const router = useRouter();

  function handleTelFormat(event: React.ChangeEvent<HTMLInputElement>) {
    let tel = event.target.value.replace(/\D/g, "");

    if (tel.length < 10) {
      tel = tel.replace(/(\d{2})(\d)/, "($1) $2");
    } else if (tel.length === 10) {
      tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (tel.length === 11) {
      tel = tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      return;
    }

    form.setValue("tel", tel);
  }

  function handleLoginLink() {
    if (!isSubmitting) {
      setToNotRegister();

      setTimeout(() => {
        setToLogin();
      }, 350);
    }
  }

  function handleClose() {
    closeModal();
    setToNotRegister();
    setSubject("");
    setDescription("");
    deactivateBackBtn();
  }

  function onSubmit(values: z.infer<typeof studentRegisterSchema>) {
    setIsSubmitting(true);

    if (subject && description) {
      const formData = {
        ...values,
        subject,
        description,
        accountType: "Student",
      };

      axios
        .post("/api/user/pre-register", formData)
        .then((res) => {
          handleClose();

          router.replace(`/cadastro/aluno/finalizacao/${res.data.id}`);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => setIsSubmitting(false));

      return;
    }

    axios
      .post("/api/user/pre-register", { ...values, accountType: "Student" })
      .then((res) => {
        handleClose();

        router.replace(`/cadastro/aluno/finalizacao/${res.data.id}`);
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <motion.div
            variants={studentFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-2 grid-rows-6 gap-4 mb-6 sm:grid-rows-4"
          >
            <div className="w-full col-start-1 col-end-3 flex flex-col gap-1 sm:col-end-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={studentRegisterInfo.name}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn(
                          "input",
                          form.formState.errors.firstName && "input-error",
                        )}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full col-start-1 col-end-3 flex flex-col gap-1 sm:col-start-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={studentRegisterInfo.lastName}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn(
                          "input",
                          form.formState.errors.lastName && "input-error",
                        )}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-start-1 col-end-3 w-full flex flex-col gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={studentRegisterInfo.email}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn(
                          "input",
                          form.formState.errors.email && "input-error",
                        )}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-start-1 col-end-3 w-full flex flex-col gap-1">
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={studentRegisterInfo.tel}
                        onChange={handleTelFormat}
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={15}
                        disabled={isSubmitting}
                        className={cn(
                          "input",
                          form.formState.errors.tel && "input-error",
                        )}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-start-1 col-end-3 w-full flex flex-col gap-1 sm:col-end-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={studentRegisterInfo.password}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn(
                          "input",
                          form.formState.errors.password && "input-error",
                        )}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-start-1 col-end-3 w-full flex flex-col gap-1 sm:col-start-2">
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={studentRegisterInfo.passwordConfirm}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn(
                          "input",
                          form.formState.errors.passwordConfirm &&
                            "input-error",
                        )}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full col-span-2 flex items-center justify-start">
              <span className="text-sm text-left text-gray-primary/60">
                * Senha precisa ter 6 caracteres
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={studentFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              {studentRegisterInfo.nextButton}
            </Button>
          </motion.div>
        </form>
      </Form>

      <div className="w-full h-[1px] bg-[#EBEFF1]" />

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-[#2C383F]">
          {studentRegisterInfo.hasAccountText}{" "}
          <span
            onClick={handleLoginLink}
            className="text-green-primary cursor-pointer"
          >
            {studentRegisterInfo.hasAccountLink}
          </span>
        </p>

        <span className="text-sm text-[#9DA5AA] font-medium">
          {studentRegisterInfo.termsText}
          <Link href="#" className="underline text-[#5A727D]">
            {studentRegisterInfo.termsLink}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
