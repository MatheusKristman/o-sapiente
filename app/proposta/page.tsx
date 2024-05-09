import { redirect } from "next/navigation";

import { OfferViaLink } from "@/components/offer/OfferViaLink";
import { PaymentMethodModal } from "@/components/offer/PaymentMethodModal";
import { InvalidUser } from "@/components/offer/InvalidUser";
import { InvalidLink } from "@/components/offer/InvalidLink";
import getCurrentUser from "../action/getCurrentUser";
import Loading from "../loading";
import getOfferById from "../action/getOfferById";

async function OfferViaLinkPage({
  searchParams,
}: {
  searchParams?: { offerId: string; studentId: string };
}) {
  if (!searchParams) {
    return <Loading />;
  }

  const currentUser = await getCurrentUser();
  const offer = await getOfferById(searchParams.offerId);

  if (!currentUser) {
    redirect("/");
  }

  if (!currentUser?.id || !offer) {
    return <Loading />;
  }

  return (
    <section className="w-full min-h-[calc(100vh-88px)] py-12 px-6 sm:px-16">
      {currentUser.id === searchParams.studentId && (
        <OfferViaLink
          professorName={`${offer.user.firstName} ${offer.user.lastName}`}
          professorPhoto={offer.user.profilePhoto}
          lessonDate={offer.lessonDate}
          lessonPrice={offer.lessonPrice}
        />
      )}
      {currentUser.id !== searchParams.studentId && <InvalidUser />}
      {offer.request.isOfferAccepted && <InvalidLink />}
      <PaymentMethodModal offer={offer} currentUserId={currentUser.id} />
    </section>
  );
}

export default OfferViaLinkPage;
