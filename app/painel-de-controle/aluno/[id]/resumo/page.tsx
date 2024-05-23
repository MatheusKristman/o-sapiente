"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Request } from "@prisma/client";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import useNewRequestStore from "@/stores/useNewRequestStore";
import { studentResumeInfos } from "@/constants/dashboard/resume-br";
import NewRequestModal from "@/components/dashboard/resume/NewRequestModal";
import OffersModal from "@/components/dashboard/resume/OffersModal";
import { RequestFinishModal } from "@/components/dashboard/resume/RequestFinishModal";
import { RequestConfirmFinishModal } from "@/components/dashboard/resume/RequestConfirmFinishModal";
import { ResumeCurrentLessonModal } from "@/components/dashboard/resume/ResumeCurrentLessonModal";
import useResumeStore from "@/stores/useResumeStore";

// TODO: ajustar pagina de login quando o usuário tenta entrar no painel sem estar logado

const DashboardPage = () => {
  const { setProfilePhoto, setName, setCurrentLesson, setRequests, requests } = useResumeStore();

  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useNewRequestStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/user/get-user");

        if (userResponse.data.isConfirmed === false) {
          toast.error("Confirme sua conta para poder acessa-la");
          router.push("/");
        }

        if (userResponse.data.id !== pathname?.split("/")[3]) {
          toast.error("Usuário não autorizado");
          router.push("/");
        }

        if (userResponse.data.profilePhoto) {
          setProfilePhoto(userResponse.data.profilePhoto);
        }

        setName(`${userResponse.data.firstName} ${userResponse.data.lastName}`);

        const requestResponse = await axios.get("/api/request/get-requests");

        setRequests(
          requestResponse.data.filter((request: Request) => !request.isConcluded && !request.isOfferAccepted)
        );
        setCurrentLesson(
          requestResponse.data.filter((request: Request) => request.isOfferAccepted && !request.isConcluded)
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [session?.data?.user?.email, setCurrentLesson, setName, setProfilePhoto, setRequests]);

  return (
    <>
      <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:mb-12">
        <div className="w-full flex flex-col-reverse gap-9 md:flex-col lg:w-4/12 xl:w-6/12">
          <ResumeProfilePhoto type="Student" />

          <div className="w-full shadow-md shadow-[rgba(0,0,0,0.25)] rounded-lg">
            <Button className="w-full" onClick={openModal} disabled={!requests}>
              {studentResumeInfos.newRequestBtn}
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
          <ResumeRequestBox type="Student" />

          <ResumeCurrentLessonBox />
        </div>
      </div>

      <NewRequestModal />
      <OffersModal />
      <RequestFinishModal type="STUDENT" />
      <RequestConfirmFinishModal />
      <ResumeCurrentLessonModal />
    </>
  );
};

export default DashboardPage;
