import { create } from "zustand";

interface IUseSupportModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useSupportModalStore = create<IUseSupportModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useSupportModalStore;
