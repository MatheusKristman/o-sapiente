"use client";

import { BsXLg } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

import { studentRequestInfo } from "@/constants/loginModal-br";
import { studentOverlayAnimation, studentModalAnimation } from "@/constants/framer-animations/student-modal";
import RequestForm from "./components/login-modal/RequestForm";
import RegisterForm from "./components/login-modal/RegisterForm";
import LoginForm from "./components/login-modal/LoginForm";
import ForgotPasswordForm from "./components/login-modal/ForgotPasswordForm";
import useLoginModalStore from "@/stores/useLoginModalStore";
import { Button } from "@/components/ui/button";
import RecoverPasswordMessage from "./components/login-modal/RecoverPasswordMessage";

const LoginModal = () => {
  const {
    isModalOpen,
    isRegister,
    isRequest,
    isLogin,
    closeModal,
    setToNotLogin,
    setToNotRequest,
    setToNotRegister,
    setSubject,
    setDescription,
    isBackBtnActive,
    deactivateBackBtn,
    setToRequest,
    forgotPassword,
    isRecoverPasswordMessage,
    setToNotRecoverPasswordMessage,
    setToNotRecoverPassword,
  } = useLoginModalStore();

  function handleCloseButton() {
    closeModal();
    setToNotLogin();
    setToNotRequest();
    setToNotRegister();
    setToNotRecoverPassword();
    setToNotRecoverPasswordMessage();
    setSubject("");
    setDescription("");
    deactivateBackBtn();
  }

  function handleBackButton() {
    if (isRegister) {
      setToNotRegister();

      setTimeout(() => {
        setToRequest();
        deactivateBackBtn();
      }, 350);
    }

    if (isLogin) {
      setToNotLogin();

      setTimeout(() => {
        setToRequest();
        deactivateBackBtn();
      }, 350);
    }
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
            variants={studentOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={studentModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
            >
              <div className={`flex ${isBackBtnActive ? "justify-between" : "justify-end"} mb-6`}>
                {isBackBtnActive && (
                  <Button
                    type="button"
                    className="text-green-primary"
                    variant="link"
                    size="icon"
                    onClick={handleBackButton}
                  >
                    <HiChevronLeft size={34} />
                  </Button>
                )}

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

              <AnimatePresence>
                {isRequest && <RequestForm key="request" />}
                {isRegister && <RegisterForm key="register" />}
                {isLogin && <LoginForm key="login" />}
                {forgotPassword && <ForgotPasswordForm key="forgot-password" />}
                {isRecoverPasswordMessage && <RecoverPasswordMessage />}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginModal;
