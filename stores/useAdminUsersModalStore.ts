import { UsersWithRequests } from "@/types";
import { create } from "zustand";

interface IUseAdminUsersModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isUserBanConfirmation: boolean;
  setUserBanConfirmation: (value: boolean) => void;
  isRequestDeletionConfirmation: boolean;
  setRequestDeletionConfirmation: (value: boolean) => void;
  userSelected: UsersWithRequests | null;
  setUserSelected: (user: UsersWithRequests | null) => void;
  requestId: string | null;
  setRequestId: (id: string | null) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
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
  userSelected: null,
  setUserSelected: (user) => set({ userSelected: user }),
  requestId: null,
  setRequestId: (id) => set({ requestId: id }),
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));

export default useAdminUsersModalStore;
