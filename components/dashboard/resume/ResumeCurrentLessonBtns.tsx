"use client";

import { useState } from "react";
import { Status, Request } from "@prisma/client";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { currentLessonModalInfo } from "@/constants/dashboard/resume-br";
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";
import useCurrentLessonModalStore from "@/stores/useCurrentLessonModalStore";
import useFinishModalStore from "@/stores/useFinishModalStore";
import useUserStore from "@/stores/useUserStore";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useResumeStore from "@/stores/useResumeStore";

export function ResumeCurrentLessonBtns() {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { lesson, closeModal, setSupport, setBtns } = useCurrentLessonModalStore();
  const { userId } = useUserStore();
  const { openModal: openFinishModal, setRequestSelected: setFinishRequestSelected } = useFinishModalStore();
  const { openModal: openConfirmFinishModal, setRequestSelected: setConfirmFinishRequestSelected } =
    useConfirmFinishModalStore();
  const { setCurrentLesson, setRequests } = useResumeStore();

  if (!lesson) {
    return null;
  }

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setBtns();
    }, 350);
  }

  function handleOpenFinishModal() {
    if (lesson) {
      closeModal();

      setTimeout(() => {
        openFinishModal();
        setFinishRequestSelected(lesson);
      }, 350);
    }
  }

  function handleOpenConfirmFinishModal() {
    if (lesson) {
      closeModal();

      setTimeout(() => {
        openConfirmFinishModal();
        setConfirmFinishRequestSelected(lesson);
      }, 350);
    }
  }

  function handleFinishSupport() {
    if (lesson) {
      setIsFetching(true);

      axios
        .put(`/api/support/finish/${lesson.id}`, {
          previousStatus: lesson.previousStatus,
        })
        .then((res) => {
          setRequests(res.data.filter((request: Request) => !request.isConcluded));
          setCurrentLesson(res.data.filter((request: Request) => request.isOfferAccepted && !request.isConcluded));
          handleClose();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={FormAnimation} className="w-full">
      <div className="w-full flex flex-col gap-6">
        {!lesson.isConcluded && lesson.usersIdsVotedToFinish.length === 0 && (
          <Button
            onClick={handleOpenFinishModal}
            className="w-full"
            disabled={lesson.usersIdsVotedToFinish.includes(userId) || lesson.status === Status.support}
          >
            {lesson.status === Status.support
              ? currentLessonModalInfo.supportDisabledBtn
              : lesson.usersIdsVotedToFinish.includes(userId)
              ? currentLessonModalInfo.finishLessonDisabledBtn
              : currentLessonModalInfo.finishLessonBtn}
          </Button>
        )}

        {!lesson.isConcluded && lesson.usersIdsVotedToFinish.length === 1 && (
          <Button
            onClick={handleOpenConfirmFinishModal}
            className="w-full"
            disabled={lesson.usersIdsVotedToFinish.includes(userId) || lesson.status === Status.support}
          >
            {lesson.status === Status.support
              ? currentLessonModalInfo.supportDisabledBtn
              : lesson.usersIdsVotedToFinish.includes(userId)
              ? currentLessonModalInfo.finishLessonDisabledBtn
              : currentLessonModalInfo.confirmFinishLessonBtn}
          </Button>
        )}

        <div className="w-full flex flex-col gap-2 items-center">
          <span className="text-sm text-gray-primary/70 text-center">
            {lesson.status === Status.support
              ? currentLessonModalInfo.supportActiveDesc
              : currentLessonModalInfo.supportDesc}
          </span>

          {lesson.status === Status.support ? (
            <Button
              disabled={isFetching}
              onClick={handleFinishSupport}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              {isFetching && <Loader2 className="animate-spin" />}
              {currentLessonModalInfo.supportActiveBtn}
            </Button>
          ) : (
            <Button onClick={setSupport} variant="outline" className="w-full">
              {currentLessonModalInfo.supportBtn}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
