"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import professorRegisterSchema, {
  professorRegisterSchemaType,
} from "@/constants/schemas/professorRegisterSchema";
import { professorRegisterFormInfo } from "@/constants/register/professor-register-br";
import useProfessorModalStore from "@/stores/useProfessorModalStore";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { openModal } = useProfessorModalStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(professorRegisterSchema),
  });

  const inputStyle =
    "w-full h-11 bg-[#EBEFF1] rounded-md px-4 text-base text-gray-primary placeholder:font-medium border-2 border-[#EBEFF1] focus:border-[#9DA5AA] outline-none transition-[border] disabled:brightness-75 disabled:hover:brightness-75";
  const inputErrorStyle = "border-[#FF7373] border-2 border-solid focus:border-[#FF7373]";

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

    setValue("tel", tel);
  }

  function handleOpenLoginModal() {
    openModal();
  }

  function onSubmit(data: professorRegisterSchemaType) {
    setIsSubmitting(true);

    console.log(data);

    axios
      .post("/api/register/professor/pre-register", data)
      .then((res) => router.replace(`/cadastro/professor/finalizacao/${res.data.id}`))
      .catch((error) => {
        console.error(error.response);

        toast.error(error.response.data);
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <section className="pt-12 pb-12 w-full bg-registerLeftShape bg-no-repeat bg-[length:100%_100%] bg-left-top md:bg-[length:50%_auto] md:bg-left lg:bg-contain lg:pb-24">
      <div className="w-full px-6 mx-auto flex flex-col gap-6 md:px-16 md:gap-12 lg:container lg:mx-auto lg:flex-row lg:justify-between">
        <div className="w-full flex flex-col justify-center gap-4 lg:justify-start lg:pt-24 lg:max-w-xl">
          <h1 className="text-3xl text-center font-semibold text-gray-primary md:text-4xl lg:text-left">
            {professorRegisterFormInfo.title}
          </h1>

          <p className="text-lg text-center text-gray-primary lg:text-left">
            {professorRegisterFormInfo.desc}
          </p>
        </div>

        <div className="bg-white shadow-lg shadow-[rgba(0,0,0,0.25)] rounded-2xl px-6 py-9 max-w-xl mx-auto lg:mx-0">
          <h3 className="text-xl font-semibold text-gray-primary mb-6 lg:text-2xl">
            {professorRegisterFormInfo.formTitle}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit, (error) => console.log(error))} // TODO temporário, remover depois de configurado
            className="w-full flex flex-col gap-6 mb-6">
            <div className="w-full flex flex-col gap-4">
              <input
                {...register("firstName")}
                type="text"
                className={cn(inputStyle, errors.firstName && inputErrorStyle)}
                placeholder={professorRegisterFormInfo.name}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className="text-sm text-[#FF7373] font-medium text-left">
                  {errors.firstName?.message}
                </span>
              )}

              <input
                {...register("lastName")}
                type="text"
                className={cn(inputStyle, errors.lastName && inputErrorStyle)}
                placeholder={professorRegisterFormInfo.lastName}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className="text-sm text-[#FF7373] font-medium text-left">
                  {errors.lastName?.message}
                </span>
              )}

              <input
                {...register("email")}
                type="text"
                className={cn(inputStyle, errors.email && inputErrorStyle)}
                placeholder={professorRegisterFormInfo.email}
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="text-sm text-[#FF7373] font-medium text-left">
                  {errors.email?.message}
                </span>
              )}

              <input
                {...register("tel")}
                type="text"
                onChange={handleTelFormat}
                className={cn(inputStyle, errors.tel && inputErrorStyle)}
                placeholder={professorRegisterFormInfo.tel}
                disabled={isSubmitting}
                maxLength={15}
              />
              {errors.tel && (
                <span className="text-sm text-[#FF7373] font-medium text-left">
                  {errors.tel?.message}
                </span>
              )}

              <input
                {...register("password")}
                type="password"
                className={cn(inputStyle, errors.password && inputErrorStyle)}
                placeholder={professorRegisterFormInfo.password}
                disabled={isSubmitting}
                autoComplete="off"
                autoCorrect="off"
              />
              {errors.password && (
                <span className="text-sm text-[#FF7373] font-medium text-left">
                  {errors.password?.message}
                </span>
              )}

              <input
                {...register("passwordConfirm")}
                type="password"
                className={cn(inputStyle, errors.passwordConfirm && inputErrorStyle)}
                placeholder={professorRegisterFormInfo.confirmPassword}
                disabled={isSubmitting}
                autoComplete="off"
                autoCorrect="off"
              />
              {errors.passwordConfirm && (
                <span className="text-sm text-[#FF7373] font-medium text-left">
                  {errors.passwordConfirm?.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-green-primary rounded-md flex items-center justify-center text-white text-base font-semibold transition disabled:brightness-75 disabled:hover:brightness-75 lg:hover:brightness-90"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  {professorRegisterFormInfo.registerBtn}{" "}
                  <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                </>
              ) : (
                professorRegisterFormInfo.registerBtn
              )}
            </button>
          </form>
          <div className="w-full border-t border-[#EBEFF1] pt-6 flex flex-col gap-4">
            <span className="w-full text-base text-gray-primary font-semibold text-center">
              {professorRegisterFormInfo.alreadyHasAccount.desc + " "}
              <button
                type="button"
                onClick={handleOpenLoginModal}
                className="text-green-primary cursor-pointer lg:hover:underline">
                {professorRegisterFormInfo.alreadyHasAccount.link}
              </button>
            </span>

            <span className="text-sm text-gray-primary/60 font-medium text-center">
              {professorRegisterFormInfo.privacy.text + " "}
              <Link
                className="underline text-gray-primary/80"
                href={professorRegisterFormInfo.privacy.link.href}>
                {professorRegisterFormInfo.privacy.link.text}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
