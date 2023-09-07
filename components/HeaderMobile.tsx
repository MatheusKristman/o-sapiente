"use client";

import { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { scroller } from "react-scroll";

import Button from "./Button";
import {
  navLinks,
  professorHeaderButton,
  studentHeaderButton,
} from "@/constants/header-br";
import { mobileMenuAnimation } from "@/constants/framer-animations/header";
import useHeaderStore from "@/stores/useHeaderStore";

const HeaderMobile = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useHeaderStore();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflowY = "unset";
      }, 450);
    }
  }, [isMobileMenuOpen]);

  function scrollTo(id: string) {
    closeMobileMenu();
    const element = document.getElementById(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuAnimation}
            initial="offscreen"
            animate="onscreen"
            exit="exit"
            className="bg-green-primary rounded-lg py-8 pl-6 pr-8 flex lg:hidden flex-col items-end justify-between gap-y-8 w-fit absolute right-0 top-0 z-[9999]"
          >
            <button
              type="button"
              onClick={closeMobileMenu}
              className="text-white cursor-pointer"
            >
              <BsXLg size={26} />
            </button>

            <nav>
              <ul className="lg:hidden flex flex-col items-end justify-between gap-y-6">
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white cursor-pointer text-lg whitespace-nowrap"
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:hidden flex flex-col items-center justify-center gap-y-4 w-full">
              <Button
                secondaryMobile
                fullWidth
                label={professorHeaderButton.label}
                onClick={() => {}}
              />

              <Button
                primaryMobile
                fullWidth
                label={studentHeaderButton.label}
                onClick={() => {}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;
