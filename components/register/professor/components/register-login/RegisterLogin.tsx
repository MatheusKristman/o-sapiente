"use client";

import toast from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  professorOverlayAnimation,
  professorModalAnimation,
  professorFormAnimation,
} from "@/constants/framer-animations/professor-modal";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { professorLoginInfo } from "@/constants/register/professor-register-br";
import professorLoginSchema, {
  professorLoginType,
} from "@/constants/schemas/professorLoginSchema";
import { Button } from "@/components/ui/button";

const RegisterLogin = () => {
  const { isModalOpen, closeModal } = useProfessorModalStore();

  const router = useRouter();

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

  function handleCloseButton() {
    closeModal();
  }

  function handleSignin(email: string, password: string) {
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
          handleCloseButton();
          router.replace("/");
        }
      })
      .catch((error) => console.error(error));
  }

  async function onSubmit(data: professorLoginType) {
    handleSignin(data.email, data.password);
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={professorOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={professorModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle"
            >
              <div className="flex justify-end mb-6">
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  className="text-green-primary"
                  onClick={handleCloseButton}
                >
                  <BsXLg size={26} />
                </Button>
              </div>

              <h4 className="text-2xl text-[#2C383F] font-semibold mb-9 sm:text-3xl text-left">
                {professorLoginInfo.title}
              </h4>

              <AnimatePresence>
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
                          className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                            errors.email &&
                            "border-[#FF7373] border-2 border-solid"
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
                          placeholder={professorLoginInfo.password}
                          name="password"
                          autoComplete="off"
                          autoCorrect="off"
                          className={`px-4 py-2 w-full h-11 rounded-lg bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors ${
                            errors.password &&
                            "border-[#FF7373] border-2 border-solid"
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
                      <Button type="submit" className="w-full">
                        {professorLoginInfo.loginButton}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RegisterLogin;
