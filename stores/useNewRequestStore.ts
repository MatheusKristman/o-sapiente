import { create } from "zustand";

interface useNewRequestStoreProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isMessage: boolean;
  activateMessage: () => void;
  deactivateMessage: () => void;
  isForm: boolean;
  activateForm: () => void;
  deactivateForm: () => void;
  resetModalContent: () => void;
}

const useNewRequestStore = create<useNewRequestStoreProps>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  isMessage: false,
  activateMessage: () => set(() => ({ isMessage: true })),
  deactivateMessage: () => set(() => ({ isMessage: false })),
  isForm: true,
  activateForm: () => set(() => ({ isForm: true })),
  deactivateForm: () => set(() => ({ isForm: false })),
  resetModalContent: () => set(() => ({ isForm: true, isMessage: false })),
}));

export default useNewRequestStore;
