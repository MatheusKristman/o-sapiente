import Image from "next/image";
import { Dot } from "lucide-react";
import { Offer } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { studentResumeInfos, professorResumeInfos } from "@/constants/dashboard/resume-br";
import { RequestWithUsersAndOffers } from "@/types";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import useOffersModalStore from "@/stores/useOffersModalStore";
import useUserStore from "@/stores/useUserStore";

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
    setStudentId,
    setStudentImage,
    setStudentName,
    setSubject,
    setMessage,
    setStudentCel,
  } = useRequestDetailsModalStore();
  const { openModal: openOfferModal, setRequestSelected: setRequestSelected } = useOffersModalStore();
  const { userId } = useUserStore();

  const filteredStudent = request.users.filter((user) => user.id !== userId)[0];

  function handleBtn() {
    if (type === "Professor") {
      console.log("Request Info: ", request);
      openModal();
      setRequestId(request.id);
      setStudentId(filteredStudent.id!);
      setStudentImage(filteredStudent.profilePhoto);
      setStudentName(`${filteredStudent.firstName} ${filteredStudent.lastName}`);
      setStudentCel(filteredStudent.tel!);
      setSubject(request.subject);
      setMessage(request.description);
    }

    if (type === "Student") {
      openOfferModal();
      setRequestSelected(request);
    }
  }

  return (
    <div className={cn("w-full rounded-lg bg-white p-5 mb-4", last && "mb-0")}>
      <div className="flex flex-col lg:flex-row lg:gap-6 lg:w-full">
        <div className="flex justify-center xl:w-1/12">
          <Image
            src={filteredStudent?.profilePhoto ? filteredStudent.profilePhoto : "/assets/images/default-user-photo.svg"}
            alt="Perfil"
            width={50}
            height={40}
            className="object-cover rounded-3xl w-12 min-w-[48px] h-12 min-h-[48px]"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 text-green-primary text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
          <span className="-mb-3 lg:mb-0">{filteredStudent?.firstName + " " + filteredStudent?.lastName}</span>

          <Dot
            style={{
              width: "35px",
              height: "35px",
            }}
          />

          <span className="text-base -mt-3 lg:mt-0">{request.subject}</span>
        </div>

        <div className="lg:flex lg:justify-end lg:w-5/12">
          <div className="flex items-center justify-center relative">
            {type === "Student" && request.offers.length > 0 && !request.isOfferAccepted ? (
              <span className="absolute -top-1 -right-1 z-10 rounded-full bg-gray-primary text-sm text-white font-semibold text-center h-6 w-6 flex items-center justify-center">
                {request.offers.length}
              </span>
            ) : null}

            <Button
              className="w-full"
              disabled={(type === "Professor" && !!offer) || request.isOfferAccepted}
              onClick={handleBtn}
            >
              {type === "Professor"
                ? !!offer
                  ? professorResumeInfos.offerSended
                  : professorResumeInfos.seeOfferBtn
                : type === "Student"
                ? request.isOfferAccepted
                  ? studentResumeInfos.offerAccepted
                  : studentResumeInfos.seeOfferBtn
                : ""}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBox;
