import { info } from "@/constants/paymentButtons-br";

export function PaymentButtons() {
  return (
    <div className="w-full flex flex-col gap-4 mb-12">
      <button className="w-full gray-button">{info.skipButton}</button>

      <div className="w-full flex items-center justify-between gap-4">
        <button className="w-1/2 gray-button">{info.backButton}</button>

        <button className="green-button w-1/2">{info.nextButton}</button>
      </div>
    </div>
  );
}
