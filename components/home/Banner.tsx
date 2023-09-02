"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { bannerInfo } from "../../constants/banner-br";
import Button from "../Button";
import {
  arrowAnimation,
  bannerAnimation,
} from "@/constants/framer-animations/banner";

const Banner = () => {
  return (
    <AnimatePresence>
      <motion.section
        transition={{ staggerChildren: 0.4 }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto -mt-24 w-full px-6 md:px-16 lg:container lg:mt-14"
      >
        <motion.div
          variants={arrowAnimation}
          className="mx-auto w-full max-w-4xl relative"
        >
          <Image
            src="/assets/images/arrow.png"
            alt="Seta"
            width={200}
            height={200}
            className="select-none pointer-events-none object-contain absolute -left-14 -top-56 transform rotate-12 hidden md:block lg:rotate-0 lg:-left-20 lg:-top-28 xl:-left-36 xl:-top-40 xl:-rotate-45"
          />
        </motion.div>
        <motion.div
          variants={bannerAnimation}
          className="bg-bannerMobile bg-no-repeat bg-cover bg-bottom rounded-2xl max-w-4xl mx-auto relative z-[999] sm:bg-bannerTablet sm:bg-right lg:bg-bannerDesktop"
        >
          <div className="px-9 pt-7 pb-80 rounded-2xl bg-gradient-to-b from-[#37474F] from-50% sm:pb-7 sm:bg-gradient-to-r">
            <h3 className="text-3xl font-semibold text-white text-center pb-4 sm:text-left sm:w-1/2 lg:text-4xl lg:leading-[60px]">
              {bannerInfo.title}
            </h3>

            <p className="text-base text-white leading-[29px] text-center pb-6 sm:text-left sm:w-1/2">
              {bannerInfo.desc}
            </p>

            <div className="w-full flex justify-center sm:w-1/2 sm:justify-start">
              <Button primary label={bannerInfo.btn} onClick={() => {}} />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Banner;
