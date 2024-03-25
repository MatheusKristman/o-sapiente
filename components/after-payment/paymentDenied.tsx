"use client";

import Image from "next/image";
import Link from "next/link";

import useHeaderStore from "@/stores/useHeaderStore";
import { info } from "@/constants/after-payment/paymentDenied-br";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { Button } from "@/components/ui/button";

export function PaymentDenied() {
  const { userId } = useHeaderStore();

  return (
    <div className="w-full px-6 h-full mt-12 mb-24 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full my-auto flex flex-col items-center gap-6">
        <div className="w-full flex flex-col gap-4 items-center justify-center lg:max-w-3xl">
          <Image
            src="/assets/icons/error.gif"
            alt={info.altImg}
            width={150}
            height={150}
            className="object-center object-contain"
          />

          <h1 className="text-2xl font-semibold text-gray-primary text-center max-w-md sm:text-3xl sm:max-w-lg">
            {info.titleGray + " "}
            <strong className="font-semibold text-green-primary">
              {info.titleGreen}
            </strong>
          </h1>

          <p className="text-base text-gray-primary text-center sm:text-lg">
            {info.desc}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 sm:flex-row max-w-xl">
          <Button asChild>
            <Link
              href="/pagamento-do-plano"
              className="text-center w-full sm:w-1/2"
            >
              {info.againBtn}
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link
              href={`${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`}
              className="text-center w-full sm:w-1/2"
            >
              {info.backBtn}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
