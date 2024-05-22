"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PaymentConfirmed } from "@/components/after-payment/PaymentConfirmed";
import { ProcessingPayment } from "@/components/after-payment/ProcessingPayment";
import { PaymentDenied } from "@/components/after-payment/paymentDenied";
import { PaymentBoleto } from "@/components/after-payment/PaymentBoleto";
import { PaymentPix } from "@/components/after-payment/PaymentPix";
import { LoadingComponent } from "@/components/LoadingComponent";

function AfterPaymentPage() {
  const [transactionType, setTransactionType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [pdf, setPdf] = useState<string | null>(null);
  const [boletoCode, setBoletoCode] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      setTransactionType(searchParams.get("transaction_type"));
      setStatus(searchParams.get("status"));
      setQrCodeUrl(searchParams.get("qr_code_url"));
      setQrCode(searchParams.get("pix_code"));
      setPdf(searchParams.get("pdf"));
      setBoletoCode(searchParams.get("boleto_code"));
      setUserType(searchParams.get("user_type"));

      const expiresDate = searchParams.get("expires_at");

      if (expiresDate) {
        setExpiresAt(new Date(expiresDate));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(expiresAt);
  }, [expiresAt]);

  if (!status || !transactionType) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full flex items-center justify-center sm:min-h-[700px]">
      {transactionType === "credit_card" &&
        (status === "authorized_pending_capture" || status === "waiting_capture" || status === "partial_capture") && (
          <ProcessingPayment userType={userType} />
        )}

      {transactionType === "credit_card" && status === "captured" && <PaymentConfirmed userType={userType} />}

      {(transactionType === "credit_card" || transactionType === "pix" || transactionType === "boleto") &&
        (status === "not_authorized" ||
          status === "voided" ||
          status === "error_on_voiding" ||
          status === "waiting_cancellation" ||
          status === "with_error" ||
          status === "failed") && <PaymentDenied userType={userType} />}

      {transactionType === "boleto" && status === "captured" && (
        <PaymentBoleto pdf={pdf} boletoCode={boletoCode} userType={userType} />
      )}
      {transactionType === "pix" && status === "captured" && (
        <PaymentPix qrCodeUrl={qrCodeUrl} pixCode={qrCode} expiresAt={expiresAt} userType={userType} />
      )}
    </div>
  );
}

export default AfterPaymentPage;
