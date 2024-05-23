import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dot } from "lucide-react";
import { BsXLg } from "react-icons/bs";

import { ModalAnimation, OverlayAnimation } from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { currentLessonModalInfo } from "@/constants/dashboard/resume-br";
import useCurrentLessonModalStore from "@/stores/useCurrentLessonModalStore";
import { ResumeCurrentLessonBtns } from "./ResumeCurrentLessonBtns";
import { ResumeCurrentLessonSupportForm } from "./ResumeCurrentLessonSupportForm";
import useUserStore from "@/stores/useUserStore";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

interface Props {
  type?: "Professor" | null;
}

export function ResumeCurrentLessonModal({ type }: Props) {
  const { isModalOpen, closeModal, lesson, isBtns, isSupport, setBtns } = useCurrentLessonModalStore();
  const { userId } = useUserStore();

  if (!lesson) {
    toast.error("Aula não encontrada");
    closeModal();
  }

  const filteredUser = lesson?.users.filter((user) => user.id !== userId)[0];

  if (!filteredUser) {
    toast.error("Usuário não encontrado");
    closeModal();
  }

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setBtns();
    }, 350);
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
          >
            <div className="flex justify-end mb-6">
              <Button variant="link" size="icon" type="button" className="text-green-primary" onClick={handleClose}>
                <BsXLg size={26} />
              </Button>
            </div>

            <h4 className="text-2xl text-[#2C383F] font-semibold mb-9 sm:text-3xl text-left">
              {currentLessonModalInfo.title}
            </h4>

            {!lesson ? (
              <ResumeCurrentLessonSkeleton />
            ) : (
              <>
                <div className="w-fit mx-auto bg-[#F0F5F8] px-6 py-4 rounded-xl flex items-center mb-9">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={
                        filteredUser && filteredUser.profilePhoto
                          ? filteredUser.profilePhoto
                          : "/assets/images/default-user-photo.svg"
                      }
                      alt={type === "Professor" ? "Aluno" : "Professor"}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <Dot className="text-gray-primary" style={{ width: "35px", height: "35px" }} />

                  <span className="text-gray-primary text-lg font-semibold">
                    {`${filteredUser?.firstName} ${filteredUser?.lastName}`}
                  </span>

                  <Dot className="text-gray-primary" style={{ width: "35px", height: "35px" }} />

                  <span className="text-gray-primary text-base font-semibold">{lesson.subject}</span>
                </div>

                <AnimatePresence mode="wait">
                  {isBtns && <ResumeCurrentLessonBtns key="current-lesson-btns" />}
                  {isSupport && <ResumeCurrentLessonSupportForm key="current-lesson-support-form" />}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResumeCurrentLessonSkeleton() {
  return (
    <>
      <div className="w-fit mx-auto bg-[#F0F5F8] px-6 py-4 rounded-xl flex items-center mb-9">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        <Dot className="text-gray-primary" style={{ width: "35px", height: "35px" }} />

        <Skeleton className="h-8 w-40" />

        <Dot className="text-gray-primary" style={{ width: "35px", height: "35px" }} />

        <Skeleton className="h-6 w-24" />
      </div>

      <div className="w-full flex flex-col gap-6">
        <Skeleton className="w-full h-12" />

        <div className="w-full flex flex-col gap-2 items-center">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </>
  );
}
