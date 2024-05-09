import { OfferWithUserAndRequest } from "@/types";
import { Plan } from "@prisma/client";
import { create } from "zustand";

interface iPaymentStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  offer: OfferWithUserAndRequest | undefined;
  setOffer: (offer: OfferWithUserAndRequest) => void;
  paymentMethod: "pix" | "boleto" | "credit_card";
  setPaymentMethod: (method: "pix" | "boleto" | "credit_card") => void;
  planSelected: Plan | null;
  setPlanSelected: (plan: Plan) => void;
  certificateIncluded: boolean;
  toggleCertificateIncluded: (checked: boolean) => void;
}

const usePaymentStore = create<iPaymentStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  offer: undefined,
  setOffer: (offer) => set({ offer }),
  paymentMethod: "pix",
  setPaymentMethod: (method) => set(() => ({ paymentMethod: method })),
  planSelected: null,
  setPlanSelected: (plan) => set(() => ({ planSelected: plan })),
  certificateIncluded: false,
  toggleCertificateIncluded: (checked) => set({ certificateIncluded: checked }),
}));

export default usePaymentStore;
