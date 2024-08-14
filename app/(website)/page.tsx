"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import Banner from "@/components/home/Banner";
import LoginModal from "@/components/home/LoginModal";
import Hero from "@/components/home/Hero";
import Steps from "@/components/home/Steps";
import Benefits from "@/components/home/Benefits";
import RecentsRequests from "@/components/home/RecentsRequests";
import Contact from "@/components/home/Contact";
import ProfessorModal from "@/components/home/components/professor-login/ProfessorModal";
import RecoverPasswordModal from "@/components/home/RecoverPasswordModal";
import { CourseAd } from "@/components/home/CourseAd";
import useLoginModalStore from "@/stores/useLoginModalStore";
import useRecoverPasswordModalStore from "@/stores/useRecoverPasswordModalStore";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { openModal, setToLogin, setToRegister } = useLoginModalStore();
  const { openModal: openRecoverPasswordModal, setIdUser } = useRecoverPasswordModalStore();

  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const confirmed = searchParams?.get("confirmed");
  const type = searchParams?.get("type");
  const recoverPassword = searchParams?.get("recover-password");
  const recoverDate = searchParams?.get("recover-date");
  let redirected = searchParams?.get("redirected");
  let redirectedAd = searchParams?.get("redirected_ad");

  const router = useRouter();

  useEffect(() => {
    if (id && recoverPassword && recoverDate) {
      axios
        .post("/api/forgot-password/confirm", {
          passwordRequested: recoverPassword,
          passwordDate: recoverDate,
          userId: id,
        })
        .then((res) => {
          if (res.data.confirmed) {
            openRecoverPasswordModal();
            setIdUser(id);
          } else {
            router.replace("/");
          }
        })
        .catch((error) => {
          console.error(error);

          router.replace("/");
        });
    }
  }, []);

  if (id && confirmed && type) {
    axios
      .post("/api/user/confirm-account", { id, confirmed })
      .then((res) => {
        setSuccessMessage(res.data.message);
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        router.replace(`/?type=${type}&redirected=true`);
      });
  }

  useEffect(() => {
    if (redirected) {
      toast.dismiss();
      toast.success(successMessage);
      openModal();
      setToLogin();

      redirected = "";
    }
  }, [redirected]);

  useEffect(() => {
    if (redirectedAd) {
      openModal();
      setToRegister();

      redirectedAd = "";
    }
  }, [redirectedAd]);

  return (
    <>
      <ProfessorModal />
      <LoginModal />
      <RecoverPasswordModal />
      <Hero />
      <Banner />
      <CourseAd />
      <div className="before:content-[''] before:w-4/5 before:h-full before:bg-homeLeftShape before:bg-contain before:bg-no-repeat bg-left-top before:block before:absolute before:top-0 before:left-0 before:z-[9] after:content-[''] after:w-4/5 after:h-full after:bg-homeRightShape after:bg-contain after:bg-no-repeat after:bg-right-bottom after:block after:absolute after:bottom-36 after:right-0 after:z-[9] relative sm:before:w-[45%] sm:after:w-2/5 lg:before:w-1/4 lg:after:w-1/4 lg:after:bottom-0">
        <Steps />
        <Benefits />
      </div>
      <RecentsRequests />
      <Contact />
    </>
  );
}
