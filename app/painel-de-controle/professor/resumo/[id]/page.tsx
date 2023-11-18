"use client";

import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import Button from "@/components/Button";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import BalanceBox from "@/components/dashboard/resume/BalanceBox";

const ResumePage = () => {
  return (
    <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:mb-12">
      <div className="w-full flex flex-col-reverse gap-9 md:flex-col lg:w-4/12 xl:w-6/12">
        <ResumeProfilePhoto type="Professor" />

        <BalanceBox />
      </div>

      <div className="w-full flex flex-col gap-8">
        <ResumeRequestBox type="Professor" />

        <ResumeCurrentLessonBox />
      </div>
    </div>
  );
};

export default ResumePage;
