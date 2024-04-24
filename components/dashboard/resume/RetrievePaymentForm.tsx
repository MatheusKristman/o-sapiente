"use client";

import { Pencil } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { retrievePaymentModalInfo } from "@/constants/dashboard/resume-br";
import { newRequestFormAnimation } from "@/constants/framer-animations/new-request-modal";
import useRetrievePaymentModalStore from "@/stores/useRetrievePaymentModalStore";

export function RetrievePaymentForm() {
    const { setIsForm, setIsMessage, pixCode } = useRetrievePaymentModalStore();

    function handleRequest() {
        // TODO: criar rota de api para salvar o pixCode e mandar o email para o suporte informado a retirada do valor

        setIsForm(false);

        setTimeout(() => {
            setIsMessage(true);
        }, 350);
    }
    return (
        <>
            <motion.div
                variants={newRequestFormAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex flex-col gap-1 mb-4"
            >
                <h1 className="text-2xl sm:text-3xl text-gray-primary font-semibold text-left">
                    {retrievePaymentModalInfo.title}
                </h1>

                <p className="text-base text-gray-primary font-normal text-left">
                    {retrievePaymentModalInfo.desc}
                </p>
            </motion.div>

            <motion.div
                variants={newRequestFormAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex flex-col gap-6"
            >
                <div className="w-full flex items-center justify-center">
                    {pixCode ? (
                        <div className="w-full flex items-center justify-between gap-4">
                            <span className="text-green-primary text-lg font-medium">
                                *****{pixCode.substring(5, pixCode.length - 1)}
                            </span>

                            <Button variant="link" size="icon">
                                <Pencil className="text-green-primary" />
                            </Button>
                        </div>
                    ) : (
                        <p className="text-lg font-semibold text-gray-primary/40 text-center">
                            {retrievePaymentModalInfo.noPixKey}
                        </p>
                    )}
                </div>

                <div className="w-full flex flex-col gap-4">
                    <Input
                        className="input"
                        placeholder={retrievePaymentModalInfo.inputPlaceholder}
                    />

                    <Button onClick={handleRequest}>
                        {retrievePaymentModalInfo.btn}
                    </Button>
                </div>
            </motion.div>
        </>
    );
}
