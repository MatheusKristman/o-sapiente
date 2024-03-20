import { PaymentPersonalDataForm } from "@/components/PaymentPersonalDataForm";
import { PlanHeader } from "@/components/plan-payment/planHeader";

function PlanPaymentPage() {
  return (
    <>
      <PlanHeader />
      {/* TODO: ver como sera feito o form */}
      <PaymentPersonalDataForm />
    </>
  );
}

export default PlanPaymentPage;
