import { coursePaymentInfo } from "@/constants/course-payment";
import { formatPrice } from "@/libs/utils";
import Image from "next/image";

//TODO: criar formulário para o pagamento

export default function CoursePaymentPage() {
  return (
    <div className="w-full px-6 flex flex-col-reverse gap-12">
      <div></div>

      <div className="bg-[#E2EBEF] px-6 py-9 rounded-2xl flex flex-col gap-8">
        <div className="w-full flex flex-col items-center">
          <span className="text-gray-primary text-base font-medium">{coursePaymentInfo.totalCostLabel}</span>

          <span className="text-green-primary font-semibold text-3xl text-center">{formatPrice(499.99)}</span>

          <div className="flex items-center gap-2">
            <Image src="assets/icons/lock.svg" alt="Seguro" width={24} height={24} />

            <span className="text-[#5A727D] text-sm">{coursePaymentInfo.securePaymentInfo}</span>
          </div>
        </div>

        <div className="w-full h-px bg-[#C8D6DF]" />

        <span className="text-[#5A727D] text-base font-medium">{coursePaymentInfo.resume}</span>

        <div className="w-full flex items-center justify-between">
          <span className="text-gray-primary text-base font-medium">Constitucional do Zero</span>

          <span className="text-gray-primary text-base font-medium">{formatPrice(499.99)}</span>
        </div>

        <div className="w-full h-px bg-[#C8D6DF]" />

        <div className="w-full flex items-center justify-between">
          <span className="text-[#5A727D] text-base font-medium">{coursePaymentInfo.subtotal}</span>

          <span className="text-[#5A727D] text-base font-medium">{formatPrice(499.99)}</span>
        </div>

        <div className="w-full h-px bg-[#C8D6DF]" />

        <div className="w-full flex items-center justify-between">
          <span className="text-[#37474F] text-lg font-semibold">{coursePaymentInfo.total}</span>

          <span className="text-[#37474F] text-lg font-semibold">{formatPrice(499.99)}</span>
        </div>
      </div>
    </div>
  );
}
