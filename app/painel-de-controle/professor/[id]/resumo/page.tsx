"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Request, Status } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { format, isAfter } from "date-fns";

import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import BalanceBox from "@/components/dashboard/resume/BalanceBox";
import RequestDetailModal from "@/components/dashboard/resume/RequestDetailModal";
import { FinishedLessonsBox } from "@/components/dashboard/resume/FinishedLessonsBox";
import { RequestFinishModal } from "@/components/dashboard/resume/RequestFinishModal";
import { RequestConfirmFinishModal } from "@/components/dashboard/resume/RequestConfirmFinishModal";
import { RetrievePaymentModal } from "@/components/dashboard/resume/RetrievePaymentModal";
import { ResumeCurrentLessonModal } from "@/components/dashboard/resume/ResumeCurrentLessonModal";
import useResumeStore from "@/stores/useResumeStore";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";
import useUserStore from "@/stores/useUserStore";

const ResumePage = () => {
  const {
    setProfilePhoto,
    setName,
    setThemes,
    setPlan,
    setPaymentRetrievable,
    setOffers,
    setCurrentLesson,
    setRequests,
    setFinishedLessons,
  } = useResumeStore();
  const { setPixCode } = useRetrievePaymentModalStore();
  const { userId } = useUserStore();

  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

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

        if (
          userResponse.data.plan &&
          userResponse.data.planActivationDate &&
          userResponse.data.planValidationDate
        ) {
          const actualDate: Date = new Date();
          const validationDate: Date = new Date(
            userResponse.data.planValidationDate,
          );

          if (isAfter(actualDate, validationDate)) {
            const planExpiredResponse = await axios.put("/api/plan/expired");

            toast.error(planExpiredResponse.data);

            setPlan("");
          } else {
            setPlan(userResponse.data.plan.planName);
          }
        } else {
          setPlan("");
        }

        setOffers(userResponse.data.offers);
        setName(`${userResponse.data.firstName} ${userResponse.data.lastName}`);
        setThemes(userResponse.data.themes);
        setPaymentRetrievable(userResponse.data.paymentRetrievable);
        setPixCode(userResponse.data.pixCode);

        if (userId) {
          const requestResponse = await axios.get("/api/request/get-requests");

          setRequests(
            requestResponse.data.filter(
              (request: Request) =>
                !request.isConcluded && !request.isOfferAccepted,
            ),
          );
          setCurrentLesson(
            requestResponse.data.filter(
              (request: Request) =>
                request.isOfferAccepted &&
                !request.isConcluded &&
                request.userIds.includes(userId),
            ),
          );
          setFinishedLessons(
            requestResponse.data.filter(
              (request: Request) =>
                request.status === Status.finished &&
                request.userIds.includes(userId),
            ).length,
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    session?.data?.user?.email,
    setCurrentLesson,
    setName,
    setOffers,
    setPlan,
    setProfilePhoto,
    setRequests,
    setThemes,
    setPaymentRetrievable,
    setPixCode,
    setFinishedLessons,
    userId,
  ]);

  return (
    <>
      <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:mb-12">
        <div className="w-full flex flex-col-reverse gap-9 md:flex-col lg:w-4/12 xl:w-6/12">
          <ResumeProfilePhoto type="Professor" />
        </div>

        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-1 gap-8">
            <BalanceBox />

            <FinishedLessonsBox />
          </div>

          <ResumeRequestBox type="Professor" />

          <ResumeCurrentLessonBox />
        </div>
      </div>

      <RequestDetailModal type="Professor" />
      <RequestFinishModal type="PROFESSOR" />
      <RequestConfirmFinishModal />
      <RetrievePaymentModal />
      <ResumeCurrentLessonModal type="Professor" />
    </>
  );
};

export default ResumePage;
