import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { studentLoginInfo } from "@/constants/loginModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useLoginModalStore from "@/stores/useLoginModalStore";
import studentLoginSchema from "@/constants/schemas/studentLoginSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";

//TODO: ajustar para login de todos os tipos

const LoginForm = () => {
  const router = useRouter();

  const {
    setToNotLogin,
    setToRegister,
    closeModal,
    subject,
    setSubject,
    description,
    setDescription,
    deactivateBackBtn,
    setToRecoverPassword,
    isSubmitting,
    setIsSubmitting,
  } = useLoginModalStore();

  const form = useForm<z.infer<typeof studentLoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    // @ts-ignore
    resolver: zodResolver(studentLoginSchema),
  });

  function handleRegisterLink() {
    setToNotLogin();

    setTimeout(() => {
      setToRegister();
    }, 350);
  }

  function handleForgotPassword() {
    setToNotLogin();

    setTimeout(() => {
      setToRecoverPassword();
    }, 350);
  }

  function handleClose() {
    closeModal();
    setToNotLogin();
    setSubject("");
    setDescription("");
    deactivateBackBtn();
  }

  function handleSignin(email: string, password: string) {
    signIn("credentials", {
      email,
      password,
      type: "student",
      redirect: false,
    })
      .then((res) => {
        if (res && res.error) {
          toast.error(res.error);
        } else {
          axios
            .get("/api/user/get-user")
            .then((res) => {
              handleClose();

              if (res.data.type === "PROFESSOR") {
                router.push(`/painel-de-controle/professor/${res.data.id}/resumo`);
              }

              if (res.data.type === "STUDENT") {
                router.push(`/painel-de-controle/aluno/${res.data.id}/resumo`);
              }

              if (res.data.type === "ADMIN") {
                router.push(`/painel-de-controle/admin/geral`);
              }
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  async function onSubmit(data: z.infer<typeof studentLoginSchema>) {
    setIsSubmitting(true);

    if (subject && description) {
      await axios
        .post("/api/user/has-subject-and-description", {
          email: data.email,
          password: data.password,
          subject,
          description,
        })
        .then((res) => {
          toast.success(res.data.message);

          handleSignin(res.data.email, res.data.password);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        });
    } else {
      handleSignin(data.email, data.password);
    }
  }

  return (
    <>
      <motion.h4
        variants={studentFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-3xl h-fit text-gray-primary font-semibold mb-9 text-left !leading-tight"
      >
        {studentLoginInfo.title}
      </motion.h4>

      <div className="w-full flex flex-col gap-9">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-auto">
            <motion.div
              variants={studentFormAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 grid-rows-2 gap-4 mb-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={studentLoginInfo.email}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn("input", form.formState.errors.email && "input-error")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
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
                        placeholder={studentLoginInfo.password}
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        className={cn("input", form.formState.errors.password && "input-error")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={studentFormAnimation} initial="initial" animate="animate" exit="exit">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {studentLoginInfo.loginButton}
              </Button>
            </motion.div>
          </form>
        </Form>

        <div className="w-full h-[1px] bg-[#EBEFF1]" />

        <div className="w-full flex flex-col items-center justify-center gap-4">
          <p className="text-base text-center !leading-tight font-semibold text-[#2C383F]">
            {studentLoginInfo.noAccountText}{" "}
            <span onClick={handleRegisterLink} className="text-green-primary cursor-pointer">
              {studentLoginInfo.noAccountLink}
            </span>
          </p>

          <p className="text-base text-center !leading-tight font-semibold text-[#2C383F]">
            {studentLoginInfo.forgotPasswordText}{" "}
            <span onClick={handleForgotPassword} className="text-green-primary cursor-pointer">
              {studentLoginInfo.forgotPasswordLink}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
