"use client";

import { studentResumeInfos } from "@/constants/dashboard/resume-br";
import CurrentLessonMessageBox from "./CurrentLessonMessageBox";
import useResumeStore from "@/stores/useResumeStore";

const ResumeCurrentLessonBox = () => {
    const { currentLesson } = useResumeStore();

    // TODO: ajustar para aparecer somente as aulas que o professor está participando

    return (
        <div className="w-full rounded-lg bg-white p-9 mb-12 shadow-md shadow-[rgba(0,0,0,0.25)]">
            <h2 className=" text-2xl text-green-primary font-semibold mb-5 md:text-3xl lg:whitespace-nowrap whitespace-normal">
                {studentResumeInfos.currentLessonTitle}
            </h2>

            <div className="relative w-full max-h-[600px] lg:max-h-[400px] overflow-auto scrollbar scrollbar-thumb-slate-100">
                {currentLesson.length > 0 ? (
                    <>
                        <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

                        {currentLesson.map((lesson, index) => (
                            <CurrentLessonMessageBox
                                key={index}
                                lesson={lesson}
                                last={index === currentLesson.length - 1}
                            />
                        ))}

                        <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
                    </>
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <span className="text-gray-primary/50 text-lg font-medium">
                            {studentResumeInfos.noCurrentLessonMessage}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeCurrentLessonBox;
