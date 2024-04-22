"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";

import { cn } from "@/libs/utils";
import professorRegisterSchema from "@/constants/schemas/professorRegisterSchema";
import { professorRegisterFormInfo } from "@/constants/register/professor-register-br";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const RegisterForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { openModal } = useProfessorModalStore();

    const router = useRouter();

    const form = useForm<z.infer<typeof professorRegisterSchema>>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            tel: "",
            password: "",
            passwordConfirm: "",
        },
        // @ts-ignore
        resolver: zodResolver(professorRegisterSchema),
    });

    function handleTelFormat(event: React.ChangeEvent<HTMLInputElement>) {
        let tel = event.target.value.replace(/\D/g, "");

        if (tel.length < 10) {
            tel = tel.replace(/(\d{2})(\d)/, "($1) $2");
        } else if (tel.length === 10) {
            tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        } else if (tel.length === 11) {
            tel = tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else {
            return;
        }

        form.setValue("tel", tel);
    }

    function handleOpenLoginModal() {
        openModal();
    }

    function onSubmit(values: z.infer<typeof professorRegisterSchema>) {
        setIsSubmitting(true);

        axios
            .post("/api/user/pre-register", {
                ...values,
                accountType: "Professor",
            })
            .then((res) =>
                router.replace(
                    `/cadastro/professor/finalizacao/${res.data.id}`,
                ),
            )
            .catch((error) => {
                console.error(error.response);

                toast.error(error.response.data);
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <section className="pt-12 pb-12 w-full bg-registerLeftShape bg-no-repeat bg-[length:100%_100%] bg-left-top md:bg-[length:50%_auto] md:bg-left lg:bg-contain lg:pb-24">
            <div className="w-full px-6 mx-auto flex flex-col gap-6 md:px-16 md:gap-12 lg:container lg:mx-auto lg:flex-row lg:justify-between">
                <div className="w-full flex flex-col justify-center gap-4 lg:justify-start lg:pt-24 lg:max-w-xl">
                    <h1 className="text-3xl text-center font-semibold text-gray-primary md:text-4xl lg:text-left">
                        {professorRegisterFormInfo.title}
                    </h1>

                    <p className="text-lg text-center text-gray-primary lg:text-left">
                        {professorRegisterFormInfo.desc}
                    </p>
                </div>

                <div className="bg-white shadow-lg shadow-[rgba(0,0,0,0.25)] rounded-2xl px-6 py-9 max-w-xl mx-auto lg:mx-0">
                    <h3 className="text-xl font-semibold text-gray-primary mb-6 lg:text-2xl">
                        {professorRegisterFormInfo.formTitle}
                    </h3>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-6 mb-6"
                        >
                            <div className="w-full flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className={cn(
                                                        "input",
                                                        form.formState.errors
                                                            .firstName &&
                                                        "input-error",
                                                    )}
                                                    placeholder={
                                                        professorRegisterFormInfo.name
                                                    }
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl></FormControl>

                                            <Input
                                                type="text"
                                                className={cn(
                                                    "input",
                                                    form.formState.errors
                                                        .lastName &&
                                                    "input-error",
                                                )}
                                                placeholder={
                                                    professorRegisterFormInfo.lastName
                                                }
                                                disabled={isSubmitting}
                                                {...field}
                                            />

                                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className={cn(
                                                        "input",
                                                        form.formState.errors
                                                            .email &&
                                                        "input-error",
                                                    )}
                                                    placeholder={
                                                        professorRegisterFormInfo.email
                                                    }
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    onChange={handleTelFormat}
                                                    className={cn(
                                                        "input",
                                                        form.formState.errors
                                                            .tel &&
                                                        "input-error",
                                                    )}
                                                    placeholder={
                                                        professorRegisterFormInfo.tel
                                                    }
                                                    disabled={isSubmitting}
                                                    maxLength={15}
                                                    value={field.value}
                                                    name={field.name}
                                                    ref={field.ref}
                                                    onBlur={field.onBlur}
                                                />
                                            </FormControl>

                                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className={cn(
                                                        "input",
                                                        form.formState.errors
                                                            .password &&
                                                        "input-error",
                                                    )}
                                                    placeholder={
                                                        professorRegisterFormInfo.password
                                                    }
                                                    disabled={isSubmitting}
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="passwordConfirm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className={cn(
                                                        "input",
                                                        form.formState.errors
                                                            .passwordConfirm &&
                                                        "input-error",
                                                    )}
                                                    placeholder={
                                                        professorRegisterFormInfo.confirmPassword
                                                    }
                                                    disabled={isSubmitting}
                                                    autoComplete="off"
                                                    autoCorrect="off"
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
                                className="w-full flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        {professorRegisterFormInfo.registerBtn}{" "}
                                        <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                                    </>
                                ) : (
                                    professorRegisterFormInfo.registerBtn
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="w-full border-t border-[#EBEFF1] pt-6 flex flex-col gap-4">
                        <span className="w-full text-base text-gray-primary font-semibold text-center">
                            {professorRegisterFormInfo.alreadyHasAccount.desc +
                                " "}
                            <Button
                                variant="link"
                                size="sm"
                                type="button"
                                onClick={handleOpenLoginModal}
                                className="text-green-primary px-0 cursor-pointer lg:hover:underline"
                            >
                                {
                                    professorRegisterFormInfo.alreadyHasAccount
                                        .link
                                }
                            </Button>
                        </span>

                        <span className="text-sm text-gray-primary/60 font-medium text-center">
                            {professorRegisterFormInfo.privacy.text + " "}
                            <Link
                                className="underline text-gray-primary/80"
                                href={
                                    professorRegisterFormInfo.privacy.link.href
                                }
                            >
                                {professorRegisterFormInfo.privacy.link.text}
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
