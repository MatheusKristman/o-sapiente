import Image from "next/image";

import { info } from "@/constants/offer/offerViaLink-br";
import { Button } from "@/components/ui/button";

export function OfferViaLink() {
  return (
    <div className="w-full min-h-[calc(100vh-88px)] flex items-start justify-center">
      <div className="w-full flex flex-col items-center gap-9">
        <h2 className="text-2xl text-center text-gray-primary font-semibold">
          <strong className="text-green-primary font-semibold">
            {info.titleGreen}
          </strong>{" "}
          {info.titleGray}
        </h2>

        <div className="w-full bg-white shadow-md shadow-black/25 rounded-2xl px-9 py-5 flex flex-col gap-4">
          <div className="w-full flex items-center gap-6">
            <div className="w-14 min-w-[56px] h-14 min-h-[56px] rounded-full overflow-hidden relative">
              <Image
                alt="Perfil"
                src="/assets/images/avatar-example.png"
                fill
                className="object-cover object-center"
              />
            </div>

            <span className="text-xl font-semibold text-gray-primary">
              Nome do professor
            </span>
          </div>

          <div className="w-full flex items-center justify-around gap-4">
            <div className="flex flex-col items-center">
              <span className="text-gray-primary font-medium text-base text-center">
                {info.lessonDateLabel}
              </span>

              <span className="text-green-primary font-semibold text-lg text-center">
                01/10/2024
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-primary font-medium text-base text-center">
                {info.lessonPriceLabel}
              </span>

              <span className="text-green-primary font-semibold text-lg text-center">
                R$ 10,00
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-6">
          <Button className="w-full">{info.acceptBtn}</Button>

          <Button variant="outline" className="w-full">
            {info.declineBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
