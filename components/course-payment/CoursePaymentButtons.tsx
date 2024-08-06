import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";

interface Props {
  className?: string;
}

export function CoursePaymentButtons({ className }: Props) {
  return (
    <div className={cn("w-full flex items-center justify-between gap-6", className)}>
      <Button variant="outline" className="w-full">
        Voltar
      </Button>

      <Button className="w-full">Concluir</Button>
    </div>
  );
}
