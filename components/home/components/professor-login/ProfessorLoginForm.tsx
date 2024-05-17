"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import professorLoginSchema, {
  professorLoginType,
} from "@/constants/schemas/professorLoginSchema";
import { professorFormAnimation } from "@/constants/framer-animations/professor-modal";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { professorLoginInfo } from "@/constants/register/professor-register-br";
import { Button } from "@/components/ui/button";
import useProfessorModalStore from "@/stores/useProfessorModalStore";

interface Props {
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  handleCloseButton: () => void;
}

export function ProfessorLoginForm({
  isSubmitting,
  setIsSubmitting,
  handleCloseButton,
}: Props) {
  const router = useRouter();

  const { setToNotLogin, setToRecoverPassword } = useProfessorModalStore();

  function handleSignin(email: string, password: string) {
    setIsSubmitting(true);

    signIn("credentials", {
      email,
      password,
      type: "professor",
      redirect: false,
    })
      .then((res) => {
        if (res && res.error) {
          toast.error(res.error);
        } else {
          axios
            .get("/api/user/get-user")
            .then((res) => {
              handleCloseButton();

              router.replace(
                `${menuItems[0].professorHref}${res.data.id}${menuItems[0].pageHref}`
              );
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  async function onSubmit(data: professorLoginType) {
    handleSignin(data.email, data.password);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(professorLoginSchema),
  });

  function handleProfessorRegisterLink() {
    handleCloseButton();

    setTimeout(() => {
      router.push("/cadastro/professor");
    }, 350);
  }

  function handleForgotPassword() {
    setToNotLogin();

    setTimeout(() => {
      setToRecoverPassword();
    }, 350);
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full overflow-x-hidden"
      >
        <motion.div
          variants={professorFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid grid-cols-1 grid-rows-2 gap-4 mb-6"
        >
          <div className="flex flex-col gap-1">
            <input
              {...register("email")}
              type="text"
              placeholder={professorLoginInfo.email}
              name="email"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75 ${
                errors.email && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.email && (
              <small className="text-sm text-[#ff7373] font-medium text-left">
                {errors.email?.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              placeholder={professorLoginInfo.password}
              name="password"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75 ${
                errors.password && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.password && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.password?.message}
              </small>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={professorFormAnimation}
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
            {professorLoginInfo.loginButton}
          </Button>
        </motion.div>
      </form>

      <div className="w-full h-[1px] bg-[#EBEFF1]" />

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-[#2C383F]">
          {professorLoginInfo.noAccountText}{" "}
          <span
            onClick={handleProfessorRegisterLink}
            className="text-green-primary cursor-pointer"
          >
            {professorLoginInfo.noAccountLink}
          </span>
        </p>

        <p className="text-base font-semibold text-[#2C383F]">
          {professorLoginInfo.forgotPasswordText}{" "}
          <span
            onClick={handleForgotPassword}
            className="text-green-primary cursor-pointer"
          >
            {professorLoginInfo.forgotPasswordLink}
          </span>
        </p>
      </div>
    </div>
  );
}
