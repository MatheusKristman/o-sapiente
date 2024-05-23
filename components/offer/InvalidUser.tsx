"use client";

import Image from "next/image";
import Link from "next/link";

import { info } from "@/constants/offer/invalidUser-br";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";

export function InvalidUser() {
  const { userId, accountType } = useUserStore();

  const dashboardLink = `/painel-de-controle/${accountType === "PROFESSOR" ? "professor" : "aluno"}/${userId}/resumo`;

  return (
    <div className="w-full min-h-[calc(100vh-184px)] flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-center gap-4 mb-9">
          <Image
            src="/assets/icons/error.gif"
            alt={info.title}
            width={150}
            height={150}
            className="object-center object-contain"
          />

          <div className="w-full flex flex-col items-center gap-6">
            <h1 className="text-2xl sm:text-3xl text-gray-primary font-semibold text-center">{info.title}</h1>

            <p className="text-base sm:text-lg text-gray-primary text-center">{info.desc}</p>
          </div>
        </div>

        <Button variant="outline" asChild className="w-full sm:w-fit">
          <Link href={dashboardLink}>{info.backBtn}</Link>
        </Button>
      </div>
    </div>
  );
}
