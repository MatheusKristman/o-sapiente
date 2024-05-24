import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Subject } from "@prisma/client";

import studentNewRequestSchema from "@/constants/schemas/newRequestSchema";
import { studentRequestInfo } from "@/constants/loginModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useLoginModalStore from "@/stores/useLoginModalStore";
import { Button } from "@/components/ui/button";
import { studentNewRequestInfo } from "@/constants/dashboard/resume-br";
import { cn } from "@/libs/utils";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const StudentRequestForm = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextEnabled, setIsNextEnabled] = useState(true);

  const { setToNotRequest, setToRegister, setSubject, setDescription, activateBackBtn } = useLoginModalStore();
  const form = useForm<z.infer<typeof studentNewRequestSchema>>({
    // @ts-ignore
    resolver: zodResolver(studentNewRequestSchema),
    defaultValues: {
      subject: studentNewRequestInfo.themePlaceholder,
      subjectSpecific: "",
      description: "",
    },
  });
  const subjectValue = form.watch("subject");
  const descriptionValue = form.watch("description");

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("/api/subject?lang=br")
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (subjectValue !== "" && descriptionValue.length > 20) {
      setIsNextEnabled(false);
    } else {
      setIsNextEnabled(true);
    }
  }, [subjectValue, descriptionValue, setIsNextEnabled]);

  function onSubmit(values: z.infer<typeof studentNewRequestSchema>) {
    if (values.subject === "Outro" && values.subjectSpecific.length !== 0) {
      setSubject(values.subjectSpecific);
    } else {
      setSubject(values.subject);
    }

    setDescription(values.description);
    handleNextButton();
  }

  function handleNextButton() {
    setToNotRequest();
    activateBackBtn();

    setTimeout(() => {
      setToRegister();
    }, 350);
  }

  return (
    <>
      <motion.h4
        variants={studentFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-2xl text-[#2C383F] font-semibold mb-9 sm:text-3xl text-left"
      >
        {studentRequestInfo.title}
      </motion.h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div
            variants={studentFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "relative flex items-center mb-4 after:w-6 after:h-6 after:bg-lightGrayArrowDown after:bg-no-repeat after:bg-contain after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 focus-within:after:rotate-180 after:transform-gpu",
              form.formState.errors.subject && "mb-2"
            )}
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select
                      defaultValue={studentRequestInfo.themePlaceholder}
                      className={cn(
                        "w-full h-12 bg-[#EBEFF1] rounded-lg px-4 py-2 text-gray-primary/70 appearance-none outline-none focus:ring-2 focus:ring-green-primary lg:cursor-pointer",
                        form.formState.errors.subject && "ring-2 ring-[#FF7373]"
                      )}
                      {...field}
                    >
                      <option value={studentRequestInfo.themePlaceholder} disabled>
                        {studentRequestInfo.themePlaceholder}
                      </option>

                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.main}>
                          {sub.main}
                        </option>
                      ))}

                      <option value="Outro">Outro</option>
                    </select>
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </motion.div>

          {subjectValue === "Outro" && (
            <motion.div variants={studentFormAnimation} initial="initial" animate="animate" exit="exit">
              <FormField
                control={form.control}
                name="subjectSpecific"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.input
                        disabled={isLoading}
                        placeholder={studentRequestInfo.otherPlaceholder}
                        className={cn(
                          "w-full mb-6 bg-[#EBEFF1] rounded-lg p-4 text-gray-primary/70 resize-none outline-none focus:ring-2 focus:ring-green-primary",
                          form.formState.errors.description && "ring-2 ring-[#FF7373] focus:ring-[#FF7373] mb-2"
                        )}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          <motion.div variants={studentFormAnimation} initial="initial" animate="animate" exit="exit">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      placeholder={studentRequestInfo.messagePlaceholder}
                      autoComplete="off"
                      autoCorrect="off"
                      className="textarea mb-6 sm:h-40"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={studentFormAnimation} initial="initial" animate="animate" exit="exit">
            <Button disabled={isNextEnabled} type="submit" className="w-full">
              {studentRequestInfo.nextButton}
            </Button>
          </motion.div>
        </form>
      </Form>
    </>
  );
};

export default StudentRequestForm;
