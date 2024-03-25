import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Offer } from "@prisma/client";

import { OfferWithUser } from "@/types";
import { cn } from "@/libs/utils";
import { offersModalInfo } from "@/constants/offersModal-br";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
    <Accordion type="single" collapsible>
      <AccordionItem value={offer.id}>
        <AccordionTrigger>
          <div className="flex items-center gap-x-4">
            <div className="relative w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
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

            <span className="text-lg font-semibold text-left text-gray-primary">
              {`${offer.user.firstName} ${offer.user.lastName}`}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex gap-2">
              <span className="text-base font-medium text-gray-primary">
                Proposta:
              </span>
              <span className="text-base text-left text-gray-primary">
                {offer.message}
              </span>
            </div>

            <Button>{offersModalInfo.btn}</Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OfferItem;
