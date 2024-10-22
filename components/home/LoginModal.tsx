"use client";

import { BsXLg } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import RequestForm from "./components/login-modal/RequestForm";
import RegisterForm from "./components/login-modal/RegisterForm";
import LoginForm from "./components/login-modal/LoginForm";
import ForgotPasswordForm from "./components/login-modal/ForgotPasswordForm";
import RecoverPasswordMessage from "./components/login-modal/RecoverPasswordMessage";

import { studentOverlayAnimation, studentModalAnimation } from "@/constants/framer-animations/student-modal";
import useLoginModalStore from "@/stores/useLoginModalStore";
import { headerTexts } from "@/constants/header-br";
import { cn } from "@/libs/utils";

const LoginModal = ({ isHeaderLoading, openLoginModal }: { isHeaderLoading: boolean; openLoginModal: () => void }) => {
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
    isLoading,
    isSubmitting,
  } = useLoginModalStore();

  function handleCloseButton(open: boolean) {
    if (!open) {
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
    <Dialog open={isModalOpen} onOpenChange={handleCloseButton}>
      <DialogTrigger asChild>
        <Button disabled={isHeaderLoading} onClick={openLoginModal}>
          {headerTexts.loginBtn}
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-x-hidden pt-20 h-full min-[510px]:h-fit min-[510px]:rounded-lg min-[510px]:max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        {/* <div className={`flex ${isBackBtnActive ? "justify-between" : "justify-end"} `}> */}
        {isBackBtnActive && (
          <Button
            type="button"
            className="text-green-primary mb-6 absolute left-4 top-4"
            variant="link"
            size="iconSm"
            disabled={isLoading || isSubmitting}
            onClick={handleBackButton}
          >
            <HiChevronLeft size={34} />
          </Button>
        )}
        {/* </div> */}

        <AnimatePresence>
          {isRequest && <RequestForm key="request" />}
          {isRegister && <RegisterForm key="register" />}
          {isLogin && <LoginForm key="login" />}
          {forgotPassword && <ForgotPasswordForm key="forgot-password" />}
          {isRecoverPasswordMessage && <RecoverPasswordMessage />}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
