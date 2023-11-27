"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import Banner from "@/components/home/Banner";
import StudentModal from "@/components/home/StudentModal";
import Hero from "../components/home/Hero";
import Steps from "@/components/home/Steps";
import Benefits from "@/components/home/Benefits";
import RecentsRequests from "@/components/home/RecentsRequests";
import Contact from "@/components/home/Contact";
import ProfessorLoginForm from "@/components/home/components/professor-login/ProfessorLoginForm";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import useStudentModalStore from "@/stores/useStudentModalStore";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { openModal: openStudentModal, setToLogin } = useStudentModalStore();
  const { openModal: openProfessorModal } = useProfessorModalStore();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const confirmed = searchParams.get("confirmed");
  const type = searchParams.get("type");
  let redirected = searchParams.get("redirected");

  const router = useRouter();

  if (id && confirmed) {
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
      if (type === "professor") {
        toast.dismiss();
        toast.success(successMessage);
        openProfessorModal();
      }

      if (type === "student") {
        toast.dismiss();
        toast.success(successMessage);
        openStudentModal();
        setToLogin();
      }

      redirected = "";
    }
  }, [redirected]);

  return (
    <>
      <ProfessorLoginForm />
      <StudentModal />
      <Hero />
      <Banner />
      <div className="before:content-[''] before:w-4/5 before:h-full before:bg-homeLeftShape before:bg-contain before:bg-no-repeat bg-left-top before:block before:absolute before:top-0 before:left-0 before:z-[9] after:content-[''] after:w-4/5 after:h-full after:bg-homeRightShape after:bg-contain after:bg-no-repeat after:bg-right-bottom after:block after:absolute after:bottom-36 after:right-0 after:z-[9] relative sm:before:w-[45%] sm:after:w-2/5 lg:before:w-1/4 lg:after:w-1/4 lg:after:bottom-0">
        <Steps />
        <Benefits />
      </div>
      <RecentsRequests />
      <Contact />
    </>
  );
}
