"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { LoadingComponent } from "@/components/LoadingComponent";
import { CoursePaymentProcessing } from "@/components/course-payment/CoursePaymentProcessing";
import { CoursePaymentConfirmed } from "@/components/course-payment/CoursePaymentConfirmed";
import { CoursePaymentDenied } from "@/components/course-payment/CoursePaymentDenied";
import { CoursePaymentBoleto } from "@/components/course-payment/CoursePaymentBoleto";
import { CoursePaymentPix } from "@/components/course-payment/CoursePaymentPix";

const validStatuses = [
  "authorized_pending_capture",
  "waiting_capture",
  "partial_capture",
  "captured",
  "not_authorized",
  "voided",
  "error_on_voiding",
  "waiting_cancellation",
  "with_error",
  "failed",
  "generated",
  "waiting_payment",
];

export default function CourseAfterPaymentPage() {
  const [transactionType, setTransactionType] = useState<string | null | undefined>(null);
  const [status, setStatus] = useState<string | null | undefined>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null | undefined>(null);
  const [qrCode, setQrCode] = useState<string | null | undefined>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null | undefined>(null);
  const [pdf, setPdf] = useState<string | null | undefined>(null);
  const [boletoCode, setBoletoCode] = useState<string | null | undefined>(null);
  const [courseName, setCourseName] = useState<string | null | undefined>(null);
  const [courseId, setCourseId] = useState<string | null | undefined>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      setTransactionType(searchParams.get("transaction_type"));
      setStatus(searchParams.get("status"));
      setQrCodeUrl(searchParams.get("qr_code_url"));
      setQrCode(searchParams.get("pix_code"));
      setPdf(searchParams.get("pdf"));
      setBoletoCode(searchParams.get("boleto_code"));
      setCourseName(searchParams.get("course_name"));
      setCourseId(searchParams.get("course_id"));

      const expiresDate = searchParams.get("expires_at");

      if (expiresDate) {
        setExpiresAt(new Date(expiresDate));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (status && !validStatuses.includes(status)) {
      toast.error("Ocorreu um erro, pagamento apresentou status fora do esperado! Verifique com o suporte.");
      router.push("/");
    }
  }, [status]);

  if (!status || !transactionType) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full flex items-center justify-center sm:min-h-[700px]">
      {transactionType === "credit_card" &&
        (status === "authorized_pending_capture" || status === "waiting_capture" || status === "partial_capture") && (
          <CoursePaymentProcessing />
        )}

      {transactionType === "credit_card" && status === "captured" && <CoursePaymentConfirmed courseName={courseName} />}

      {(transactionType === "credit_card" || transactionType === "pix" || transactionType === "boleto") &&
        (status === "not_authorized" ||
          status === "voided" ||
          status === "error_on_voiding" ||
          status === "waiting_cancellation" ||
          status === "with_error" ||
          status === "failed") && <CoursePaymentDenied courseId={courseId} />}

      {transactionType === "boleto" && status === "generated" && (
        <CoursePaymentBoleto pdf={pdf} boletoCode={boletoCode} />
      )}

      {transactionType === "pix" && status === "waiting_payment" && (
        <CoursePaymentPix qrCodeUrl={qrCodeUrl} pixCode={qrCode} expiresAt={expiresAt} />
      )}
    </div>
  );
}
