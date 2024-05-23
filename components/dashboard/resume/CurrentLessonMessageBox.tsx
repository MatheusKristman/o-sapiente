"use client";

import Image from "next/image";
import { Dot, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { studentResumeInfos } from "@/constants/dashboard/resume-br";
import { cn } from "@/libs/utils";
import { RequestWithUsersAndOffers } from "@/types";
import useUserStore from "@/stores/useUserStore";
import useCurrentLessonModalStore from "@/stores/useCurrentLessonModalStore";

interface CurrentLessonMessageBoxProps {
  lesson: RequestWithUsersAndOffers;
  last?: boolean;
}

const CurrentLessonMessageBox = ({ lesson, last }: CurrentLessonMessageBoxProps) => {
  const { userId } = useUserStore();
  const { openModal, setLesson } = useCurrentLessonModalStore();

  const pathname = usePathname();
  const filteredUser = lesson.users.filter((user) => user.id !== userId)[0];

  function handleOpenCurrentLessonModal() {
    console.log(lesson);
    setLesson(lesson);
    openModal();
  }

  return (
    <div className={cn("w-full rounded-lg bg-green-primary p-3 mb-4", last && "mb-0")}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 xl:w-full">
        <div className="flex justify-center xl:w-1/12">
          <Image
            src={filteredUser.profilePhoto ? filteredUser.profilePhoto : "/assets/images/default-user-photo.svg"}
            alt="Perfil"
            width={50}
            height={40}
            className="object-cover rounded-3xl lg:w-12 lg:h-12"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 text-white text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
          <span className="-mb-3 lg:mb-0">{`${filteredUser.firstName} ${filteredUser.lastName}`}</span>

          <Dot style={{ width: "35px", height: "35px" }} />

          <span className="text-base -mt-3 lg:mt-0">{lesson.subject}</span>
        </div>

        <div className="xl:flex xl:justify-end xl:w-5/12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" className="w-full" asChild>
              <Link href={`${pathname?.split("/").slice(0, -1).join("/")}/mensagens/${lesson.conversationId}`}>
                {studentResumeInfos.seeMessageBtn}
              </Link>
            </Button>

            <Button onClick={handleOpenCurrentLessonModal} variant="secondary" className="px-3">
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLessonMessageBox;
