import { OfferWithUser } from "@/types";
import { Offer } from "@prisma/client";
import { create } from "zustand";

interface useOffersModalStoreInter {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  requestSelectedOffers: OfferWithUser[];
  setRequestSelectedOffers: (offers: OfferWithUser[]) => void;
}

const useOffersModalStore = create<useOffersModalStoreInter>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  requestSelectedOffers: [],
  setRequestSelectedOffers: (offers) =>
    set(() => ({ requestSelectedOffers: offers })),
}));

export default useOffersModalStore;
