"use client";

import { useState, useEffect } from "react";

import StepBar from "@/components/register/student/StepBar";
import ProfilePhotoStep from "@/components/register/ProfilePhotoStep";
import { StepType } from "@/types";

interface CompleteRegisterProps {
  params: {
    id: string;
  };
}

const CompleteRegisterPage: React.FC<CompleteRegisterProps> = ({ params }) => {
  const [steps, setSteps] = useState<StepType>(1);

  const { id } = params;

  useEffect(() => {
    console.log(steps);
  }, [steps]);

  return (
    <section className="w-full pb-12 md:h-4/5">
      <StepBar actualStep={steps} />

      <ProfilePhotoStep actualStep={steps} setSteps={setSteps} id={id} />
    </section>
  );
};

export default CompleteRegisterPage;
