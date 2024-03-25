import Image from "next/image";
import { Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { studentResumeInfos } from "@/constants/dashboard/resume-br";
import { cn } from "@/libs/utils";

interface CurrentLessonMessageBoxProps {
  last?: boolean;
}

const CurrentLessonMessageBox = ({ last }: CurrentLessonMessageBoxProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg bg-green-primary p-5 mb-4",
        last && "mb-0"
      )}
    >
      <div className="flex flex-col lg:flex-row lg:gap-6 xl:w-full">
        <div className="flex justify-center xl:w-1/12">
          <Image
            src="/assets/images/profile-test.png"
            alt="Perfil"
            width={50}
            height={40}
            className="object-cover rounded-3xl lg:w-12 lg:h-12"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 text-white text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
          <span className="-mb-3 lg:mb-0">John Doe</span>

          <Dot style={{ width: "35px", height: "35px" }} />

          <span className="text-base -mt-3 lg:mt-0">Matemática</span>
        </div>

        <div className="xl:flex xl:justify-end xl:w-5/12">
          <div className="flex items-center justify-center">
            <Button variant="secondary" className="w-full">
              {studentResumeInfos.seeMessageBtn}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLessonMessageBox;
