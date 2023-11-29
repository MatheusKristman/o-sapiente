"use client";

import { useState, useEffect } from "react";

import { StepType } from "@/types";
import StepBar from "@/components/register/professor/components/complete-register/StepBar";
import ThemeStep from "@/components/register/professor/components/complete-register/ThemeStep";
import AboutStep from "@/components/register/professor/components/complete-register/AboutStep";
import ProfilePhotoStep from "@/components/register/ProfilePhotoStep";
import ConfirmAccountStep from "@/components/register/ConfirmAccountStep";
import { AccountRole } from "@prisma/client";

interface CompleteRegisterPageProps {
  params: {
    id: string;
  };
}

export interface IProfileData {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  themes: string[];
  accountType: AccountRole;
}

const CompleteRegisterPage = ({ params }: CompleteRegisterPageProps) => {
  const [steps, setSteps] = useState<StepType>(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [aboutMeValue, setAboutMeValue] = useState<string>("");
  const [profileData, setProfileData] = useState<IProfileData | null>(null);

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  const { id } = params;

  return (
    <section className="w-full md:min-h-4/5 lg:min-h-[700px]">
      <StepBar actualStep={steps} />

      {steps === 1 && (
        <ThemeStep
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          setSteps={setSteps}
        />
      )}

      {steps === 2 && (
        <AboutStep
          aboutMeValue={aboutMeValue}
          setAboutMeValue={setAboutMeValue}
          setSteps={setSteps}
        />
      )}

      {steps === 3 && (
        <ProfilePhotoStep
          setSteps={setSteps}
          selectedOptions={selectedOptions}
          aboutMeValue={aboutMeValue}
          id={id}
          type="professor"
          setProfileData={setProfileData}
        />
      )}

      {steps === 4 && <ConfirmAccountStep profileData={profileData} />}
    </section>
  );
};

export default CompleteRegisterPage;
