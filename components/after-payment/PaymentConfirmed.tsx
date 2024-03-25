"use client";

import Image from "next/image";
import Link from "next/link";

import useHeaderStore from "@/stores/useHeaderStore";
import { info } from "@/constants/after-payment/paymentConfirmed-br";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { Button } from "@/components/ui/button";

export function PaymentConfirmed() {
  const { userId } = useHeaderStore();

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
          <h1 className="text-2xl font-semibold text-gray-primary text-center max-w-md sm:text-3xl sm:max-w-lg">
            {info.titleGray[0] + " "}
            <strong className="font-semibold text-green-primary">
              {info.titleGreen[0]}
            </strong>{" "}
            {info.titleGray[1] + " "}
            <strong className="font-semibold text-green-primary relative after:content-[''] after:w-4 after:h-4 after:block after:bg-highlight after:bg-contain after:bg-no-repeat after:absolute after:top-1 after:-right-3 sm:after:top-2">
              {info.titleGreen[1]}
            </strong>
          </h1>

          <p className="text-base text-gray-primary text-center sm:text-lg">
            {info.desc}
          </p>
        </div>

        <Button asChild>
          <Link
            href={`${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`}
            className="text-center w-full sm:w-fit"
          >
            {info.backBtn}
          </Link>
        </Button>
      </div>
    </div>
  );
}
