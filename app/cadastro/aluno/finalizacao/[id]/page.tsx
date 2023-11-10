"use client";

import { useState } from "react";

import StepBar from "@/components/register/student/StepBar";
import ProfilePhotoStep from "@/components/register/ProfilePhotoStep";
import ConfirmAccountStep from "@/components/register/ConfirmAccountStep";
import { StepType } from "@/types";
import { IProfileData } from "@/app/cadastro/professor/finalizacao/[id]/page";

interface CompleteRegisterProps {
  params: {
    id: string;
  };
}

const CompleteRegisterPage: React.FC<CompleteRegisterProps> = ({ params }) => {
  const [steps, setSteps] = useState<StepType>(1);
  const [profileData, setProfileData] = useState<IProfileData | null>(null);

  const { id } = params;

  return (
    <section className="w-full md:h-4/5">
      <StepBar actualStep={steps} />

      {steps === 1 && (
        <ProfilePhotoStep
          setProfileData={setProfileData}
          setSteps={setSteps}
          id={id}
          type="student"
        />
      )}
      {steps === 2 && <ConfirmAccountStep profileData={profileData} />}
    </section>
  );
};

export default CompleteRegisterPage;
