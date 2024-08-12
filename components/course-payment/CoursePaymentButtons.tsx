import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
  isSubmitting: boolean;
}

export function CoursePaymentButtons({ className, isSubmitting }: Props) {
  return (
    <div className={cn("w-full flex items-center justify-between gap-6", className)}>
      <Button disabled={isSubmitting} type="button" variant="outline" className="w-full" asChild>
        <Link href="/">Voltar</Link>
      </Button>

      <Button disabled={isSubmitting} type="submit" className="w-full flex items-center gap-2">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Concluindo
          </>
        ) : (
          <>Concluir</>
        )}
      </Button>
    </div>
  );
}
