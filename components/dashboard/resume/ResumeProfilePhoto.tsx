import Image from "next/image";

import Button from "@/components/Button";
import { professorResumeInfos } from "@/constants/dashboard/resume-br";

interface ResumeProfilePhotoProps {
  type: string;
  profilePhoto: string;
  name: string;
}

const ResumeProfilePhoto = ({ type, profilePhoto, name }: ResumeProfilePhotoProps) => {
  return (
    <div className="w-full flex flex-col gap-5 bg-white rounded-2xl p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={profilePhoto ? profilePhoto : "/assets/images/default-user-photo.svg"}
          alt="Perfil"
          fill
          className="object-cover"
        />
      </div>

      {type === "Student" && (
        <span className="w-full text-center text-xl text-gray-primary font-semibold">{name}</span>
      )}
      {type === "Professor" && (
        <div className="w-full flex flex-col gap-y-6">
          <div className="w-full flex flex-col items-center justify-center gap-y-4">
            <span className="text-xl text-gray-primary text-center font-semibold">Mary Doe</span>
            <span className="text-base text-gray-primary text-center font-medium">
              Matemática | Química
            </span>
          </div>

          <div className="w-full h-[2px] bg-green-primary" />

          <div className="w-full flex flex-col items-center gap-y-6">
            {/* caso de não ter plano */}
            <span className="text-xl text-gray-primary text-center font-semibold">
              {professorResumeInfos.noPlanText}
            </span>

            <Button primary fullWidth onClick={() => {}} label={professorResumeInfos.buyPlanBtn} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeProfilePhoto;
