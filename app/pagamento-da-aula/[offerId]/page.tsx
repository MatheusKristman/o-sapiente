import getCurrentUser from "@/app/action/getCurrentUser";
import getOfferById from "@/app/action/getOfferById";
import { LoadingComponent } from "@/components/LoadingComponent";
import { LessonPaymentForm } from "@/components/lesson-payment/LessonPaymentForm";
import { LessonPaymentHeader } from "@/components/lesson-payment/LessonPaymentHeader";

async function LessonPaymentPage({ params }: { params: { offerId: string } }) {
  const currentUser = await getCurrentUser();
  const offer = await getOfferById(params.offerId);

  if (!currentUser || !offer) {
    // TODO: adicionar componente de erro avisando que o usuário não está logado
    return <LoadingComponent />;
  }

  return (
    <>
      <LessonPaymentHeader lessonPrice={offer.lessonPrice} />
      <LessonPaymentForm currentUser={currentUser} offer={offer} />
    </>
  );
}

export default LessonPaymentPage;
