"use client";

import { motion } from "framer-motion";

interface BenefitsCardsProps {
  position: string;
  marginBottom: string;
  title: string;
  desc: string;
  animationVariant: {
    offscreen: {
      x?: number;
      y?: number;
      opacity: number;
    };
    onscreen: {
      x?: number;
      y?: number;
      opacity: number;
      transition: {
        type: string;
        stiffness: number;
      };
    };
    exit: {
      x?: number;
      y?: number;
      opacity: number;
      transition: {
        duration: number;
      };
    };
  };
}

const BenefitsCards: React.FC<BenefitsCardsProps> = ({
  position,
  marginBottom,
  title,
  desc,
  animationVariant,
}) => {
  return (
    <motion.div
      variants={animationVariant}
      className={`w-full flex ${position} xl:flex-col`}
    >
      <div
        className={`bg-green-primary rounded-2xl p-[25px] flex flex-col items-center justify-center gap-6 max-w-[300px] ${marginBottom}`}
      >
        <h4 className="text-[#393F42] text-xl text-center leading-[30px]">
          {title}
        </h4>
        <p className="text-[#393F42] text-base text-center">{desc}</p>
      </div>
    </motion.div>
  );
};

export default BenefitsCards;
