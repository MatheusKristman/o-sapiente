"use client";

import { motion, AnimatePresence } from "framer-motion";

import { recentsRequestsInfo } from "@/constants/recentsRequests-br";
import RecentsRequestsSlider from "@/components/home/components/recents-requests/RecentsRequestsSlider";
import { recentsRequestsTitleAnimation } from "@/constants/framer-animations/recentsRequests";

const RecentsRequests = () => {
  return (
    <section className="w-full mt-24">
      <AnimatePresence>
        <motion.h1
          variants={recentsRequestsTitleAnimation}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full mx-auto px-6 mb-9 text-2xl text-[#2C383F] font-semibold md:px-16 lg:container">
          {recentsRequestsInfo.title}
        </motion.h1>
      </AnimatePresence>

      <RecentsRequestsSlider />
    </section>
  );
};

export default RecentsRequests;
