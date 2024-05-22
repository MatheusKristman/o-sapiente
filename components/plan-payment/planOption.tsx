import { ArrowRight } from "lucide-react";
import { Plan } from "@prisma/client";

import { cn, formatPrice } from "@/libs/utils";
import usePaymentStore from "@/stores/usePaymentStore";

interface Props {
  plan: Plan;
  selected: boolean;
}

export function PlanOption({ plan, selected }: Props) {
  const { setPlanSelected } = usePaymentStore();

  return (
    // TODO: adicionar dinamicamente depois quando for feito a request
    <div
      onClick={() => setPlanSelected(plan)}
      className={cn(
        "w-full bg-white border-2 cursor-pointer border-white rounded-lg transition-colors px-4 py-3 flex justify-around gap-6 sm:w-fit",
        {
          "border-green-primary": selected,
        }
      )}
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-primary font-medium">{plan.planName}</span>
        <span className="text-xl font-semibold text-green-primary">{formatPrice(plan.cost / 100)}</span>
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
