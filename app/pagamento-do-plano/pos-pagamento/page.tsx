import { PaymentConfirmed } from "@/components/after-payment/PaymentConfirmed";
import { ProcessingPayment } from "@/components/after-payment/ProcessingPayment";
import { PaymentDenied } from "@/components/after-payment/paymentDenied";

function AfterPaymentPage() {
  return (
    <div className="w-full flex items-center justify-center sm:min-h-[700px]">
      <ProcessingPayment />
      {/* <PaymentConfirmed /> */}
      {/* <PaymentDenied /> */}
    </div>
  );
}

export default AfterPaymentPage;
