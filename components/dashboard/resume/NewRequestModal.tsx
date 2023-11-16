import { BsXLg } from "react-icons/bs";

import Button from "@/components/Button";
import { studentNewRequestInfo } from "@/constants/dashboard/resume-br";
import { AnimatePresence, motion } from "framer-motion";
import useNewRequestStore from "@/stores/useNewRequestStore";
import {
  newRequestFormAnimation,
  newRequestModalAnimation,
  newRequestOverlayAnimation,
} from "@/constants/framer-animations/new-request-modal";

const NewRequestModal = () => {
  const { isModalOpen, closeModal } = useNewRequestStore();

  function handleCloseButton() {
    closeModal();
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={newRequestOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={newRequestModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle"
            >
              <div className="w-full flex justify-end items-center">
                <button type="button" onClick={handleCloseButton} className="mb-6">
                  <BsXLg size={26} className="text-green-primary" />
                </button>
              </div>

              <div className="w-full flex flex-col">
                <h4 className="text-2xl text-gray-primary font-semibold text-left mb-9 sm:text-3xl">
                  {studentNewRequestInfo.title}
                </h4>

                <AnimatePresence>
                  <form className="w-full flex flex-col overflow-x-hidden">
                    <motion.div
                      variants={newRequestFormAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="relative flex items-center mb-4 after:w-6 after:h-6 after:bg-lightGrayArrowDown after:bg-no-repeat after:bg-contain after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 focus-within:after:rotate-180 after:transform-gpu"
                    >
                      <select className="w-full h-12 bg-[#EBEFF1] rounded-lg px-4 py-2 text-gray-primary/70 appearance-none outline-none focus:ring-2 focus:ring-green-primary lg:cursor-pointer">
                        <option value={studentNewRequestInfo.themePlaceholder} disabled selected>
                          {studentNewRequestInfo.themePlaceholder}
                        </option>
                        <option value={studentNewRequestInfo.themePlaceholder}>
                          {studentNewRequestInfo.themePlaceholder}
                        </option>
                      </select>
                    </motion.div>

                    <motion.textarea
                      variants={newRequestFormAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      placeholder={studentNewRequestInfo.descPlaceholder}
                      className="w-full h-40 mb-6 bg-[#EBEFF1] rounded-lg p-4 text-gray-primary/70 resize-none outline-none focus:ring-2 focus:ring-green-primary"
                    />

                    <motion.div
                      variants={newRequestFormAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Button
                        primary
                        fullWidth
                        label={studentNewRequestInfo.submitBtn}
                        onClick={() => {}}
                      />
                    </motion.div>
                  </form>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewRequestModal;
