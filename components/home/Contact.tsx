"use client";

import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { contactInfo, contactFormInfo } from "@/constants/contact-br";
import {
    contactRightSideAnimation,
    contactRightSideMobileAnimation,
    contactLeftSideAnimation,
    contactLeftSideMobileAnimation,
} from "@/constants/framer-animations/contacts";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z
        .string()
        .min(1, { message: "E-mail é obrigatório" })
        .email({ message: "E-mail inválido" }),
    message: z
        .string()
        .min(20, { message: "Mensagem precisa ter pelo menos 20 caracteres" }),
});

const Contact = () => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
        // @ts-ignore
        resolver: zodResolver(formSchema),
    });
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSending(true);
        axios
            .post("/api/contact", values)
            .then((res) => {
                toast.success(res.data.message);
                form.reset({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Ocorreu um erro ao enviar a mensagem");
            })
            .finally(() => setIsSending(false));
    }

    return (
        <AnimatePresence>
            <section
                id="contato"
                className="w-full bg-green-primary mt-12 relative lg:before:content-[''] lg:before:bg-paperAirplane lg:before:bg-contain lg:before:bg-no-repeat lg:before:block lg:before:w-1/2 lg:before:h-64 lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:after:content-[''] lg:after:bg-contactDesktop lg:after:bg-[length:100%_100%] lg:after:bg-no-repeat lg:after:bg-right lg:after:w-[60%] lg:after:h-full lg:after:block lg:after:absolute lg:after:top-0 lg:after:right-0 lg:after:z-[9]"
            >
                <div className="flex flex-col w-full mx-auto lg:container lg:flex-row">
                    <motion.div
                        transition={{ staggerChildren: 0.4 }}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        className="pb-24 px-6 pt-9 relative after:content-[''] after:w-full after:h-28 after:bg-paperAirplane after:bg-no-repeat after:bg-contain after:absolute after:bottom-0 after:-left-8 sm:after:h-64 md:px-16 lg:w-[50%] lg:pt-12 lg:after:bg-none"
                    >
                        <motion.h4
                            variants={
                                isMobile
                                    ? contactRightSideMobileAnimation
                                    : contactRightSideAnimation
                            }
                            className="text-2xl font-semibold text-[#393F42] mb-6 sm:text-3xl sm:max-w-md sm:mb-9"
                        >
                            {contactInfo.title}
                        </motion.h4>

                        <motion.p
                            variants={
                                isMobile
                                    ? contactRightSideMobileAnimation
                                    : contactRightSideAnimation
                            }
                            className="text-base leading-[29px] text-[#37474F] sm:text-lg sm:leading-[40px] lg:max-w-md"
                        >
                            {contactInfo.desc}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        transition={{ staggerChildren: 0.4 }}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        className="bg-contactMobile bg-no-repeat bg-[length:100%_100%] relative z-[99] px-6 pb-9 pt-20 -mt-12 sm:pt-28 sm:-mt-28 md:bg-contactTablet md:px-16 md:pt-36 lg:w-[50%] lg:bg-none lg:mt-0 lg:py-12"
                    >
                        <motion.h4
                            variants={
                                isMobile
                                    ? contactLeftSideMobileAnimation
                                    : contactLeftSideAnimation
                            }
                            className="text-2xl text-white font-semibold mb-6 sm:text-3xl"
                        >
                            {contactFormInfo.title}
                        </motion.h4>

                        <Form {...form}>
                            <motion.form
                                transition={{ staggerChildren: 0.2 }}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.2 }}
                                className="flex flex-col items-center justify-center"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full mb-4">
                                            <motion.div
                                                className="w-full flex flex-col gap-1"
                                                variants={
                                                    isMobile
                                                        ? contactLeftSideMobileAnimation
                                                        : contactLeftSideAnimation
                                                }
                                            >
                                                <FormLabel className="text-[18px] text-white font-medium">
                                                    {contactFormInfo.name}
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        disabled={isSending}
                                                        className="input-contact"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </motion.div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full mb-4">
                                            <motion.div
                                                className="w-full flex flex-col gap-1"
                                                variants={
                                                    isMobile
                                                        ? contactLeftSideMobileAnimation
                                                        : contactLeftSideAnimation
                                                }
                                            >
                                                <FormLabel className="text-[18px] text-white font-medium">
                                                    {contactFormInfo.email}
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        disabled={isSending}
                                                        className="input-contact"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </motion.div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="w-full mb-12">
                                            <motion.div
                                                className="w-full flex flex-col gap-1"
                                                variants={
                                                    isMobile
                                                        ? contactLeftSideMobileAnimation
                                                        : contactLeftSideAnimation
                                                }
                                            >
                                                <FormLabel className="text-[18px] text-white font-medium">
                                                    {contactFormInfo.message}
                                                </FormLabel>

                                                <FormControl>
                                                    <Textarea
                                                        disabled={isSending}
                                                        className="textarea-contact"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </motion.div>
                                        </FormItem>
                                    )}
                                />

                                <motion.div
                                    className="w-full"
                                    variants={
                                        isMobile
                                            ? contactLeftSideMobileAnimation
                                            : contactLeftSideAnimation
                                    }
                                >
                                    <Button
                                        disabled={isSending}
                                        type="submit"
                                        className="w-full flex items-center gap-2"
                                    >
                                        {isSending && (
                                            <Loader2 className="animate-spin" />
                                        )}
                                        {contactFormInfo.submitBtn}
                                    </Button>
                                </motion.div>
                            </motion.form>
                        </Form>
                    </motion.div>
                </div>
            </section>
        </AnimatePresence>
    );
};

export default Contact;
