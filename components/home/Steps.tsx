"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Element } from "react-scroll";

import { stepsInfo } from "@/constants/steps-br";
import { stepsTitleAnimation, stepsCardAnimation } from "@/constants/framer-animations/steps";

const Steps = () => {
  return (
    <AnimatePresence>
      <section
        id="como-funciona"
        className="w-full mx-auto px-6 pt-24 md:px-16 lg:container lg:pt-40 relative z-[99]">
        <motion.h2
          variants={stepsTitleAnimation}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl sm:text-4xl text-gray-primary font-semibold text-center">
          {stepsInfo.title}
        </motion.h2>

        <motion.div
          transition={{
            staggerChildren: 0.4,
          }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full mt-9 flex flex-col gap-11 lg:flex-row lg:justify-between">
          {stepsInfo.cards.map((card) => (
            <motion.div
              key={card.step}
              variants={stepsCardAnimation}
              className="w-full px-6 py-9 bg-[#2C383F] rounded-2xl border-[#2C383F] group hover:border-green-primary border-solid border-2 transition-[border bg shadow] shadow-md shadow-[rgba(0,0,0,0.25)] hover:shadow-lg">
              <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
                <span className="w-14 h-14 min-w-[56px] min-h-[56px] flex items-center justify-center bg-white group-hover:bg-green-primary rounded-full text-[#2C383F] text-xl leading-none transition duration-300 cursor-default select-none pointer-events-none">
                  {card.step}
                </span>

                <h5 className="text-white text-xl font-semibold">{card.title}</h5>
              </div>

              <p className="text-white text-base leading-8">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </AnimatePresence>
  );
};

export default Steps;
