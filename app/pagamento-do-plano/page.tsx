import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { PlanHeader } from "@/components/plan-payment/planHeader";
import getPlans from "@/app/action/getPlans";
import { PlanForm } from "@/components/plan-payment/planForm";
import getCurrentUser from "@/app/action/getCurrentUser";
import { LoadingComponent } from "@/components/LoadingComponent";

async function PlanPaymentPage() {
  const plans = await getPlans();
  const currentUser = await getCurrentUser();
  const session = await getServerSession();

  if (!session && !currentUser) {
    redirect("/");
  }

  if (!currentUser) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PlanHeader plans={plans} />
      <PlanForm currentUser={currentUser} />
    </>
  );
}

export default PlanPaymentPage;
