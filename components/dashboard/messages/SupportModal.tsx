"use client";

import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useSupportModalStore from "@/stores/useSupportModalStore";
import {
  ModalAnimation,
  OverlayAnimation,
} from "@/constants/framer-animations/modal";
import { Button } from "@/components/ui/button";
import { BsXLg } from "react-icons/bs";
import { supportModalInfo } from "@/constants/dashboard/message-br";
import { supportModalSchema } from "@/constants/schemas/supportModalSchema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function SupportModal() {
  const [isSending, setIsSending] = useState<boolean>(false);

  const { isModalOpen, closeModal } = useSupportModalStore();

  const form = useForm<z.infer<typeof supportModalSchema>>({
    // @ts-ignore
    resolver: zodResolver(supportModalSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof supportModalSchema>) {
    setIsSending(true);

    axios
      .post("/api/support", values)
      .then((res) => {
        closeModal();
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="support-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={OverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={ModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle"
            >
              <div className="w-full flex items-center justify-end mb-4">
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  className="text-green-primary"
                  onClick={closeModal}
                >
                  <BsXLg size={26} />
                </Button>
              </div>

              <div className="w-full flex flex-col">
                <h4 className="text-2xl max-w-sm text-gray-primary text-left font-semibold mb-6 lg:text-3xl">
                  {supportModalInfo.title}
                </h4>

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
                                  form.formState.errors.subject &&
                                    "input-error",
                                )}
                                placeholder={
                                  supportModalInfo.subjectPlaceholder
                                }
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
                                  form.formState.errors.message &&
                                    "input-error",
                                )}
                                placeholder={
                                  supportModalInfo.messagePlaceholder
                                }
                                {...field}
                              />
                            </FormControl>

                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      disabled={isSending}
                      type="submit"
                      className="flex items-center gap-2"
                    >
                      {isSending && <Loader2 className="animate-spin" />}
                      {supportModalInfo.sendBtn}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
