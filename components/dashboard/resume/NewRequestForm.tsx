import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Subject } from "@prisma/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import Button from "@/components/Button";
import useNewRequestStore from "@/stores/useNewRequestStore";
import { studentNewRequestInfo } from "@/constants/dashboard/resume-br";
import { newRequestFormAnimation } from "@/constants/framer-animations/new-request-modal";
import newRequestSchema, { newRequestSchemaTypes } from "@/constants/schemas/newRequestSchema";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const NewRequestForm = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { activateMessage, deactivateForm } = useNewRequestStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: studentNewRequestInfo.themePlaceholder,
      description: "",
    },
    resolver: yupResolver(newRequestSchema),
  });
  const session = useSession();

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

  const onSubmit = (data: newRequestSchemaTypes) => {
    setIsSubmitting(true);
    axios
      .post("/api/request/create", {
        email: session?.data?.user?.email,
        subject: data.subject,
        description: data.description,
      })
      .then((res) => {
        if (res.data.sended) {
          handleMessage();
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
        className="text-2xl text-gray-primary font-semibold text-left mb-9 sm:text-3xl">
        {studentNewRequestInfo.title}
      </motion.h4>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col ">
        <motion.div
          variants={newRequestFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            "relative flex items-center mb-4 after:w-6 after:h-6 after:bg-lightGrayArrowDown after:bg-no-repeat after:bg-contain after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 focus-within:after:rotate-180 after:transform-gpu",
            errors.subject && "mb-2",
          )}>
          <select
            {...register("subject")}
            disabled={isLoading || isSubmitting}
            defaultValue={studentNewRequestInfo.themePlaceholder}
            className={cn(
              "w-full h-12 bg-[#EBEFF1] rounded-lg px-4 py-2 text-gray-primary/70 appearance-none outline-none focus:ring-2 focus:ring-green-primary lg:cursor-pointer",
              errors.subject && "ring-2 ring-[#FF7373]",
            )}>
            <option value={studentNewRequestInfo.themePlaceholder} disabled>
              {studentNewRequestInfo.themePlaceholder}
            </option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.main}>
                {subject.main}
              </option>
            ))}
          </select>
        </motion.div>
        {errors.subject && (
          <span className="text-sm text-[#FF7373] font-medium text-left mb-4">
            {errors.subject?.message}
          </span>
        )}

        <motion.textarea
          {...register("description")}
          variants={newRequestFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          disabled={isLoading || isSubmitting}
          placeholder={studentNewRequestInfo.descPlaceholder}
          className={cn(
            "w-full h-40 mb-6 bg-[#EBEFF1] rounded-lg p-4 text-gray-primary/70 resize-none outline-none focus:ring-2 focus:ring-green-primary",
            errors.description && "ring-2 ring-[#FF7373] focus:ring-[#FF7373] mb-2",
          )}
        />
        {errors.description && (
          <span className="text-sm text-[#FF7373] font-medium text-left mb-6">
            {errors.description?.message}
          </span>
        )}

        <motion.div
          variants={newRequestFormAnimation}
          initial="initial"
          animate="animate"
          exit="exit">
          <Button
            type="submit"
            primary
            fullWidth
            label={
              isSubmitting ? studentNewRequestInfo.submittingBtn : studentNewRequestInfo.submitBtn
            }
            disabled={isLoading || isSubmitting}
            icon={isSubmitting ? <Loader2 className="h-5 w-5 ml-2 animate-spin" /> : null}
          />
        </motion.div>
      </form>
    </div>
  );
};

export default NewRequestForm;
