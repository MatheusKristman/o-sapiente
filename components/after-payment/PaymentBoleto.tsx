"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownToLineIcon, CopyIcon, Loader2 } from "lucide-react";

import { info } from "@/constants/after-payment/paymentBoleto-br";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import useUserStore from "@/stores/useUserStore";

interface Props {
    pdf: string | null;
    boletoCode: string | null;
}

export function PaymentBoleto({ pdf, boletoCode }: Props) {
    const [copied, setCopied] = useState<boolean>(false);

    const { userId } = useUserStore();

    function copyCode() {
        if (boletoCode) {
            if ("clipboard" in navigator) {
                navigator.clipboard.writeText(boletoCode);
            } else {
                document.execCommand("copy", true, boletoCode);
            }
        }

        setCopied(true);
    }

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        }
    }, [copied]);

    return (
        <div className="w-full px-6 h-full mt-12 mb-24 sm:px-16 lg:container lg:mx-auto">
            <div className="w-full my-auto flex flex-col items-center gap-6">
                <div className="w-full flex flex-col gap-4 items-center justify-center">
                    <Image
                        src="/assets/icons/confirm-payment.gif"
                        alt={info.altImg}
                        width={150}
                        height={150}
                        className="object-center object-contain"
                    />
                </div>

                <div className="w-full flex flex-col gap-4 items-center justify-center lg:max-w-3xl">
                    <h1 className="text-2xl font-semibold text-gray-primary text-center sm:text-3xl">
                        <strong className="font-semibold text-green-primary">
                            {info.titleGreen}
                        </strong>{" "}
                        {info.titleGray}
                    </h1>

                    <p className="text-base text-gray-primary text-center sm:text-lg">
                        {info.desc}
                    </p>
                </div>

                {boletoCode ? (
                    <div className="relative w-full max-w-lg">
                        <Input
                            value={boletoCode}
                            disabled
                            name="generateLink"
                            className="input-dark-gray !pr-16 disabled:!text-gray-primary disabled:!opacity-100 disabled:!cursor-default"
                        />

                        <TooltipProvider>
                            <Tooltip open={copied}>
                                <TooltipTrigger className="absolute top-1/2 -translate-y-1/2 right-2">
                                    <Button
                                        disabled={!boletoCode}
                                        variant="link"
                                        size="icon"
                                        onClick={copyCode}
                                    >
                                        <CopyIcon className="text-gray-primary" />
                                    </Button>
                                </TooltipTrigger>

                                <TooltipContent className="border-0 bg-green-primary text-white">
                                    <p>Código do boleto copiado!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ) : null}

                <div className="w-full flex items-center justify-center gap-6 flex-col sm:flex-row">
                    <Button asChild>
                        <Link
                            href={`${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`}
                            className="text-center w-full sm:w-fit"
                        >
                            {info.backBtn}
                        </Link>
                    </Button>

                    {pdf ? (
                        <Button
                            variant="outline"
                            className="w-full sm:w-fit flex items-center gap-1"
                            asChild
                        >
                            <a
                                href={pdf}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {info.downloadBtn}
                                <ArrowDownToLineIcon />
                            </a>
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full sm:w-fit flex items-center gap-1"
                            asChild
                        >
                            Carregando pdf
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
