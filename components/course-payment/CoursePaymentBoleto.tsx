import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDownToLineIcon, CopyIcon, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Props {
  pdf: string | null | undefined;
  boletoCode: string | null | undefined;
  userType: string | null | undefined;
}

export function CoursePaymentBoleto({ pdf, boletoCode, userType }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

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

  return (
    <div className="w-full px-6 h-full my-12 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full flex flex-col items-center gap-9">
        <div className="w-full flex flex-col items-center gap-6">
          <Image
            src="/assets/icons/confirm-payment.gif"
            alt="Pagamento por Boleto"
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
            pagamento junto com as instruções do acesso ao curso.
          </p>
        </div>

        {boletoCode ? (
          <div className="w-full flex flex-col items-center justify-center gap-4 max-w-lg sm:flex-row">
            <div className="relative w-full">
              <Input
                value={boletoCode}
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

            {pdf ? (
              <Button
                className="w-full sm:w-fit flex items-center gap-1"
                asChild
              >
                <a href={pdf} target="_blank" rel="noreferrer noopener">
                  Baixar PDF
                  <ArrowDownToLineIcon />
                </a>
              </Button>
            ) : (
              <Button className="w-full sm:w-fit flex items-center gap-2">
                Carregando pdf
                <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
              </Button>
            )}
          </div>
        ) : null}

        <div className="w-full h-px bg-[#C8D6DF] max-w-prose" />

        <div className="w-full flex flex-col items-center gap-6">
          <p className="text-base text-center text-gray-primary max-w-md">
            Aproveite e inscreva-se agora para receber aulas incríveis com
            nossos professores!
          </p>

          <div className="w-full flex flex-col-reverse items-center justify-center gap-4 sm:flex-row">
            <Button variant="outline" asChild>
              <Link href="/" className="text-center w-full sm:w-fit">
                Voltar para início
              </Link>
            </Button>

            <Button asChild>
              <Link href="/" className="w-full sm:w-fit">
                Cadastre-se agora
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
