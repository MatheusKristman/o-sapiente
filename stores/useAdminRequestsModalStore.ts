import { create } from "zustand";

interface IUseAdminRequestsModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDeleteConfirmation: boolean;
  setDeleteConfirmation: (value: boolean) => void;
}

const useAdminRequestsModalStore = create<IUseAdminRequestsModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    isDeleteConfirmation: false,
    setDeleteConfirmation: (value) => set({ isDeleteConfirmation: value }),
  }),
);

export default useAdminRequestsModalStore;
