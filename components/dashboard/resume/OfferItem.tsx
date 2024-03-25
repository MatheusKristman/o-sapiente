import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";

import { offersModalInfo } from "@/constants/offersModal-br";
import { useState } from "react";
import { cn } from "@/libs/utils";
import { Offer } from "@prisma/client";
import { OfferWithUser } from "@/types";

interface OfferItemProps {
  offer: OfferWithUser;
}

const OfferItem = ({ offer }: OfferItemProps) => {
  const [moreDetails, setMoreDetails] = useState(false);

  function handleMoreDetails() {
    setMoreDetails((prev: boolean) => !prev);
  }

  console.log("offer: ", offer);

  return (
    <div className="w-full flex justify-between gap-x-12">
      <div className="flex gap-x-4">
        <div className="relative mt-2 w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
          {offer.user.profilePhoto ? (
            <Image
              src={offer.user.profilePhoto}
              alt="Professor"
              fill
              className="object-cover object-center"
            />
          ) : (
            <Image
              src="/assets/images/default-user-photo.svg"
              alt="Professor"
              fill
              className="object-cover object-center"
            />
          )}
        </div>

        <div className="flex flex-col items-start">
          <span className="text-lg font-semibold text-left text-gray-primary">
            {`${offer.user.firstName} ${offer.user.lastName}`}
          </span>

          <span
            className={cn(
              "text-base font-normal text-gray-primary text-left line-clamp-1",
              {
                "line-clamp-none": moreDetails,
              }
            )}
          >
            {offer.message}
          </span>
        </div>
      </div>

      <div className="flex mt-2 gap-x-2">
        <button
          onClick={handleMoreDetails}
          className="h-12 w-12 bg-[#EBEFF1] text-[#2C383F] rounded-xl flex items-center justify-center transition-colors hover:bg-green-primary hover:text-white"
        >
          {moreDetails ? <Minus size="24px" /> : <Plus size="24px" />}
        </button>

        <button className="py-1.5 h-12 px-8 flex items-center justify-center gap-2 text-base rounded-lg border-2 font-medium disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75 bg-green-primary border-green-primary text-white hover:brightness-90 transition">
          {offersModalInfo.btn}
          <Check size="24px" />
        </button>
      </div>
    </div>
  );
};

export default OfferItem;
