"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { professorResumeInfos } from "@/constants/dashboard/resume-br";
import useResumeStore from "@/stores/useResumeStore";
import { Skeleton } from "@/components/ui/skeleton";

interface ResumeProfilePhotoProps {
  type: string;
}

const ResumeProfilePhoto = ({ type }: ResumeProfilePhotoProps) => {
  const { profilePhoto, name, themes, plan } = useResumeStore();

  const formattedThemes = themes ? themes.join(" | ") : "";
  const router = useRouter();

  function handleBuy() {
    router.push("/pagamento-do-plano");
  }

  if (!name) {
    return <ResumeProfilePhotoSkeleton />;
  }

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

      {type === "Student" && <span className="w-full text-center text-xl text-gray-primary font-semibold">{name}</span>}
      {type === "Professor" && (
        <div className="w-full flex flex-col gap-y-6">
          <div className="w-full flex flex-col items-center justify-center gap-y-4">
            <span className="text-xl text-gray-primary text-center font-semibold">{name}</span>
            <span className="text-base text-gray-primary text-center font-medium">{formattedThemes}</span>
          </div>

          <div className="w-full h-[2px] bg-green-primary" />

          <div className="w-full flex flex-col items-center gap-y-6">
            {/* caso de não ter plano */}
            <span className="text-xl text-gray-primary text-center font-semibold">
              {plan ? <>{professorResumeInfos.planText + plan}</> : <>{professorResumeInfos.noPlanText}</>}
            </span>

            {!plan && (
              <Button className="w-full" onClick={handleBuy}>
                {professorResumeInfos.buyPlanBtn}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function ResumeProfilePhotoSkeleton() {
  return (
    <div className="w-full flex flex-col gap-5 bg-white rounded-2xl p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
          <Skeleton className="h-8 w-[40%]" />
          <Skeleton className="h-6 w-[60%]" />
          <Skeleton className="h-6 w-[50%]" />
        </div>

        <div className="w-full h-[2px] bg-green-primary" />

        <div className="w-full flex flex-col items-center gap-y-6">
          <Skeleton className="h-8 w-[50%]" />
        </div>
      </div>
    </div>
  );
}

export default ResumeProfilePhoto;
