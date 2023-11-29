import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { studentLoginInfo } from "@/constants/studentModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useStudentModalStore from "@/stores/useStudentModalStore";
import studentLoginSchema from "@/constants/schemas/studentLoginSchema";
import { studentLoginType } from "@/constants/schemas/studentLoginSchema";
import axios from "axios";

const StudentLoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    setToNotLogin,
    setToRegister,
    closeModal,
    subject,
    setSubject,
    description,
    setDescription,
    deactivateBackBtn,
  } = useStudentModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(studentLoginSchema),
  });

  function handleRegisterLink() {
    setToNotLogin();

    setTimeout(() => {
      setToRegister();
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
        console.log(res);
        if (res && res.error) {
          toast.error(res.error);
        } else {
          handleClose();
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  async function onSubmit(data: studentLoginType) {
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
          console.log(error);

          toast.error(error.response.data);
        });
    } else {
      handleSignin(data.email, data.password);
    }
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full overflow-x-hidden">
        <motion.div
          variants={studentFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid grid-cols-1 grid-rows-2 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <input
              {...register("email")}
              type="text"
              placeholder={studentLoginInfo.email}
              name="email"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75 ${
                errors.email && "border-[#FF7373] border-2 border-solid"
              }`}
            />

            {errors.email && (
              <small className="text-sm text-[#FF7373] font-medium text-left">
                {errors.email?.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              placeholder={studentLoginInfo.password}
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

        <motion.button
          type="submit"
          variants={studentFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg flex items-center justify-center bg-green-primary text-white text-base font-semibold cursor-pointer lg:hover:brightness-90 transition-[filter] disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75">
          {studentLoginInfo.loginButton}
        </motion.button>
      </form>

      <div className="w-full h-[1px] bg-[#EBEFF1]" />

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-[#2C383F]">
          {studentLoginInfo.noAccountText}{" "}
          <span onClick={handleRegisterLink} className="text-green-primary cursor-pointer">
            {studentLoginInfo.noAccountLink}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentLoginForm;
