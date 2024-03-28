import { cn } from "@/libs/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#EBEFF1]", className)}
      {...props}
    />
  );
}

export { Skeleton };
