"use client";

import Image from "next/image";
import { Dot } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { studentResumeInfos } from "@/constants/dashboard/resume-br";
import { cn } from "@/libs/utils";
import { RequestWithUsersAndOffers } from "@/types";
import { usePathname } from "next/navigation";
import useFinishModalStore from "@/stores/useFinishModalStore";
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";
import useHeaderStore from "@/stores/useHeaderStore";

interface CurrentLessonMessageBoxProps {
    lesson: RequestWithUsersAndOffers;
    last?: boolean;
}

const CurrentLessonMessageBox = ({
    lesson,
    last,
}: CurrentLessonMessageBoxProps) => {
    const {
        openModal: openFinishModal,
        setRequestSelected: setFinishRequestSelected,
    } = useFinishModalStore();
    const {
        openModal: openConfirmFinishModal,
        setRequestSelected: setConfirmFinishRequestSelected,
    } = useConfirmFinishModalStore();
    const { userId } = useHeaderStore();

    const pathname = usePathname();

    function handleOpenFinishModal() {
        openFinishModal();
        setFinishRequestSelected(lesson);
    }

    function handleOpenConfirmFinishModal() {
        openConfirmFinishModal();
        setConfirmFinishRequestSelected(lesson);
    }

    return (
        <div
            className={cn(
                "w-full rounded-lg bg-green-primary p-5 mb-4",
                last && "mb-0",
            )}
        >
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 xl:w-full">
                <div className="flex justify-center xl:w-1/12">
                    <Image
                        src={
                            lesson.users[1].profilePhoto
                                ? lesson.users[1].profilePhoto
                                : "/assets/images/default-user-photo.svg"
                        }
                        alt="Perfil"
                        width={50}
                        height={40}
                        className="object-cover rounded-3xl lg:w-12 lg:h-12"
                    />
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 text-white text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
                    <span className="-mb-3 lg:mb-0">{`${lesson.users[1].firstName} ${lesson.users[1].lastName}`}</span>

                    <Dot style={{ width: "35px", height: "35px" }} />

                    <span className="text-base -mt-3 lg:mt-0">
                        {lesson.subject}
                    </span>
                </div>

                <div className="xl:flex xl:justify-end xl:w-5/12">
                    <div className="flex flex-col items-center justify-center gap-4">
                        {!lesson.isConcluded &&
                            lesson.usersIdsVotedToFinish.length === 0 ? (
                            <Button
                                variant="secondary"
                                onClick={handleOpenFinishModal}
                                className="w-full"
                                disabled={lesson.usersIdsVotedToFinish.includes(
                                    userId,
                                )}
                            >
                                {lesson.usersIdsVotedToFinish.includes(userId)
                                    ? studentResumeInfos.finishLessonDisabledBtn
                                    : studentResumeInfos.finishLessonBtn}
                            </Button>
                        ) : lesson.usersIdsVotedToFinish.length === 1 ? (
                            <Button
                                variant="secondary"
                                onClick={handleOpenConfirmFinishModal}
                                className="w-full"
                                disabled={lesson.usersIdsVotedToFinish.includes(
                                    userId,
                                )}
                            >
                                {lesson.usersIdsVotedToFinish.includes(userId)
                                    ? studentResumeInfos.finishLessonDisabledBtn
                                    : studentResumeInfos.confirmFinishLessonBtn}
                            </Button>
                        ) : null}

                        <Button variant="secondary" className="w-full" asChild>
                            <Link
                                href={`${pathname
                                    ?.split("/")
                                    .slice(0, -1)
                                    .join(
                                        "/",
                                    )}/mensagens/${lesson.conversationId}`}
                            >
                                {studentResumeInfos.seeMessageBtn}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentLessonMessageBox;
