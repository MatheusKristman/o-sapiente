import { Plan } from "@prisma/client";
import { create } from "zustand";

interface iPaymentStore {
  paymentMethod: "pix" | "boleto" | "credit_card";
  setPaymentMethod: (method: "pix" | "boleto" | "credit_card") => void;
  planSelected: Plan | null;
  setPlanSelected: (plan: Plan) => void;
  certificateIncluded: boolean;
  toggleCertificateIncluded: (checked: boolean) => void;
}

const usePaymentStore = create<iPaymentStore>((set) => ({
  paymentMethod: "pix",
  setPaymentMethod: (method) => set(() => ({ paymentMethod: method })),
  planSelected: null,
  setPlanSelected: (plan) => set(() => ({ planSelected: plan })),
  certificateIncluded: false,
  toggleCertificateIncluded: (checked) => set({ certificateIncluded: checked }),
}));

export default usePaymentStore;
