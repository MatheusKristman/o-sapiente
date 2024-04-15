import { create } from "zustand";

interface IUseFinishModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useFinishModalStore = create<IUseFinishModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useFinishModalStore;
