import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  courseName: string | null | undefined;
}

export function CoursePaymentConfirmed({ courseName }: Props) {
  return (
    <div className="w-full px-6 h-full my-12 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full flex flex-col items-center gap-9">
        <div className="w-full flex flex-col items-center gap-6">
          <Image
            src="/assets/icons/confirm-payment.gif"
            alt="Pagamento Processando"
            width={150}
            height={150}
            className="object-center object-contain"
          />

          <h1 className="text-2xl font-semibold text-gray-primary text-center max-w-md sm:text-3xl sm:max-w-lg">
            Pagamento <strong className="font-semibold text-green-primary">confirmado</strong> com{" "}
            <strong className="font-semibold text-green-primary relative after:content-[''] after:w-4 after:h-4 after:block after:bg-highlight after:bg-contain after:bg-no-repeat after:absolute after:top-1 after:-right-3 sm:after:top-2">
              sucesso
            </strong>
          </h1>

          <p className="text-lg font-medium text-gray-primary text-center max-w-prose">
            Parabéns por adquirir o curso <strong className="font-medium text-green-primary">{courseName}!</strong>{" "}
            Estamos muito felizes em tê-lo(a) como parte da nossa comunidade de estudantes.
          </p>
        </div>

        <div className="bg-[#C8D6DF] px-4 py-3 rounded-md">
          <span className="text-[#5A727D] text-base font-medium text-center block">
            Entraremos em contato com você em breve!
          </span>
        </div>

        <div className="w-full h-px bg-[#C8D6DF] max-w-prose" />

        <div className="w-full flex flex-col items-center gap-6">
          <p className="text-base text-center text-gray-primary max-w-prose">
            Aproveite e inscreva-se agora para receber aulas incríveis com nossos professores!
          </p>

          <Button asChild>
            <Link href="/?redirected_ad=true">Cadastre-se agora</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
