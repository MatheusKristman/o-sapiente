"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";

import { contactInfo, contactFormInfo } from "@/constants/contact-bg";
import {
  contactRightSideAnimation,
  contactLeftSideAnimation,
} from "@/constants/framer-animations/contacts";

const Contact = () => {
  return (
    <AnimatePresence>
      <section
        id="contato"
        className="w-full bg-green-primary mt-12 relative lg:before:content-[''] lg:before:bg-paperAirplane lg:before:bg-contain lg:before:bg-no-repeat lg:before:block lg:before:w-1/2 lg:before:h-64 lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:after:content-[''] lg:after:bg-contactDesktop lg:after:bg-[length:100%_100%] lg:after:bg-no-repeat lg:after:bg-right lg:after:w-[60%] lg:after:h-full lg:after:block lg:after:absolute lg:after:top-0 lg:after:right-0 lg:after:z-[9]">
        <div className="flex flex-col w-full mx-auto lg:container lg:flex-row">
          <motion.div
            transition={{ staggerChildren: 0.4 }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="pb-24 px-6 pt-9 relative after:content-[''] after:w-full after:h-28 after:bg-paperAirplane after:bg-no-repeat after:bg-contain after:absolute after:bottom-0 after:-left-8 sm:after:h-64 md:px-16 lg:w-[50%] lg:pt-12 lg:after:bg-none">
            <motion.h4
              variants={contactRightSideAnimation}
              className="text-2xl font-semibold text-[#393F42] mb-6 sm:text-3xl sm:max-w-md sm:mb-9">
              {contactInfo.title}
            </motion.h4>

            <motion.p
              variants={contactRightSideAnimation}
              className="text-base leading-[29px] text-[#37474F] sm:text-lg sm:leading-[40px] lg:max-w-md">
              {contactInfo.desc}
            </motion.p>
          </motion.div>

          <motion.div
            transition={{ staggerChildren: 0.4 }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-contactMobile bg-no-repeat bg-[length:100%_100%] relative z-[99] px-6 pb-9 pt-20 -mt-12 sm:pt-28 sm:-mt-28 md:bg-contactTablet md:px-16 md:pt-36 lg:w-[50%] lg:bg-none lg:mt-0 lg:py-12">
            <motion.h4
              variants={contactLeftSideAnimation}
              className="text-2xl text-white font-semibold mb-6 sm:text-3xl">
              {contactFormInfo.title}
            </motion.h4>

            <motion.form
              transition={{ staggerChildren: 0.2 }}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center justify-center">
              <motion.label
                variants={contactLeftSideAnimation}
                htmlFor="name"
                className="w-full flex flex-col items-start gap-1 mb-4 text-[18px] text-white font-medium">
                {contactFormInfo.name}
                <input
                  id="name"
                  name="name"
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full h-11 rounded-lg bg-[#26343A] px-3 text-base text-white font-normal border-none outline-none focus:bg-[#1E292E] transition-colors duration-300"
                />
              </motion.label>

              <motion.label
                variants={contactLeftSideAnimation}
                htmlFor="email"
                className="w-full flex flex-col items-start gap-1 mb-4 text-[18px] text-white font-medium">
                {contactFormInfo.email}
                <input
                  id="email"
                  name="email"
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full h-11 rounded-lg bg-[#26343A] px-3 text-base text-white font-normal border-none outline-none focus:bg-[#1E292E] transition-colors duration-300"
                />
              </motion.label>

              <motion.label
                variants={contactLeftSideAnimation}
                htmlFor="subject"
                className="w-full flex flex-col items-start gap-1 mb-4 text-[18px] text-white font-medium">
                {contactFormInfo.subject}
                <input
                  id="subject"
                  name="subject"
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full h-11 rounded-lg bg-[#26343A] px-3 text-base text-white font-normal border-none outline-none focus:bg-[#1E292E] transition-colors duration-300"
                />
              </motion.label>

              <motion.label
                variants={contactLeftSideAnimation}
                htmlFor="message"
                className="w-full flex flex-col items-start gap-1 text-[18px] text-white font-medium">
                {contactFormInfo.name}
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full h-24 rounded-lg bg-[#26343A] px-3 py-2 resize-none text-base text-white font-normal border-none outline-none focus:bg-[#1E292E] transition-colors duration-300 lg:h-40"
                />
              </motion.label>

              <motion.button
                variants={contactLeftSideAnimation}
                type="submit"
                className="mt-9 bg-green-primary w-full h-11 rounded-lg flex items-center justify-center text-lg text-[#24493D] font-semibold lg:hover:brightness-90 transition-[filter]">
                {contactFormInfo.submitBtn}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default Contact;
