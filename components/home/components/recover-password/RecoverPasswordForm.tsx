import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import { FormAnimation } from "@/constants/framer-animations/modal";
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
import { recoverPasswordSchema } from "@/constants/schemas/recoverPasswordSchema";
import { recoverPasswordModalInfo } from "@/constants/recoverPasswordModal-br";
import useRecoverPasswordModalStore from "@/stores/useRecoverPasswordModalStore";
import { Loader2 } from "lucide-react";

function RecoverPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { unsetForm, setMessage, idUser } = useRecoverPasswordModalStore();

  const form = useForm<z.infer<typeof recoverPasswordSchema>>({
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    //@ts-ignore
    resolver: zodResolver(recoverPasswordSchema),
  });

  function onSubmit(values: z.infer<typeof recoverPasswordSchema>) {
    setIsSubmitting(true);

    axios
      .post("/api/forgot-password/recover", { ...values, id: idUser })
      .then(() => {
        unsetForm();

        setTimeout(() => {
          setMessage();
        }, 350);
      })
      .catch((error) => {
        console.error(error);

        toast.error("Ocorreu um erro ao recuperar a senha");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={recoverPasswordModalInfo.newPassword}
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className={cn(
                        "input",
                        form.formState.errors.newPassword && "input-error",
                      )}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPasswordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={recoverPasswordModalInfo.newPasswordConfirm}
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className={cn(
                        "input",
                        form.formState.errors.newPassword && "input-error",
                      )}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            {recoverPasswordModalInfo.sendBtn}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

export default RecoverPasswordForm;
