"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { AboutStepInfos } from "@/constants/register/about-step-br";

interface AboutStepsProps {
  aboutMeValue: string;
  setAboutMeValue: Dispatch<SetStateAction<string>>;
  setSteps: Dispatch<SetStateAction<number>>;
}

const AboutStep = ({ aboutMeValue, setAboutMeValue, setSteps }: AboutStepsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextAvailable, setIsNextAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (aboutMeValue.length > 40) {
      setIsNextAvailable(true);
    } else {
      setIsNextAvailable(false);
    }
  }, [aboutMeValue]);

  function handleDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;

    setAboutMeValue(value);
  }

  function handleBackBtn() {
    setAboutMeValue("");
    setSteps(1);
  }

  function handleNextBtn() {
    if (aboutMeValue.length > 40 && isNextAvailable) {
      setSteps(3);
    }
  }

  return (
    <div className="w-full h-full grid items-center py-12 lg:py-24">
      <div className="w-full mx-auto px-6 gap-9 flex flex-col md:items-center md:px-16 lg:flex-row lg:justify-between lg:items-start lg:gap-24 lg:container">
        <div className="w-full px-6 py-9 rounded-2xl bg-green-primary h-fit lg:w-2/5">
          <p className="w-full text-white text-lg">{AboutStepInfos.boxMessage}</p>
        </div>

        <div className="w-full md:max-w-[550px] lg:w-3/5">
          <h2 className="text-2xl text-gray-primary text-center font-semibold mb-6 md:text-3xl md:text-left">
            {AboutStepInfos.title} <span className="text-green-primary">{AboutStepInfos.titleColored}</span>
          </h2>

          <textarea
            placeholder={AboutStepInfos.placeholder}
            onChange={handleDescription}
            value={aboutMeValue}
            className="textarea-light !h-64 mb-9"
          />

          <div className="w-full flex flex-col gap-6 md:flex-row">
            <Button variant="outline" className="w-full" onClick={handleBackBtn} disabled={isLoading}>
              {AboutStepInfos.backButton}
            </Button>

            <Button className="w-full" onClick={handleNextBtn} disabled={!isNextAvailable || isLoading}>
              {AboutStepInfos.nextButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStep;
