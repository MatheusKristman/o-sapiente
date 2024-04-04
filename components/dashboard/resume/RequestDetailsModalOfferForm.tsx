"use client";

import { motion } from "framer-motion";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Offer } from "@prisma/client";
import { toast } from "react-hot-toast";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { requestDetailsOfferFormInfo } from "@/constants/requestDetails-br";
import { requestDetailsFormAnimation } from "@/constants/framer-animations/request-details-modal";
import { offerSchema } from "@/constants/schemas/requestDetailsOfferFormSchema";
import { cn } from "@/libs/utils";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RequestDetailsModalOfferFormProps {
  setOffers?: Dispatch<SetStateAction<Offer[]>>;
  handleCloseButton: () => void;
}

const RequestDetailsModalOfferForm = ({
  setOffers,
  handleCloseButton,
}: RequestDetailsModalOfferFormProps) => {
  const { requestId } = useRequestDetailsModalStore();

  const [isSending, setIsSending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof offerSchema>>({
    // @ts-ignore
    resolver: zodResolver(offerSchema),
    defaultValues: {
      lessonDate: undefined,
      lessonPrice: 1000,
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof offerSchema>) {
    if (setOffers) {
      setIsSending(true);

      //   axios
      //     .post("/api/offer/create", { message: values.message, requestId })
      //     .then((res) => {
      //       setOffers((prev: Offer[]) => [...prev, res.data]);

      //       handleCloseButton();
      //     })
      //     .catch((error) => {
      //       console.log(error);

      //       toast.error(error.response.data);
      //     })
      //     .finally(() => setIsSending(false));
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={requestDetailsFormAnimation}
      className="w-full flex flex-col"
    >
      <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
        {requestDetailsOfferFormInfo.title}
      </h3>

      <Tabs defaultValue="inside" className="w-full">
        <TabsList>
          <TabsTrigger value="inside">
            {requestDetailsOfferFormInfo.insideTabBtn}
          </TabsTrigger>

          <TabsTrigger value="outside">
            {requestDetailsOfferFormInfo.outsideTabBtn}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inside">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-9"
            >
              <div className="w-full flex flex-col gap-y-6">
                <div className="w-full flex items-center justify-between gap-x-5">
                  <FormField
                    control={form.control}
                    name="lessonDate"
                    render={({ field }) => (
                      <FormItem className="w-1/2 flex flex-col">
                        <FormLabel className="text-left">
                          {requestDetailsOfferFormInfo.lessonDateLabel}
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="datePicker"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", {
                                    locale: ptBR,
                                  })
                                ) : (
                                  <span>
                                    {
                                      requestDetailsOfferFormInfo.lessonDatePlaceholder
                                    }
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              className="z-[99999]"
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lessonPrice"
                    render={({ field }) => (
                      <FormItem className="w-1/2 flex flex-col">
                        <FormLabel className="text-left">
                          {requestDetailsOfferFormInfo.lessonPriceLabel}
                        </FormLabel>

                        <FormControl>
                          {/* TODO: adicionar input de currency instalado, -> react-currency-input-field <- */}
                          <Input
                            placeholder={
                              requestDetailsOfferFormInfo.lessonPricePlaceholder
                            }
                            className="input"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="text-left">
                        {requestDetailsOfferFormInfo.detailsLabel}
                      </FormLabel>

                      <FormControl>
                        <textarea
                          disabled={isSending}
                          placeholder={
                            requestDetailsOfferFormInfo.detailsPlaceholder
                          }
                          className={cn("input", "!h-64 resize-none", {
                            "mb-2": form.formState.errors?.details,
                          })}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full"
                disabled={isSending}
                type="submit"
                onClick={() => {}}
              >
                {requestDetailsOfferFormInfo.btn}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="inside"></TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RequestDetailsModalOfferForm;
