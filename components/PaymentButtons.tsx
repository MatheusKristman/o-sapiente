import { usePathname, useRouter } from "next/navigation";

import { info } from "@/constants/paymentButtons-br";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";
import { Loader2 } from "lucide-react";

interface Props {
  isSubmitting: boolean;
}

export function PaymentButtons({ isSubmitting }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { userId } = useUserStore();

  function handleBack() {
    if (pathname?.includes("pagamento-do-plano")) {
      router.push(
        `${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`
      );
    }

    if (pathname?.includes("pagamento-da-aula")) {
      router.push(
        `${menuItems[0].studentHref}${userId}${menuItems[0].pageHref}`
      );
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 mb-12">
      {pathname !== "/pagamento-do-plano" &&
        !pathname?.includes("/pagamento-da-aula") && (
          <Button disabled={isSubmitting} variant="gray" className="w-full">
            {info.skipButton}
          </Button>
        )}

      <div className="w-full flex items-center justify-between gap-4">
        <Button
          disabled={isSubmitting}
          type="button"
          variant="gray"
          onClick={handleBack}
          className="w-1/2"
        >
          {info.backButton}
        </Button>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-1/2 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {info.nextButton}
        </Button>
      </div>
    </div>
  );
}
