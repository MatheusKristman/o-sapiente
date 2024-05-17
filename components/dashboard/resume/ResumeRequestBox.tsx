import { useEffect, useState } from "react";

import OfferBox from "./OfferBox";
import {
  professorResumeInfos,
  studentResumeInfos,
} from "@/constants/dashboard/resume-br";
import { request } from "http";
import { RequestWithUsersAndOffers } from "@/types";
import { Offer } from "@prisma/client";
import useResumeStore from "@/stores/useResumeStore";
import useUserStore from "@/stores/useUserStore";
import { Skeleton } from "@/components/ui/skeleton";

interface ResumeRequestBoxProps {
  type: "Professor" | "Student";
}

//TODO: ajustar requests para o usuário correto

const ResumeRequestBox = ({ type }: ResumeRequestBoxProps) => {
  const { requests, offers: professorOffers } = useResumeStore();
  const { userId } = useUserStore();

  function offerFiltered(requestId: string) {
    if (professorOffers) {
      return professorOffers.find((offer) => offer.requestId === requestId);
    }
  }

  if (!requests) {
    return <ResumeRequestBoxSkeleton type={type} />;
  }

  return (
    <div className="w-full rounded-lg bg-green-primary p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <h2 className="text-white text-2xl font-semibold mb-5 md:text-3xl lg:whitespace-nowrap whitespace-normal">
        {type === "Professor" ? professorResumeInfos.requestBoxTitle : null}
        {type === "Student" ? studentResumeInfos.newOffersTitle : null}
      </h2>

      <div className="relative w-full max-h-[600px] lg:max-h-[400px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        {type === "Professor" &&
          (requests && requests.length > 0 ? (
            <>
              <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              {requests.map((request) => (
                <OfferBox
                  offer={professorOffers ? offerFiltered(request.id) : null}
                  type={type}
                  key={request.id}
                  request={request}
                />
              ))}

              <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <span className="text-gray-primary/50 text-lg font-medium">
                {studentResumeInfos.noOfferMessage}
              </span>
            </div>
          ))}

        {type === "Student" &&
          (requests && requests.length > 0 ? (
            <>
              <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              {requests.map((request) => (
                <OfferBox type={type} key={request.id} request={request} />
              ))}

              <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <span className="text-gray-primary/50 text-lg font-medium">
                {studentResumeInfos.noOfferMessage}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

function ResumeRequestBoxSkeleton({ type }: { type: "Professor" | "Student" }) {
  return (
    <div className="w-full rounded-lg bg-green-primary p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <h2 className="text-white text-2xl font-semibold mb-5 md:text-3xl lg:whitespace-nowrap whitespace-normal">
        {type === "Professor" ? professorResumeInfos.requestBoxTitle : null}
        {type === "Student" ? studentResumeInfos.newOffersTitle : null}
      </h2>

      <div className="relative w-full max-h-[600px] lg:max-h-[400px] overflow-auto scrollbar scrollbar-thumb-slate-100">
        <Skeleton className="h-12 w-full  bg-green-primary brightness-90 mb-6" />
        <Skeleton className="h-12 w-full  bg-green-primary brightness-90 mb-6" />
        <Skeleton className="h-12 w-full  bg-green-primary brightness-90" />
      </div>
    </div>
  );
}

export default ResumeRequestBox;
