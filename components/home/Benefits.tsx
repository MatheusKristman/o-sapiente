"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Element } from "react-scroll";

import { studentsBenefitsInfos, professorBenefitsInfos } from "@/constants/benefits-br";
import {
  benefitsContainerAnimation,
  benefitsEvenCardAnimation,
  benefitsOddCardAnimation,
} from "@/constants/framer-animations/benefits";
import BenefitsCards from "./components/benefits/BenefitsCards";

const Benefits = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [isProfessor, setIsProfessor] = useState(false);
  const [isChangingInfo, setIsChangingInfo] = useState(false);

  const buttonStyle =
    "w-full p-4 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] cursor-pointer flex items-center gap-5 hover:shadow-lg transition-[bg shadow] duration-300 sm:p-6 sm:max-w-[280px]";

  function handleStudentButton() {
    setIsChangingInfo(true);
    setIsProfessor(false);

    setTimeout(() => {
      setIsChangingInfo(false);
      setIsStudent(true);
    }, 850);
  }

  function handleProfessorButton() {
    setIsChangingInfo(true);
    setIsStudent(false);

    setTimeout(() => {
      setIsChangingInfo(false);
      setIsProfessor(true);
    }, 850);
  }

  return (
    <section
      id="beneficios"
      className="w-full min-h-[1216px] mx-auto px-6 mt-12 relative z-[99] sm:min-h-[1028px] md:px-16 lg:container xl:min-h-fit xl:flex xl:items-center xl:mt-24 xl:h-[600px]">
      <div className="w-full flex flex-col gap-9 relative z-[999] sm:flex-row sm:justify-center xl:flex-col-reverse xl:justify-start xl:w-fit">
        <button
          onClick={handleProfessorButton}
          disabled={isChangingInfo}
          className={`${buttonStyle} ${
            isProfessor ? "bg-green-primary hover:bg-[#01AA72]" : "bg-[#37474F] hover:bg-[#29363D]"
          }`}>
          <div
            className={`${
              isProfessor ? "bg-[#01AA72]" : "bg-[#29363D]"
            } w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full sm:w-16 sm:h-16 sm:min-w-[64px] sm:min-h-[64px]`}>
            <span className="bg-briefcase bg-contain bg-no-repeat w-1/2 h-1/2" />
          </div>
          <span
            className={`${
              isProfessor ? "text-[#393F42]" : "text-white"
            } text-lg sm:text-xl font-medium`}>
            Professores
          </span>
        </button>

        <button
          onClick={handleStudentButton}
          disabled={isChangingInfo}
          className={`${buttonStyle} ${
            isStudent ? "bg-green-primary hover:bg-[#01AA72]" : "bg-[#37474F] hover:bg-[#29363D]"
          }`}>
          <div
            className={`${
              isStudent ? "bg-[#01AA72]" : "bg-[#29363D]"
            } w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full sm:w-16 sm:h-16 sm:min-w-[64px] sm:min-h-[64px]`}>
            <span className="bg-hat bg-contain bg-no-repeat w-1/2 h-1/2" />
          </div>
          <span
            className={`${
              isStudent ? "text-[#393F42]" : "text-white"
            } text-lg sm:text-xl font-medium`}>
            Alunos
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isStudent && (
          <motion.div
            variants={benefitsContainerAnimation}
            initial="offscreen"
            whileInView="onscreen"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full bg-benefitsStudentsMobile bg-[length:80%_100%] bg-top bg-no-repeat pt-12 mb-[120px] sm:bg-benefitsStudentsTablet sm:bg-[length:60%_90%] sm:pt-24 xl:bg-benefitsStudentsDesktop xl:bg-[length:85%_55%] xl:bg-left xl:pt-0 xl:pl-24 xl:mb-0 xl:flex xl:gap-9 xl:h-full">
            {studentsBenefitsInfos.map((benefit, index) => (
              <BenefitsCards
                key={benefit.title}
                position={
                  index % 2 !== 0 ? "justify-start xl:justify-end" : "justify-end xl:justify-start"
                }
                marginBottom={`${index === 0 && "mb-12"} ${index === 1 && "mb-10"}`}
                title={benefit.title}
                desc={benefit.desc}
                animationVariant={
                  index % 2 !== 0 ? benefitsOddCardAnimation : benefitsEvenCardAnimation
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfessor && (
          <motion.div
            variants={benefitsContainerAnimation}
            initial="offscreen"
            whileInView="onscreen"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full bg-benefitsProfessorMobile bg-[length:80%_100%] bg-top bg-no-repeat pt-[170px] transform -translate-y-[120px] sm:bg-benefitsProfessorTablet sm:bg-[length:60%_85%] sm:pt-24 sm:translate-y-0 sm:mb-[120px] xl:bg-benefitsProfessorDesktop xl:bg-[length:85%_55%] xl:bg-left xl:pt-0 xl:pl-24 xl:mb-0 xl:flex xl:gap-9 xl:h-full">
            {professorBenefitsInfos.map((benefit, index) => (
              <BenefitsCards
                key={benefit.title}
                position={
                  index % 2 === 0 ? "justify-start xl:justify-end" : "justify-end xl:justify-start"
                }
                marginBottom={`${index === 0 && "mb-12"} ${index === 1 && "mb-10"}`}
                title={benefit.title}
                desc={benefit.desc}
                animationVariant={
                  index % 2 === 0 ? benefitsOddCardAnimation : benefitsEvenCardAnimation
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Benefits;
