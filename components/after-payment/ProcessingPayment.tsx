"use client";

import Image from "next/image";
import Link from "next/link";

import { info } from "@/constants/after-payment/processingPayment-br";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";

interface Props {
  userType: string | null | undefined;
}

export function ProcessingPayment({ userType }: Props) {
  const { userId } = useUserStore();

  return (
    <div className="w-full px-6 h-full mt-12 mb-24 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full my-auto flex flex-col items-center gap-6">
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <Image
            src="/assets/icons/processing.gif"
            alt={info.altImg}
            width={150}
            height={150}
            className="object-center object-contain"
          />
        </div>

        <div className="w-full flex flex-col gap-4 items-center justify-center lg:max-w-3xl">
          <h1 className="text-2xl font-semibold text-gray-primary text-center sm:text-3xl">
            <strong className="font-semibold text-green-primary">{info.titleGreen}</strong> {info.titleGray}
          </h1>

          <p className="text-base text-gray-primary text-center sm:text-lg">{info.desc}</p>
        </div>

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
  );
}
