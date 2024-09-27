import { courseAdInfo } from "@/constants/courseAd-br";
import { Dot } from "lucide-react";

interface RecentsCourseCardProps {
  title: string;
  price: number;
  lessonsCount: number;
  hoursCount: number;
}

export function RecentsCourseCard({
  title,
  price,
  lessonsCount,
  hoursCount,
}: RecentsCourseCardProps) {
  console.log(price.toFixed(2).replace(".", ","));

  return (
    <div className="w-full h-full rounded-2xl bg-white shadow-lg px-8 py-9 flex flex-col justify-between gap-6 group">
      <div className="w-full flex flex-col gap-2 items-center">
        <h5 className="text-lg font-semibold text-gray-primary text-center !leading-tight line-clamp-2">
          {title}
        </h5>

        <div className="flex items-center text-gray-primary/50">
          <span className="text-base font-medium">{`${lessonsCount} ${lessonsCount > 1 ? "aulas" : "aula"}`}</span>

          <Dot />

          <span className="text-base font-medium">{`${hoursCount} ${hoursCount > 1 ? "horas" : "hora"}`}</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <span className="text-base text-gray-primary/60 text-center font-medium !leading-none">
          {courseAdInfo.adCardPriceBox[0]}
        </span>

        <div className="flex gap-1 items-end">
          <span className="text-lg text-green-primary mb-1">
            {courseAdInfo.adCardPriceBox[1]}
          </span>

          <span className="text-green-primary text-3xl font-semibold">
            {price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <span className="text-base text-gray-primary/60 text-center font-medium !leading-tight">
          {courseAdInfo.adCardPriceBox[2]}
        </span>
      </div>
    </div>
  );
}
