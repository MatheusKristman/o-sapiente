import Link from "next/link";

import { professorResumeInfos } from "@/constants/dashboard/resume-br";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import useUserStore from "@/stores/useUserStore";
import useResumeStore from "@/stores/useResumeStore";
import { Skeleton } from "@/components/ui/skeleton";

export function FinishedLessonsBox() {
  const { userId } = useUserStore();
  const { finishedLessons } = useResumeStore();

  if (finishedLessons === null) {
    return <FinishedLessonsBoxSkeleton />;
  }

  return (
    <div className="w-full bg-white rounded-2xl p-9 shadow-md shadow-black/25">
      <div className="w-full flex flex-col justify-between gap-4">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-lg text-green-primary font-semibold">{professorResumeInfos.finishedLessonsTitle}</h3>

          <span className="text-2xl text-green-primary font-semibold">{finishedLessons}</span>
        </div>

        <Button asChild className="w-full">
          <Link href={`${menuItems[2].professorHref}${userId}${menuItems[2].pageHref}`}>
            {professorResumeInfos.seeHistory}
          </Link>
        </Button>
      </div>
    </div>
  );
}

function FinishedLessonsBoxSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl p-9 shadow-md shadow-black/25">
      <div className="w-full flex flex-col justify-between gap-4">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-lg text-green-primary font-semibold">{professorResumeInfos.finishedLessonsTitle}</h3>

          <Skeleton className="h-10 w-14" />
        </div>

        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
