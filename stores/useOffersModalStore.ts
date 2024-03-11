import { create } from "zustand";

interface useOffersModalStoreInter {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useOffersModalStore = create<useOffersModalStoreInter>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
}));

export default useOffersModalStore;
