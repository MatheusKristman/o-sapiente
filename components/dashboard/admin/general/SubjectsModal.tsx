"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import { ChangeEvent, useState } from "react";
import { Loader2, Plus, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  ModalAnimation,
  OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAdminSubjectsModalStore from "@/stores/useAdminSubjectsModalStore";
import useAdminStore from "@/stores/useAdminStore";
import { SubjectsModalText } from "@/constants/dashboard/admin-general-br";

export function SubjectsModal() {
  const [subValue, setSubValue] = useState<string>("");

  const {
    main,
    setMain,
    subs,
    addSubs,
    removeSubs,
    resetSubs,
    isLoading,
    setLoading,
    isModalOpen,
    closeModal,
  } = useAdminSubjectsModalStore();
  const { setSubjects } = useAdminStore();
  const buttonDisabled = main.length < 3 || subs.length === 0 || isLoading;

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setMain("");
      resetSubs();
    }, 350);
  }

  function handleSubs() {
    if (subValue.length > 0) {
      addSubs(subValue);
      setSubValue("");
    }
  }

  function Submit() {
    if (main.length >= 3 && subs.length > 0) {
      setLoading(true);

      axios
        .post("/api/adm/subject/create", { main, subs, lang: "br" })
        .then((res) => {
          setSubjects(res.data);
          toast.success("Nova matéria cadastrada com sucesso");
          handleClose();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden"
          >
            <div className="w-full flex justify-end items-center">
              <Button
                variant="link"
                size="icon"
                type="button"
                onClick={handleClose}
                className="mb-6"
              >
                <BsXLg size={26} className="text-green-primary" />
              </Button>
            </div>

            <h1 className="text-gray-primary text-2xl sm:text-3xl text-left font-semibold mb-6">
              {SubjectsModalText.title}
            </h1>

            <div className="w-full flex flex-col gap-4 mb-6">
              <div className="w-full flex flex-col gap-2">
                <label className="text-lg text-gray-primary font-medium text-left">
                  {SubjectsModalText.mainLabel}
                </label>

                <Input
                  name="main"
                  value={main}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMain(e.target.value)
                  }
                  className="input w-full"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-lg text-gray-primary font-medium text-left">
                  {SubjectsModalText.subsLabel}
                </label>

                <div className="w-full flex items-center gap-2">
                  <Input
                    name="subs"
                    value={subValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSubValue(e.target.value)
                    }
                    className="input w-full"
                  />

                  <Button onClick={handleSubs}>
                    <Plus />
                  </Button>
                </div>

                <div className="w-full flex flex-wrap gap-x-2 gap-y-4">
                  {subs.map((sub) => (
                    <span
                      key={sub}
                      className="relative bg-green-primary px-4 py-2 rounded-md text-white text-sm font-medium group"
                    >
                      {sub}
                      <div
                        onClick={() => removeSubs(sub)}
                        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-green-primary rounded-md flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash color="#FFFFFF" />
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              disabled={buttonDisabled}
              onClick={Submit}
              className="w-full flex items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {SubjectsModalText.saveBtn}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
