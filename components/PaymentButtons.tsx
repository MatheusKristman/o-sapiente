import { usePathname, useRouter } from "next/navigation";

import { info } from "@/constants/paymentButtons-br";
import useHeaderStore from "@/stores/useHeaderStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { Button } from "@/components/ui/button";

export function PaymentButtons() {
  const pathname = usePathname();
  const router = useRouter();

  const { userId } = useHeaderStore();

  function handleBack() {
    router.push(
      `${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`
    );
  }

  // TODO: provisório, depois ajustar para a lógica do gateway de pagamento
  function handleNext() {
    router.push("/pagamento-do-plano/pos-pagamento");
  }

  return (
    <div className="w-full flex flex-col gap-4 mb-12">
      {pathname !== "/pagamento-do-plano" && (
        <Button variant="gray" className="w-full">
          {info.skipButton}
        </Button>
      )}

      <div className="w-full flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="gray"
          onClick={handleBack}
          className="w-1/2"
        >
          {info.backButton}
        </Button>

        <Button type="submit" className="w-1/2">
          {info.nextButton}
        </Button>
      </div>
    </div>
  );
}
