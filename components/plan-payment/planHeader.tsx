import { info } from "@/constants/plan-payment/plan-header-br";
import { PlanOption } from "./planOption";
import Button from "../Button";
import { cn } from "@/libs/utils";

export function PlanHeader() {
  return (
    <div className="w-full px-6 my-12 sm:px-16 lg:container lg:mx-auto lg:flex lg:justify-between lg:items-center lg:gap-12">
      <div className="w-full bg-green-primary px-6 py-9 rounded-xl mb-9 lg:mb-0 lg:max-w-md">
        <p className="text-white font-normal text-base sm:text-lg">
          {info.greenBox}
        </p>
      </div>

      <div className="w-full lg:w-fit">
        <h2 className="text-2xl text-gray-primary font-semibold mb-6 sm:text-3xl">
          {info.title}{" "}
          <strong className="font-semibold text-green-primary">
            {info.titleGreen}
          </strong>
        </h2>

        <div className="w-full flex flex-col gap-y-4 mb-6 sm:flex-row">
          <PlanOption />
        </div>

        <div className="w-full flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            className={cn(
              "w-full py-1.5 px-8 bg-green-primary/10 border-green-primary text-green-primary hover:bg-green-primary/10 transition disabled:bg-green-primary/20 disabled:hover:bg-green-primary/20 flex items-center justify-center gap-2 text-base rounded-lg border-2 font-medium disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75 sm:w-[230.41px]",
              {
                "bg-green-primary text-white hover:bg-green-primary/75 disabled:bg-green-primary/75 disabled:hover:bg-green-primary/75":
                  false,
              },
            )}
          >
            {info.pixBtn}
          </button>

          <button
            type="button"
            className={cn(
              "w-full py-1.5 px-8 bg-green-primary/10 border-green-primary text-green-primary hover:bg-green-primary/10 transition disabled:bg-green-primary/20 disabled:hover:bg-green-primary/20 flex items-center justify-center gap-2 text-base rounded-lg border-2 font-medium disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75 sm:w-fit",
              {
                "bg-green-primary text-white hover:bg-green-primary/75 disabled:bg-green-primary/75 disabled:hover:bg-green-primary/75":
                  true,
              },
            )}
          >
            {info.cardBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
