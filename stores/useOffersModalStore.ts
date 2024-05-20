import { OfferWithUser, RequestWithUsersAndOffers } from "@/types";
import { Offer } from "@prisma/client";
import { create } from "zustand";

interface useOffersModalStoreInter {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  requestSelected: RequestWithUsersAndOffers | null;
  setRequestSelected: (requests: RequestWithUsersAndOffers) => void;
}

const useOffersModalStore = create<useOffersModalStoreInter>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false, requestSelected: null })),
  requestSelected: null,
  setRequestSelected: (request) => set(() => ({ requestSelected: request })),
}));

export default useOffersModalStore;
