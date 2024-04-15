import { create } from "zustand";

interface IUseConfirmFinishModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useConfirmFinishModalStore = create<IUseConfirmFinishModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
  }),
);

export default useConfirmFinishModalStore;
