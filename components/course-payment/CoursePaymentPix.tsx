import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useUserStore from "@/stores/useUserStore";
import { CopyIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface Props {
  qrCodeUrl: string | null | undefined;
  pixCode: string | null | undefined;
  expiresAt: Date | null | undefined;
  userType: string | null | undefined;
}

export function CoursePaymentPix({
  qrCodeUrl,
  pixCode,
  expiresAt,
  userType,
}: Props) {
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
      <div className="w-full flex flex-col items-center gap-9">
        <div className="w-full flex flex-col items-center gap-6">
          <Image
            src="/assets/icons/confirm-payment.gif"
            alt="Aguardando Pagamento"
            width={150}
            height={150}
            className="object-center object-contain"
          />

          <h1 className="text-2xl font-semibold text-gray-primary text-center sm:text-3xl">
            Aguardando{" "}
            <strong className="text-green-primary font-semibold">
              pagamento
            </strong>
          </h1>

          <p className="text-base text-gray-primary text-center font-medium max-w-prose sm:text-lg">
            Após realizar o pagamento, você receberá um e-mail de confirmação do
            pagamento.
          </p>
        </div>

        <div className="w-full h-px bg-[#C8D6DF] max-w-prose" />

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
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                  >
                    <Button
                      disabled={!pixCode}
                      variant="link"
                      size="icon"
                      onClick={copyCode}
                    >
                      <CopyIcon className="text-gray-primary" />
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

        <div className="w-full flex items-center justify-center gap-6 flex-col sm:flex-row"></div>

        <div className="w-full h-px bg-[#C8D6DF] max-w-prose" />

        <div className="w-full flex flex-col items-center gap-6">
          <p className="text-base text-center text-gray-primary max-w-md">
            Aproveite e inscreva-se agora para receber aulas incríveis com
            nossos professores!
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/">Voltar para início</Link>
            </Button>

            {/* TODO: adicionar link para cadastro do aluno */}
            <Button asChild>
              <Link href="/">Cadastre-se agora</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
