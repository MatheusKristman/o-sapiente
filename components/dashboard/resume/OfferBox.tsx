import Image from "next/image";
import { Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import {
  studentResumeInfos,
  professorResumeInfos,
} from "@/constants/dashboard/resume-br";
import { RequestWithUsersAndOffers } from "@/types";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import useOffersModalStore from "@/stores/useOffersModalStore";
import { Offer } from "@prisma/client";

interface OfferBoxProps {
  type: string;
  last?: boolean;
  request: RequestWithUsersAndOffers;
  offer?: Offer | null;
}

const OfferBox = ({ last, request, type, offer }: OfferBoxProps) => {
  const {
    openModal,
    setRequestId,
    setStudentImage,
    setStudentName,
    setSubject,
    setMessage,
  } = useRequestDetailsModalStore();

  const {
    openModal: openOfferModal,
    setRequestSelectedOffers: setRequestSelected,
  } = useOffersModalStore();

  function handleBtn() {
    if (type === "Professor") {
      openModal();
      setRequestId(request.id);
      setStudentImage(request.users[0].profilePhoto);
      setStudentName(
        `${request.users[0].firstName} ${request.users[0].lastName}`
      );
      setSubject(request.subject);
      setMessage(request.description);
    }

    if (type === "Student") {
      openOfferModal();
      setRequestSelected(request.offers);
    }
  }

  return (
    <div className={cn("w-full rounded-lg bg-white p-5 mb-4", last && "mb-0")}>
      <div className="flex flex-col lg:flex-row lg:gap-6 xl:w-full">
        <div className="flex justify-center xl:w-1/12">
          <Image
            src={
              request.users[0].profilePhoto
                ? request.users[0].profilePhoto
                : "N/A"
            }
            alt="Perfil"
            width={50}
            height={40}
            className="object-cover rounded-3xl lg:w-12 lg:h-12"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 text-green-primary text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
          <span className="-mb-3 lg:mb-0">
            {request.users[0].firstName + " " + request.users[0].lastName}
          </span>

          <Dot
            style={{
              width: "35px",
              height: "35px",
            }}
          />

          <span className="text-base -mt-3 lg:mt-0">{request.subject}</span>
        </div>

        <div className="xl:flex xl:justify-end xl:w-5/12">
          <div className="flex items-center justify-center relative">
            {type === "Student" && request.offers.length > 0 ? (
              <span className="absolute -top-1 -right-1 z-10 rounded-full bg-gray-primary text-sm text-white font-semibold text-center h-6 w-6 flex items-center justify-center">
                {request.offers.length}
              </span>
            ) : null}

            <Button
              className="w-full"
              disabled={type === "Professor" && !!offer}
              onClick={handleBtn}
            >
              {type === "Professor"
                ? !!offer
                  ? professorResumeInfos.offerSended
                  : professorResumeInfos.seeOfferBtn
                : type === "Student"
                ? studentResumeInfos.seeOfferBtn
                : ""}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBox;
