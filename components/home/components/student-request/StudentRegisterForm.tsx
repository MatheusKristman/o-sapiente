import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { studentRegisterInfo } from "@/constants/studentModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useStudentModalStore from "@/stores/useStudentModalStore";
import studentRegisterSchema from "@/constants/schemas/studentRegisterSchema";
import { studentRegisterSchemaType } from "@/constants/schemas/studentRegisterSchema";
import React from "react";

const StudentRegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setToLogin,
    setToNotRegister,
    theme,
    message,
    closeModal,
    setTheme,
    setMessage,
    deactivateBackBtn,
  } = useStudentModalStore();

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
    resolver: yupResolver(studentRegisterSchema),
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

    setValue("tel", tel);
  }

  function handleLoginLink() {
    setToNotRegister();

    setTimeout(() => {
      setToLogin();
    }, 350);
  }

  function handleClose() {
    closeModal();
    setToNotRegister();
    setTheme("");
    setMessage("");
    deactivateBackBtn();
  }

  function onSubmit(data: studentRegisterSchemaType) {
    setIsSubmitting(true);

    if (theme && message) {
      const formData = { ...data, theme, message };

      axios
        .post("/api/register/student/pre-register", formData)
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
      .post("/api/register/student/pre-register", data)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full overflow-x-hidden"
      >
        <motion.div
          variants={studentFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid grid-cols-2 grid-rows-4 gap-4 mb-6"
        >
          <div className="w-full col-start-1 col-end-2 flex flex-col gap-1">
            <input
              {...register("firstName")}
              type="text"
              placeholder={studentRegisterInfo.name}
              name="firstName"
              autoComplete="off"
              autoCorrect="off"
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                errors.firstName && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.firstName && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.firstName?.message}
              </small>
            )}
          </div>

          <div className="w-full col-start-2 col-end-3 flex flex-col gap-1">
            <input
              {...register("lastName")}
              type="text"
              placeholder={studentRegisterInfo.lastName}
              name="lastName"
              autoComplete="off"
              autoCorrect="off"
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                errors.lastName && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.lastName && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.lastName?.message}
              </small>
            )}
          </div>

          <div className="col-start-1 col-end-3 w-full flex flex-col gap-1">
            <input
              {...register("email")}
              type="text"
              placeholder={studentRegisterInfo.email}
              name="email"
              autoComplete="off"
              autoCorrect="off"
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                errors.email && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.email && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.email?.message}
              </small>
            )}
          </div>

          <div className="col-start-1 col-end-3 w-full flex flex-col gap-1">
            <input
              {...register("tel")}
              type="text"
              placeholder={studentRegisterInfo.tel}
              name="tel"
              onChange={handleTelFormat}
              autoComplete="off"
              autoCorrect="off"
              maxLength={15}
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                errors.tel && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.tel && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.tel?.message}
              </small>
            )}
          </div>

          <div className="col-start-1 col-end-2 w-full flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              placeholder={studentRegisterInfo.password}
              name="password"
              autoComplete="off"
              autoCorrect="off"
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                errors.password && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.password && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.password?.message}
              </small>
            )}
          </div>

          <div className="col-start-2 col-end-3 w-full flex flex-col gap-1">
            <input
              {...register("passwordConfirm")}
              type="password"
              placeholder={studentRegisterInfo.passwordConfirm}
              name="passwordConfirm"
              autoComplete="off"
              autoCorrect="off"
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                errors.passwordConfirm &&
                "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.passwordConfirm && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.passwordConfirm?.message}
              </small>
            )}
          </div>
        </motion.div>

        <motion.button
          type="submit"
          variants={studentFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg flex items-center justify-center bg-green-primary text-white text-base font-semibold cursor-pointer lg:hover:brightness-90 transition-[filter] disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75"
        >
          {studentRegisterInfo.nextButton}
        </motion.button>
      </form>

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
