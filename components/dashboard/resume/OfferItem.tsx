import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";

import { OfferWithUser } from "@/types";
import { offersModalInfo } from "@/constants/offersModal-br";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/libs/utils";
import usePaymentStore from "@/stores/usePaymentStore";
import useOffersModalStore from "@/stores/useOffersModalStore";

interface OfferItemProps {
  offer: OfferWithUser;
  handleCloseButton: () => void;
}

const OfferItem = ({ offer }: OfferItemProps) => {
  const { openModal, setOffer } = usePaymentStore();
  const { closeModal } = useOffersModalStore();

  const [submitting, setSubmitting] = useState<boolean>(false);

  function AcceptOffer() {
    setSubmitting(true);

    axios
      .get(`/api/offer/${offer.id}`)
      .then((res) => {
        setOffer(res.data);
        closeModal();

        setTimeout(() => {
          openModal();
        }, 350);
      })
      .catch((error) => {
        console.error(error);

        toast.error("Ocorreu um erro ao aceitar a proposta");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={offer.id} className="px-4">
        <AccordionTrigger>
          <div className="flex items-center gap-x-4">
            <div className="relative w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
              {offer.user.profilePhoto ? (
                <Image src={offer.user.profilePhoto} alt="Professor" fill className="object-cover object-center" />
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
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex gap-2">
                <span className="text-base font-medium text-gray-primary">Proposta:</span>

                <span className="text-base text-left text-gray-primary">{offer.details}</span>
              </div>

              <div className="w-full flex gap-2">
                <span className="text-base font-medium text-gray-primary">Data da aula:</span>

                <span className="text-base text-left text-gray-primary">
                  {format(new Date(offer.lessonDate), "PPP", {
                    locale: ptBR,
                  })}
                </span>
              </div>

              <div className="w-full flex gap-2">
                <span className="text-base font-medium text-gray-primary">Valor:</span>

                <span className="text-base text-left text-gray-primary">{formatPrice(offer.lessonPrice)}</span>
              </div>
            </div>

            <Button onClick={AcceptOffer} disabled={submitting} className="flex items-center gap-2">
              {submitting && <Loader2 className="animate-spin" />}
              {offersModalInfo.btn}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OfferItem;
