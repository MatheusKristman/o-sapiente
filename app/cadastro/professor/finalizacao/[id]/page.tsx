"use client";

import { useState, useEffect } from "react";

import { StepType } from "@/types";
import StepBar from "@/components/register/professor/components/complete-register/StepBar";
import ThemeStep from "@/components/register/professor/components/complete-register/ThemeStep";
import AboutStep from "@/components/register/professor/components/complete-register/AboutStep";

interface CompleteRegisterPageProps {
  params: {
    id: string;
  };
}

const CompleteRegisterPage = ({ params }: CompleteRegisterPageProps) => {
  const [steps, setSteps] = useState<StepType>(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  const { id } = params;

  return (
    <section className="w-full md:min-h-4/5">
      <StepBar actualStep={steps} />

      {steps === 1 && (
        <ThemeStep
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          setSteps={setSteps}
        />
      )}

      {steps === 2 && <AboutStep />}
    </section>
  );
};

export default CompleteRegisterPage;
