import { useEffect, useState } from "react";

import OfferBox from "./OfferBox";
import {
  professorResumeInfos,
  studentResumeInfos,
} from "@/constants/dashboard/resume-br";
import { request } from "http";
import { RequestWithUsersAndOffers } from "@/types";
import { Offer } from "@prisma/client";

interface ResumeRequestBoxProps {
  type: string;
  request?: RequestWithUsersAndOffers[];
  offers?: Offer[];
}

const ResumeRequestBox = ({
  type,
  request,
  offers: professorOffers,
}: ResumeRequestBoxProps) => {
  const [offersToStudent, setOffersToStudent] = useState<
    RequestWithUsersAndOffers[]
  >([]);

  const filteredRequest = request?.filter(
    (request) => !request.isOfferAccepted,
  );

  useEffect(() => {
    if (request) {
      setOffersToStudent(request);
    }
  }, [request]);

  function offerFiltered(requestId: string) {
    if (professorOffers) {
      return professorOffers.find((offer) => offer.requestId === requestId);
    }
  }

  return (
    <div className="w-full rounded-lg bg-green-primary p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <h2 className="text-white text-2xl font-semibold mb-5 md:text-3xl lg:whitespace-nowrap whitespace-normal">
        {type === "Professor" ? professorResumeInfos.requestBoxTitle : null}
        {type === "Student" ? studentResumeInfos.newOffersTitle : null}
      </h2>

      <div className="relative w-full max-h-[300px] overflow-auto scrollbar scrollbar-thumb-slate-100">
        {type === "Professor" &&
          (filteredRequest && filteredRequest.length > 0 ? (
            <>
              <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              {filteredRequest.map((request, index) => (
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
          (filteredRequest && filteredRequest.length > 0 ? (
            <>
              <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              {filteredRequest.map((request, index) => (
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

export default ResumeRequestBox;
