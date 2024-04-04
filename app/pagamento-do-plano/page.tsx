import { PlanHeader } from "@/components/plan-payment/planHeader";
import getPlans from "../action/getPlans";
import { PlanForm } from "@/components/plan-payment/planForm";

async function PlanPaymentPage() {
  const plans = await getPlans();

  return (
    <>
      <PlanHeader plans={plans} />
      <PlanForm />
    </>
  );
}

export default PlanPaymentPage;
