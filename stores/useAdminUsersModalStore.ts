import { create } from "zustand";

interface IUseAdminUsersModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isUserBanConfirmation: boolean;
  setUserBanConfirmation: (value: boolean) => void;
  isRequestDeletionConfirmation: boolean;
  setRequestDeletionConfirmation: (value: boolean) => void;
}

const useAdminUsersModalStore = create<IUseAdminUsersModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  isUserBanConfirmation: false,
  setUserBanConfirmation: (value) => set({ isUserBanConfirmation: value }),
  isRequestDeletionConfirmation: false,
  setRequestDeletionConfirmation: (value) =>
    set({ isRequestDeletionConfirmation: value }),
}));

export default useAdminUsersModalStore;
