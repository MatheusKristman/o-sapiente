"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";

import { recentsRequestsInfo } from "@/constants/recentsRequests-br";
import RecentsRequestsSlider from "@/components/home/components/recents-requests/RecentsRequestsSlider";
import { recentsRequestsTitleAnimation } from "@/constants/framer-animations/recentsRequests";
import useHomeStore from "@/stores/useHomeStore";

const RecentsRequests = () => {
  const { setRecentsRequests, recentsRequests } = useHomeStore();

  useEffect(() => {
    axios
      .get("/api/request/get-recents-requests")
      .then((res) => {
        console.log(res.data);
        setRecentsRequests(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {recentsRequests.length > 0 && (
        <section className="w-full mt-24">
          <AnimatePresence>
            <motion.h1
              variants={recentsRequestsTitleAnimation}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full mx-auto px-6 mb-9 text-2xl text-[#2C383F] font-semibold md:px-16 lg:container"
            >
              {recentsRequestsInfo.title}
            </motion.h1>
          </AnimatePresence>

          <RecentsRequestsSlider />
        </section>
      )}
    </>
  );
};

export default RecentsRequests;
