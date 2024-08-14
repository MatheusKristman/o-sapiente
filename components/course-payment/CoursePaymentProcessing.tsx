import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";

export function CoursePaymentProcessing() {
  const { userId } = useUserStore();

  return (
    <div className="w-full px-6 h-full my-12 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full my-auto flex flex-col items-center gap-9">
        <div className="w-full flex flex-col gap-6 items-center justify-center">
          <Image
            src="/assets/icons/processing.gif"
            alt="Pagamento Processando"
            width={150}
            height={150}
            className="object-center object-contain"
          />

          <h1 className="text-2xl font-semibold text-gray-primary text-center !leading-tight sm:text-3xl">
            <strong className="font-semibold text-green-primary">Processando</strong> Pagamento
          </h1>

          <p className="text-base font-medium text-gray-primary text-center sm:text-lg sm:max-w-prose">
            Estamos verificando os detalhes do seu pagamento. Este processo pode levar{" "}
            <strong className="font-medium text-green-primary">alguns minutos</strong>.
          </p>
        </div>

        <div className="w-fit bg-[#C8D6DF] rounded-lg px-4 py-3 max-w-prose">
          <span className="text-base font-medium text-[#5A727D] block text-center">
            Você receberá um e-mail de confirmação assim que o pagamento for aprovado, junto com todas as instruções
            necessárias para acessar o curso
          </span>
        </div>

        <p className="text-base text-gray-primary text-center sm:text-lg sm:max-w-prose">
          Agradecemos pela sua paciência e estamos ansiosos para ajudá-lo a começar sua jornada de aprendizado!
        </p>

        <div className="w-full h-px bg-[#C8D6DF]" />

        <div className="w-full flex flex-col items-center gap-6">
          <p className="text-base text-center text-gray-primary max-w-md">
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
