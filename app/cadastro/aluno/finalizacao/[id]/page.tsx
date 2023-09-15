"use client";

import { useState, useEffect } from "react";

import StepBar from "@/components/register/student/StepBar";
import ProfilePhotoStep from "@/components/register/ProfilePhotoStep";
import ConfirmAccountStep from "@/components/register/ConfirmAccountStep";
import { StepType } from "@/types";

interface CompleteRegisterProps {
  params: {
    id: string;
  };
}

const CompleteRegisterPage: React.FC<CompleteRegisterProps> = ({ params }) => {
  const [steps, setSteps] = useState<StepType>(1);

  const { id } = params;

  return (
    <section className="w-full md:h-4/5">
      <StepBar actualStep={steps} />

      {steps === 1 && (
        <ProfilePhotoStep actualStep={steps} setSteps={setSteps} id={id} />
      )}
      {steps === 2 && <ConfirmAccountStep />}
    </section>
  );
};

export default CompleteRegisterPage;
