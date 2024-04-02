import { create } from "zustand";

interface iPaymentStore {
  paymentMethod: "pix" | "boleto" | "credit_card";
  setPaymentMethod: (method: "pix" | "boleto" | "credit_card") => void;
}

const usePaymentStore = create<iPaymentStore>((set) => ({
  paymentMethod: "pix",
  setPaymentMethod: (method) => set(() => ({ paymentMethod: method })),
}));

export default usePaymentStore;
