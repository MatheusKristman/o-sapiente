import { cn } from "@/libs/utils";
import { ArrowRight } from "lucide-react";

export function PlanOption() {
  return (
    // TODO: adicionar dinamicamente depois quando for feito a request
    <div
      className={cn(
        "w-full bg-white border-2 border-white rounded-lg transition-colors px-4 py-3 flex justify-around gap-6 sm:w-fit",
        {
          "border-green-primary": true,
        },
      )}
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-primary font-medium">30 dias</span>
        <span className="text-xl font-semibold text-green-primary">
          R$ 49,99
        </span>
      </div>

      <ul className="flex flex-col space-y-1">
        <li className="flex items-center gap-1 text-sm text-gray-primary">
          <ArrowRight color="#03C988" size="20px" />
          Propostas Diretas
        </li>

        <li className="flex items-center gap-1 text-sm text-gray-primary">
          <ArrowRight color="#03C988" size="20px" />
          Aulas Personalizadas
        </li>

        <li className="flex items-center gap-1 text-sm text-gray-primary">
          <ArrowRight color="#03C988" size="20px" />
          Pagamento Seguro
        </li>
      </ul>
    </div>
  );
}
