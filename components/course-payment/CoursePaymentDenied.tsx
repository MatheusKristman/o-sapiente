import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  courseId: string | null | undefined;
}

export function CoursePaymentDenied({ courseId }: Props) {
  return (
    <div className="w-full px-6 h-full my-12 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full flex flex-col items-center gap-9">
        <div className="w-full flex flex-col items-center gap-6">
          <Image
            src="/assets/icons/error.gif"
            alt="Erro no Pagamento"
            width={150}
            height={150}
            className="object-center object-contain"
          />

          <h1 className="text-2xl font-semibold text-gray-primary text-center max-w-md sm:text-3xl sm:max-w-lg">
            Pagamento <strong className="text-green-primary font-semibold">negado</strong>
          </h1>

          <p className="text-base font-medium text-gray-primary text-center sm:text-lg max-w-prose">
            Parece que algo deu errado com o pagamento. Não se preocupe! Verifique os detalhes e tente novamente.
          </p>
        </div>

        <div className="w-full h-px bg-[#C8D6DF] max-w-prose" />

        <div className="w-full flex flex-col-reverse items-center gap-4 max-w-prose sm:flex-row">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Voltar para início</Link>
          </Button>

          <Button className="w-full" asChild>
            <Link href={`/pagamento-do-curso/${courseId}`}>Tentar novamente</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
