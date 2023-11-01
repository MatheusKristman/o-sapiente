"use client";

import { useState } from "react";

import { StepType } from "@/types";
import StepBar from "@/components/register/professor/components/complete-register/StepBar";
import ThemeStep from "@/components/register/professor/components/complete-register/ThemeStep";

interface CompleteRegisterPageProps {
  params: {
    id: string;
  };
}

const CompleteRegisterPage = ({ params }: CompleteRegisterPageProps) => {
  const [steps, setSteps] = useState<StepType>(1);

  const { id } = params;

  return (
    <section className="w-full md:min-h-4/5">
      <StepBar actualStep={steps} />

      {steps === 1 && <ThemeStep />}
    </section>
  );
};

export default CompleteRegisterPage;
