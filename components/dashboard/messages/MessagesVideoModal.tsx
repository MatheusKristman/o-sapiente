"use client";

import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactPlayer from "react-player/youtube";

import { videoModalInfo } from "@/constants/dashboard/message-br";
import {
  messageVideoModalAnimation,
  messageVideoOverlayAnimation,
} from "@/constants/framer-animations/message-video-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useConversationStore from "@/stores/useConversationStore";
import { XCircle } from "lucide-react";
import { cn } from "@/libs/utils";

const formSchema = z.object({
  videoUrl: z
    .string()
    .url({ message: "Link inválido, verifique e tente novamente" }),
});

const MessagesVideoModal = () => {
  const { isVideoModalOpen, closeVideoModal } = useConversationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    //@ts-ignore ocorrendo erro que não é pra acontecer
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
    },
  });
  const videoUrl = form.watch("videoUrl");

  const [validVideoUrl, setValidVideoUrl] = useState<string>("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setValidVideoUrl(values.videoUrl);
  }

  function clearUrl() {
    setValidVideoUrl("");
    form.reset();
  }

  return (
    <>
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={messageVideoOverlayAnimation}
            className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
          >
            <motion.div
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={messageVideoModalAnimation}
              className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle"
            >
              <div className="w-full flex items-center justify-end mb-4">
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  className="text-green-primary"
                  onClick={closeVideoModal}
                >
                  <BsXLg size={26} />
                </Button>
              </div>

              <div className="w-full flex flex-col items-start">
                <h4 className="text-2xl text-gray-primary font-semibold mb-6 lg:text-3xl">
                  {videoModalInfo.title}
                </h4>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              className={cn("w-full input", {
                                "!pr-10": !!validVideoUrl,
                              })}
                              placeholder="Insira o link do video"
                            />
                          </FormControl>

                          {!!validVideoUrl ? (
                            <Button
                              variant="link"
                              size="icon"
                              onClick={clearUrl}
                              className={cn(
                                "!mt-0 absolute top-1/2 -translate-y-1/2 right-2 w-6 h-6 flex items-center justify-center",
                              )}
                            >
                              <XCircle className="text-gray-primary" />
                            </Button>
                          ) : null}

                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    {!!validVideoUrl && (
                      <div className="w-full aspect-video relative">
                        <ReactPlayer
                          url={validVideoUrl}
                          width="100%"
                          height="100%"
                          volume={0.5}
                          controls
                        />
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={!videoUrl}
                      className="w-full"
                    >
                      {validVideoUrl
                        ? videoModalInfo.sendBtn
                        : videoModalInfo.uploadVideoBtn}
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
};

export default MessagesVideoModal;
