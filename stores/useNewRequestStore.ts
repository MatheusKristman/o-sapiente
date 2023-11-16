import { create } from "zustand";

interface useNewRequestStoreProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useNewRequestStore = create<useNewRequestStoreProps>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
}));

export default useNewRequestStore;
