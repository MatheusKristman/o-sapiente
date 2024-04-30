import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import axios from "axios";

import { studentForgotPasswordInfo } from "@/constants/studentModal-br";
import { studentFormAnimation } from "@/constants/framer-animations/student-modal";
import useStudentModalStore from "@/stores/useStudentModalStore";
import studentForgotPasswordSchema from "@/constants/schemas/studentForgotPasswordSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";

function StudentForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setToNotRecoverPassword, setToLogin, setToRecoverPasswordMessage } =
    useStudentModalStore();

  const form = useForm<z.infer<typeof studentForgotPasswordSchema>>({
    defaultValues: {
      email: "",
    },
    // @ts-ignore
    resolver: zodResolver(studentForgotPasswordSchema),
  });

  function handleLoginLink() {
    setToNotRecoverPassword();

    setTimeout(() => {
      setToLogin();
    }, 350);
  }

  function handleMessage() {
    setToNotRecoverPassword();

    setTimeout(() => {
      setToRecoverPasswordMessage();
    }, 350);
  }

  async function onSubmit(data: z.infer<typeof studentForgotPasswordSchema>) {
    setIsSubmitting(true);

    await axios
      .post("/api/forgot-password", {
        email: data.email,
      })
      .then(() => {
        handleMessage();
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <motion.div
            variants={studentFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 grid-rows-1 gap-4 mb-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={studentForgotPasswordInfo.email}
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className={cn(
                        "input",
                        form.formState.errors.email && "input-error",
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
            variants={studentFormAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {studentForgotPasswordInfo.nextButton}
            </Button>
          </motion.div>
        </form>
      </Form>

      <div className="w-full h-[1px] bg-[#EBEFF1]" />

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-[#2C383F]">
          {studentForgotPasswordInfo.rememberedPasswordText}{" "}
          <span
            onClick={handleLoginLink}
            className="text-green-primary cursor-pointer"
          >
            {studentForgotPasswordInfo.rememberedPasswordLink}
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentForgotPasswordForm;
