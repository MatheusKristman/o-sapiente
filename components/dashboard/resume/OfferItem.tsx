import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { OfferWithUser } from "@/types";
import { offersModalInfo } from "@/constants/offersModal-br";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";

interface OfferItemProps {
    offer: OfferWithUser;
    handleCloseButton: () => void;
}

const OfferItem = ({ offer, handleCloseButton }: OfferItemProps) => {
    const router = useRouter();
    const { userId } = useUserStore();

    const [submitting, setSubmitting] = useState<boolean>(false);

    function AcceptOffer() {
        setSubmitting(true);

        axios
            .post("/api/conversations", {
                otherUserId: offer.userId,
                requestId: offer.requestId,
            })
            .then((res) => {
                handleCloseButton();
                router.push(
                    `/painel-de-controle/aluno/${userId}/mensagens/${res.data.id}`,
                );
            })
            .catch((error) => toast.error(error))
            .finally(() => setSubmitting(false));
    }

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
                                {/* TODO: atualizar OfferItem para novo formato de proposta */}
                                Atualizar componente de OfferItem
                            </span>
                        </div>

                        <Button onClick={AcceptOffer} disabled={submitting}>
                            {offersModalInfo.btn}
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default OfferItem;
