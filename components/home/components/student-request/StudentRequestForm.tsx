import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { studentRequestInfo } from "@/constants/studentModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useStudentModalStore from "@/stores/useStudentModalStore";
import { Button } from "@/components/ui/button";

const StudentRequestForm = () => {
  const [isNextEnabled, setIsNextEnabled] = useState(true);

  const {
    setToNotRequest,
    setToRegister,
    subject,
    setSubject,
    description,
    setDescription,
    activateBackBtn,
  } = useStudentModalStore();

  useEffect(() => {
    if (subject !== "" && description.length > 100) {
      setIsNextEnabled(false);
    } else {
      setIsNextEnabled(true);
    }
  }, [subject, description, setIsNextEnabled]);

  function handleNextButton() {
    setToNotRequest();
    activateBackBtn();

    setTimeout(() => {
      setToRegister();
    }, 350);
  }

  return (
    <form className="overflow-x-hidden">
      <motion.input
        variants={studentFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        placeholder={studentRequestInfo.themePlaceholder}
        name="subject"
        autoComplete="off"
        autoCorrect="off"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full h-11 rounded-lg px-4 py-2 bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors mb-4"
      />

      <motion.textarea
        variants={studentFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        placeholder={studentRequestInfo.messagePlaceholder}
        name="description"
        autoComplete="off"
        autoCorrect="off"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-24 rounded-lg px-4 py-2 bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors resize-none mb-6 sm:h-40"
      />

      <motion.div
        variants={studentFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Button
          disabled={isNextEnabled}
          type="button"
          onClick={handleNextButton}
          className="w-full"
        >
          {studentRequestInfo.nextButton}
        </Button>
      </motion.div>
    </form>
  );
};

export default StudentRequestForm;
