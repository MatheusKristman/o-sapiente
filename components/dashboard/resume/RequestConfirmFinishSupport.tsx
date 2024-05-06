"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import useSupportModalStore from "@/stores/useSupportModalStore";
import { Button } from "@/components/ui/button";
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
import useConfirmFinishModalStore from "@/stores/useConfirmFinishModalStore";
import { FormAnimation } from "@/constants/framer-animations/modal";

export function RequestConfirmFinishSupport() {
  const [isSending, setIsSending] = useState<boolean>(false);

  const { requestSelected, closeModal, setForm } = useConfirmFinishModalStore();

  const form = useForm<z.infer<typeof supportModalSchema>>({
    // @ts-ignore
    resolver: zodResolver(supportModalSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setForm();
    }, 350);
  }

  function onSubmit(values: z.infer<typeof supportModalSchema>) {
    if (requestSelected) {
      setIsSending(true);

      axios
        .post(`/api/support/${requestSelected.id}`, values)
        .then((res) => {
          toast.success(res.data.message);

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
    >
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
                        form.formState.errors.subject && "input-error"
                      )}
                      placeholder={supportModalInfo.subjectPlaceholder}
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
                        form.formState.errors.message && "input-error"
                      )}
                      placeholder={supportModalInfo.messagePlaceholder}
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
              {supportModalInfo.sendBtn}
            </Button>

            <Button
              disabled={isSending}
              variant="outline"
              type="button"
              onClick={setForm}
              className="flex items-center gap-2"
            >
              {supportModalInfo.backBtn}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
