"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, CopyIcon } from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";
import CurrencyInput from "react-currency-input-field";
import Image from "next/image";

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useResumeStore from "@/stores/useResumeStore";

interface RequestDetailsModalOfferFormProps {
    handleCloseButton: () => void;
}

const RequestDetailsModalOfferForm = ({
    handleCloseButton,
}: RequestDetailsModalOfferFormProps) => {
    const { setOffers, offers } = useResumeStore();
    const { requestId, studentImage, studentName, studentCel } =
        useRequestDetailsModalStore();

    const [isSending, setIsSending] = useState<boolean>(false);
    const [lessonDate, setLessonDate] = useState<Date | undefined>(undefined);
    const [lessonPrice, setLessonPrice] = useState<number>(10);
    const [offerLink, setOfferLink] = useState<string>("");
    const [linkCopied, setLinkCopied] = useState<boolean>(false);
    const [whatsappLink, setWhatsappLink] = useState<string>(
        `https://wa.me/55${studentCel?.replace(/\D/g, "")}`,
    );

    const form = useForm<z.infer<typeof offerSchema>>({
        // @ts-ignore
        resolver: zodResolver(offerSchema),
        defaultValues: {
            lessonDate: undefined,
            lessonPrice: 1000,
            details: "",
        },
    });

    useEffect(() => {
        if (linkCopied) {
            setTimeout(() => {
                setLinkCopied(false);
            }, 3000);
        }
    }, [linkCopied]);

    function handleCopyLink() {
        if ("clipboard" in navigator) {
            navigator.clipboard.writeText(offerLink);
        } else {
            document.execCommand("copy", true, offerLink);
        }

        setLinkCopied(true);
    }

    function generateLink() {
        setIsSending(true);

        axios
            .post("/api/offer/create", {
                requestId,
                isLink: true,
                lessonDate,
                lessonPrice,
            })
            .then((res) => {
                setOfferLink(res.data.link);
            })
            .catch((error) => console.error(error))
            .finally(() => setIsSending(false));
    }

    function onSubmit(values: z.infer<typeof offerSchema>) {
        if (setOffers) {
            setIsSending(true);

            console.log(values);

            axios
                .post("/api/offer/create", {
                    ...values,
                    requestId,
                    isLink: false,
                })
                .then((res) => {
                    setOffers([...offers, res.data]);

                    handleCloseButton();
                })
                .catch((error) => {
                    console.log(error);

                    toast.error(error.response.data);
                })
                .finally(() => setIsSending(false));
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

            <div className="w-full flex flex-col gap-4 items-center mb-6 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full">
                        <Image
                            src={
                                studentImage
                                    ? studentImage
                                    : "/assets/images/default-user-photo.svg"
                            }
                            alt="Aluno"
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                    <h5 className="text-lg font-semibold text-gray-primary">
                        {studentName}
                    </h5>
                </div>

                {studentCel ? (
                    <a
                        href={whatsappLink}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="flex text-green-primary font-medium items-center gap-1"
                    >
                        <span className="block bg-whatsappIcon bg-contain w-9 min-w-[36px] h-9 min-h-[36px]" />
                        <span>{studentCel}</span>
                    </a>
                ) : (
                    <span className="text-sm text-gray-primary/70 text-center">
                        Aluno não tem telefone cadastrado
                    </span>
                )}
            </div>

            <Tabs defaultValue="inside" className="w-full">
                <TabsList className="w-full h-auto bg-[#EBEFF1] rounded-lg">
                    <TabsTrigger
                        value="inside"
                        className="w-1/2 whitespace-normal data-[state=active]:bg-green-primary data-[state=active]:text-white text-green-primary"
                    >
                        {requestDetailsOfferFormInfo.insideTabBtn}
                    </TabsTrigger>

                    <TabsTrigger
                        value="outside"
                        className="w-1/2 whitespace-normal data-[state=active]:bg-green-primary data-[state=active]:text-white text-green-primary"
                    >
                        {requestDetailsOfferFormInfo.outsideTabBtn}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="inside" className="!mt-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-y-9"
                        >
                            <div className="w-full flex flex-col gap-y-4">
                                <div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1 justify-between gap-5">
                                    <FormField
                                        control={form.control}
                                        name="lessonDate"
                                        render={({ field }) => (
                                            <FormItem className="w-full flex flex-col">
                                                <FormLabel className="text-left text-base text-gray-primary">
                                                    {
                                                        requestDetailsOfferFormInfo.lessonDateLabel
                                                    }
                                                </FormLabel>

                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                disabled={
                                                                    isSending
                                                                }
                                                                variant="datePicker"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value &&
                                                                        "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(
                                                                        field.value,
                                                                        "PPP",
                                                                        {
                                                                            locale: ptBR,
                                                                        },
                                                                    )
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

                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            className="z-[99999]"
                                                            mode="single"
                                                            locale={ptBR}
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                            disabled={(date) =>
                                                                date <
                                                                new Date()
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                                <FormMessage className="text-left" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lessonPrice"
                                        render={({ field }) => (
                                            <FormItem className="w-full flex flex-col">
                                                <FormLabel className="text-left text-base text-gray-primary">
                                                    {
                                                        requestDetailsOfferFormInfo.lessonPriceLabel
                                                    }
                                                </FormLabel>

                                                <FormControl>
                                                    <div className="relative">
                                                        <CurrencyInput
                                                            disabled={isSending}
                                                            id="lesson-price"
                                                            name={field.name}
                                                            placeholder={
                                                                requestDetailsOfferFormInfo.lessonPricePlaceholder
                                                            }
                                                            defaultValue={10}
                                                            decimalsLimit={2}
                                                            onValueChange={(
                                                                value,
                                                                name,
                                                            ) =>
                                                                form.setValue(
                                                                    name as "lessonPrice",
                                                                    Number(
                                                                        value,
                                                                    ),
                                                                )
                                                            }
                                                            className="input !pl-10"
                                                        />

                                                        <span className="text-gray-primary text-base font-semibold absolute top-1/2 -translate-y-1/2 left-4">
                                                            R$
                                                        </span>
                                                    </div>
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
                                            <FormLabel className="text-left text-base text-gray-primary">
                                                {
                                                    requestDetailsOfferFormInfo.detailsLabel
                                                }
                                            </FormLabel>

                                            <FormControl>
                                                <textarea
                                                    disabled={isSending}
                                                    placeholder={
                                                        requestDetailsOfferFormInfo.detailsPlaceholder
                                                    }
                                                    className={cn(
                                                        "input",
                                                        "!h-64 resize-none",
                                                        {
                                                            "mb-2": form
                                                                .formState
                                                                .errors
                                                                ?.details,
                                                        },
                                                    )}
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

                <TabsContent value="outside" className="!mt-6">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1 justify-between gap-5">
                            <div className="w-full flex flex-col gap-2">
                                <label
                                    htmlFor="lessonDate"
                                    className="text-left text-base text-gray-primary font-medium"
                                >
                                    {
                                        requestDetailsOfferFormInfo.lessonDateLabel
                                    }
                                </label>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            disabled={isSending}
                                            variant="datePicker"
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !lessonDate &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            {lessonDate ? (
                                                format(lessonDate, "PPP", {
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
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            className="z-[99999]"
                                            mode="single"
                                            locale={ptBR}
                                            selected={lessonDate}
                                            onSelect={setLessonDate}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label
                                    htmlFor="lessonPrice"
                                    className="text-left text-gray-primary text-base font-medium"
                                >
                                    {
                                        requestDetailsOfferFormInfo.lessonPriceLabel
                                    }
                                </label>

                                <div className="relative">
                                    <CurrencyInput
                                        disabled={isSending}
                                        id="lesson-price"
                                        name="lessonPrice"
                                        placeholder={
                                            requestDetailsOfferFormInfo.lessonPricePlaceholder
                                        }
                                        defaultValue={10}
                                        decimalsLimit={2}
                                        onValueChange={(value, name) =>
                                            setLessonPrice(Number(value))
                                        }
                                        className="input !pl-10"
                                    />

                                    <span className="text-gray-primary text-base font-semibold absolute top-1/2 -translate-y-1/2 left-4">
                                        R$
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="generateLink"
                                className="text-left text-gray-primary text-base font-medium"
                            >
                                {requestDetailsOfferFormInfo.detailsLabel}
                            </label>

                            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
                                <div className="relative w-full">
                                    <Input
                                        value={offerLink}
                                        disabled
                                        name="generateLink"
                                        className="input !pr-16 disabled:!text-gray-primary disabled:!opacity-100 disabled:!cursor-default"
                                        placeholder={
                                            requestDetailsOfferFormInfo.generateLinkPlaceholder
                                        }
                                    />

                                    <TooltipProvider>
                                        <Tooltip open={linkCopied}>
                                            <TooltipTrigger className="absolute top-1/2 -translate-y-1/2 right-2">
                                                <Button
                                                    disabled={
                                                        isSending ||
                                                        offerLink.length === 0
                                                    }
                                                    variant="link"
                                                    size="icon"
                                                    onClick={handleCopyLink}
                                                >
                                                    <CopyIcon className="text-gray-primary" />
                                                </Button>
                                            </TooltipTrigger>

                                            <TooltipContent className="bg-green-primary text-white">
                                                <p>Link Copiado</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <Button
                                    disabled={
                                        isSending ||
                                        !lessonDate ||
                                        lessonPrice <= 0
                                    }
                                    onClick={generateLink}
                                    type="button"
                                    className="w-full sm:w-fit"
                                >
                                    {
                                        requestDetailsOfferFormInfo.generateLinkBtn
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={handleCloseButton}
                        className="w-full mt-6"
                    >
                        {requestDetailsOfferFormInfo.closeBtn}
                    </Button>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
};

export default RequestDetailsModalOfferForm;
