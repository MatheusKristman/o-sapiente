import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Subject } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import useNewRequestStore from "@/stores/useNewRequestStore";
import { studentNewRequestInfo } from "@/constants/dashboard/resume-br";
import { newRequestFormAnimation } from "@/constants/framer-animations/new-request-modal";
import newRequestSchema from "@/constants/schemas/newRequestSchema";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import useResumeStore from "@/stores/useResumeStore";

const NewRequestForm = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setRequests } = useResumeStore();
  const { activateMessage, deactivateForm } = useNewRequestStore();
  const form = useForm({
    defaultValues: {
      subject: studentNewRequestInfo.themePlaceholder,
      subjectSpecific: "",
      description: "",
    },
    // @ts-ignore
    resolver: zodResolver(newRequestSchema),
  });
  const session = useSession();
  const subjectValue = form.watch("subject");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/subject?lang=br")
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleMessage = () => {
    deactivateForm();

    setTimeout(() => {
      activateMessage();
    }, 350);
  };

  const onSubmit = (data: z.infer<typeof newRequestSchema>) => {
    setIsSubmitting(true);

    const subjectSelected =
      data.subject === "Outro" &&
      data.subjectSpecific &&
      data.subjectSpecific.length > 0
        ? data.subjectSpecific
        : data.subject;

    axios
      .post("/api/request/create", {
        email: session?.data?.user?.email,
        subject: subjectSelected,
        description: data.description,
      })
      .then((res) => {
        if (res.data.sended) {
          handleMessage();

          setRequests(res.data.requests);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="w-full flex flex-col">
      <motion.h4
        variants={newRequestFormAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-2xl text-gray-primary font-semibold text-left mb-9 sm:text-3xl"
      >
        {studentNewRequestInfo.title}
      </motion.h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col"
        >
          <motion.div
            variants={newRequestFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "relative flex items-center mb-4 after:w-6 after:h-6 after:bg-lightGrayArrowDown after:bg-no-repeat after:bg-contain after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 focus-within:after:rotate-180 after:transform-gpu",
              form.formState.errors.subject && "mb-2",
            )}
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select
                      disabled={isLoading || isSubmitting}
                      defaultValue={studentNewRequestInfo.themePlaceholder}
                      className={cn(
                        "w-full h-12 bg-[#EBEFF1] rounded-lg px-4 py-2 text-gray-primary/70 appearance-none outline-none focus:ring-2 focus:ring-green-primary lg:cursor-pointer",
                        form.formState.errors.subject &&
                          "ring-2 ring-[#FF7373]",
                      )}
                      {...field}
                    >
                      <option
                        value={studentNewRequestInfo.themePlaceholder}
                        disabled
                      >
                        {studentNewRequestInfo.themePlaceholder}
                      </option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.main}>
                          {subject.main}
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
            <motion.div
              variants={newRequestFormAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <FormField
                control={form.control}
                name="subjectSpecific"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        disabled={isLoading || isSubmitting}
                        placeholder={studentNewRequestInfo.otherPlaceholder}
                        className={cn(
                          "w-full mb-6 bg-[#EBEFF1] rounded-lg p-4 text-gray-primary/70 resize-none outline-none focus:ring-2 focus:ring-green-primary",
                          form.formState.errors.description &&
                            "ring-2 ring-[#FF7373] focus:ring-[#FF7373] mb-2",
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

          <motion.div
            variants={newRequestFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      disabled={isLoading || isSubmitting}
                      placeholder={studentNewRequestInfo.descPlaceholder}
                      className={cn(
                        "w-full h-40 mb-6 bg-[#EBEFF1] rounded-lg p-4 text-gray-primary/70 resize-none outline-none focus:ring-2 focus:ring-green-primary",
                        form.formState.errors.description &&
                          "ring-2 ring-[#FF7373] focus:ring-[#FF7373] mb-2",
                      )}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={newRequestFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 ml-2 animate-spin" />
              ) : null}
              {isSubmitting
                ? studentNewRequestInfo.submittingBtn
                : studentNewRequestInfo.submitBtn}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default NewRequestForm;
