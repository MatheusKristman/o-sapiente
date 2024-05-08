"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Request } from "@prisma/client";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormAnimation } from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { supportModalSchema } from "@/constants/schemas/supportModalSchema";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";
import { currentLessonModalInfo } from "@/constants/dashboard/resume-br";
import useCurrentLessonModalStore from "@/stores/useCurrentLessonModalStore";
import useResumeStore from "@/stores/useResumeStore";

export function ResumeCurrentLessonSupportForm() {
  const [isSending, setIsSending] = useState<boolean>(false);

  const { setBtns, lesson, closeModal } = useCurrentLessonModalStore();
  const { setRequests, setCurrentLesson } = useResumeStore();

  const form = useForm<z.infer<typeof supportModalSchema>>({
    defaultValues: {
      subject: "",
      message: "",
    },
    // @ts-ignore
    resolver: zodResolver(supportModalSchema),
  });

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setBtns();
    }, 350);
  }

  function onSubmit(values: z.infer<typeof supportModalSchema>) {
    if (lesson) {
      setIsSending(true);

      axios
        .post(`/api/support/${lesson.id}`, values)
        .then((res) => {
          toast.success(res.data.message);
          setRequests(
            res.data.requests.filter(
              (request: Request) => !request.isConcluded,
            ),
          );
          setCurrentLesson(
            res.data.requests.filter(
              (request: Request) =>
                request.isOfferAccepted && !request.isConcluded,
            ),
          );
          handleClose();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSending(false);
        });
    } else {
      toast.error("Ocorreu um erro, tente novamente mais tarde!");
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <h5 className="w-full text-left text-lg sm:text-xl font-semibold text-gray-primary mb-4">
        {currentLessonModalInfo.supportTitle}
      </h5>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSending}
                      className={cn(
                        "input",
                        form.formState.errors.subject && "input-error",
                      )}
                      placeholder={currentLessonModalInfo.subjectPlaceholder}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSending}
                      className={cn(
                        "textarea !h-[150px] mb-9",
                        form.formState.errors.message && "input-error",
                      )}
                      placeholder={currentLessonModalInfo.messagePlaceholder}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <Button
              disabled={isSending}
              type="submit"
              className="flex items-center gap-2"
            >
              {isSending && <Loader2 className="animate-spin" />}
              {currentLessonModalInfo.sendBtn}
            </Button>

            <Button
              disabled={isSending}
              variant="outline"
              type="button"
              onClick={setBtns}
              className="flex items-center gap-2"
            >
              {isSending && <Loader2 className="animate-spin" />}
              {currentLessonModalInfo.backBtn}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
