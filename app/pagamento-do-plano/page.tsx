import { PaymentButtons } from "@/components/PaymentButtons";
import { PaymentCardForm } from "@/components/PaymentCardForm";
import { PaymentPersonalDataForm } from "@/components/PaymentPersonalDataForm";
import { PlanHeader } from "@/components/plan-payment/planHeader";

function PlanPaymentPage() {
  return (
    <>
      <PlanHeader />
      {/* TODO: ver como sera feito o form */}
      <PaymentPersonalDataForm />
      <PaymentCardForm />
    </>
  );
}

export default PlanPaymentPage;
