import { OfferViaLink } from "@/components/offer/OfferViaLink";
import { PaymentMethodModal } from "@/components/offer/PaymentMethodModal";
import { InvalidUser } from "@/components/offer/InvalidUser";
import { InvalidLink } from "@/components/offer/InvalidLink";

function OfferViaLinkPage() {
  return (
    <section className="w-full min-h-[calc(100vh-88px)] py-12 px-6 sm:px-16">
      <OfferViaLink />
      <PaymentMethodModal />
      {/* <InvalidUser /> */}
      {/* <InvalidLink /> */}
    </section>
  );
}

export default OfferViaLinkPage;
