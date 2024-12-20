"use client";

import Image from "next/image";
import Link from "next/link";
import { CopyIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { info } from "@/constants/after-payment/paymentPix-br";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUserStore from "@/stores/useUserStore";

interface Props {
  qrCodeUrl: string | null | undefined;
  pixCode: string | null | undefined;
  expiresAt: Date | null | undefined;
  userType: string | null | undefined;
}

export function PaymentPix({ qrCodeUrl, pixCode, expiresAt, userType }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  const { userId } = useUserStore();

  function copyCode() {
    if (pixCode) {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(pixCode);
      } else {
        document.execCommand("copy", true, pixCode);
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

        <div className="flex flex-col items-center gap-4">
          <div className="w-[300px] h-[300px] relative bg-[#C8D6DF] rounded-xl overflow-hidden flex items-center justify-center">
            {qrCodeUrl !== null || qrCodeUrl !== undefined ? (
              <Image
                alt="QRCode Pix"
                src={qrCodeUrl ?? ""}
                fill
                className="object-contain object-center"
              />
            ) : (
              <Loader2 color="#2C383F" className="w-20 h-20 animate-spin" />
            )}
          </div>

          {pixCode ? (
            <div className="relative w-full max-w-lg">
              <Input
                value={pixCode}
                disabled
                name="generateLink"
                className="input-dark-gray !pr-16 disabled:!text-gray-primary disabled:!opacity-100 disabled:!cursor-default"
              />

              <TooltipProvider>
                <Tooltip open={copied}>
                  <TooltipTrigger
                    asChild
                    className="absolute top-1/2 -translate-y-1/2 right-0"
                  >
                    <Button
                      disabled={!pixCode}
                      onClick={copyCode}
                      className="flex items-center gap-2 rounded-tl-none rounded-bl-none"
                    >
                      <CopyIcon
                        className="text-gray-primary"
                        color="#FFF"
                        strokeWidth={1.5}
                      />
                      Copiar
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent className="border-0 bg-green-primary text-white">
                    <p>Código do pix copiado!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : null}
        </div>

        <div className="w-full flex items-center justify-center gap-6 flex-col sm:flex-row">
          <Button asChild>
            <Link
              href={
                userType === "Professor"
                  ? `${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`
                  : `${menuItems[0].studentHref}${userId}${menuItems[0].pageHref}`
              }
              className="text-center w-full sm:w-fit"
            >
              {info.backBtn}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
