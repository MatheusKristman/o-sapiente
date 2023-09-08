"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../Button";
import { heroInfos } from "@/constants/hero-br";
import {
  heroInfoAnimation,
  heroImageAnimation,
  heroImageMobileAnimation,
} from "@/constants/framer-animations/hero";
import useStudentModalStore from "@/stores/useStudentModalStore";

const Hero = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const { openModal, setToRequest } = useStudentModalStore();

  function openRequestModal() {
    openModal();
    setToRequest();
  }

  return (
    <AnimatePresence>
      <main className="w-full lg:h-4/5 mt-12 relative">
        <div className="lg:container mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between lg:gap-x-10">
          <motion.div
            transition={{ staggerChildren: 0.4 }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col items-center lg:items-start gap-y-9 w-full lg:w-2/5 px-6 md:px-16 lg:pl-16 lg:pr-0 relative z-[99]"
          >
            <motion.h1
              variants={heroInfoAnimation}
              className="max-w-md text-4xl lg:text-5xl text-gray-primary font-semibold text-center lg:text-left leading-[65px] lg:leading-[70px]"
            >
              {heroInfos.title1}
              <span className="text-green-primary font-semibold">
                {heroInfos.title2}
              </span>
            </motion.h1>

            <motion.p
              variants={heroInfoAnimation}
              className="text-base text-gray-primary text-center lg:text-left w-4/5 lg:w-full"
            >
              {heroInfos.desc}
            </motion.p>

            <motion.div variants={heroInfoAnimation}>
              <Button
                primary
                label={heroInfos.btn}
                onClick={openRequestModal}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={isMobile ? heroImageMobileAnimation : heroImageAnimation}
            initial="offscreen"
            animate="onscreen"
            className="select-none pointer-events-none w-full sm:max-w-[550px] lg:max-w-none lg:w-1/2 h-[440px] lg:h-4/5 xl:h-full relative lg:absolute lg:right-0 -top-14 lg:top-auto"
          >
            <Image
              src="/assets/images/hero-desktop.png"
              alt="Estudantes"
              fill
              className="object-contain lg:object-cover xl:object-contain object-center lg:object-left hidden sm:block"
            />
            <Image
              src="/assets/images/hero-mobile.png"
              alt="Estudantes"
              fill
              className="object-cover object-center block sm:hidden"
            />
          </motion.div>
        </div>
      </main>
    </AnimatePresence>
  );
};

export default Hero;
