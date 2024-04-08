import { PlanHeader } from "@/components/plan-payment/planHeader";
import getPlans from "../action/getPlans";
import { PlanForm } from "@/components/plan-payment/planForm";
import getCurrentUser from "../action/getCurrentUser";

async function PlanPaymentPage() {
  const plans = await getPlans();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div>
        <div>loading</div>
      </div>
    );
  }

  return (
    <>
      <PlanHeader plans={plans} />
      <PlanForm currentUser={currentUser} />
    </>
  );
}

export default PlanPaymentPage;
