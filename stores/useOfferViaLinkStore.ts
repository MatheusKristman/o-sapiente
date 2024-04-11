import { create } from "zustand";

interface IUseOfferViaLinkStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useOfferViaLinkStore = create<IUseOfferViaLinkStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useOfferViaLinkStore;
