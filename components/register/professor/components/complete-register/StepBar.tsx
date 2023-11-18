import { cn } from "@/libs/utils";

interface StepBarProps {
  actualStep: number;
}

const StepBar = ({ actualStep }: StepBarProps) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "h-[2px] bg-green-primary transition-all",
          actualStep === 1 && "w-1/4",
          actualStep === 2 && "w-2/4",
          actualStep === 3 && "w-3/4",
          actualStep === 4 && "w-[4/4]",
        )}
      />
    </div>
  );
};

export default StepBar;
