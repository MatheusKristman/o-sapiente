import Image from "next/image";
import { Dot } from "lucide-react";

import Button from "@/components/Button";
import { cn } from "@/libs/utils";
import { studentResumeInfos, professorResumeInfos } from "@/constants/dashboard/resume-br";
import { RequestData } from "@/types";

interface OfferBoxProps {
  type: string;
  last?: boolean;
  request?: RequestData;
}

const OfferBox = ({ last, request, type }: OfferBoxProps) => {
  return (
    <div className={cn("w-full rounded-lg bg-white p-5 mb-4", last && "mb-0")}>
      <div className="flex flex-col lg:flex-row lg:gap-6 xl:w-full">
        <div className="flex justify-center xl:w-1/12">
          <Image
            src={request ? request.profilePhoto : "N/A"}
            alt="Perfil"
            width={50}
            height={40}
            className="object-cover rounded-3xl lg:w-12 lg:h-12"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 text-green-primary text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
          <span className="-mb-3 lg:mb-0">
            {request ? request.firstName + " " + request.lastName : "N/A"}
          </span>

          <Dot
            style={{
              width: "35px",
              height: "35px",
            }}
          />

          <span className="text-base -mt-3 lg:mt-0">{request ? request.subject : "N/A"}</span>
        </div>

        <div className="xl:flex xl:justify-end xl:w-5/12">
          <div className="flex items-center justify-center">
            <Button
              primary
              fullWidth
              label={
                type === "Professor"
                  ? professorResumeInfos.seeOfferBtn
                  : type === "Student"
                    ? studentResumeInfos.seeMessageBtn
                    : ""
              }
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBox;
