import { PlanHeader } from "@/components/plan-payment/planHeader";
import getPlans from "@/app/action/getPlans";
import { PlanForm } from "@/components/plan-payment/planForm";
import getCurrentUser from "@/app/action/getCurrentUser";

async function PlanPaymentPage() {
  const plans = await getPlans();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    //TODO: checar pagina de loading
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
