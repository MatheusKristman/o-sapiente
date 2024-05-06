import { create } from "zustand";

import { RequestWithUsersAndOffers } from "@/types";

interface IUseConfirmFinishModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  requestSelected: RequestWithUsersAndOffers | null;
  setRequestSelected: (request: RequestWithUsersAndOffers) => void;
  isForm: boolean;
  setForm: () => void;
  isSupport: boolean;
  setSupport: () => void;
}

const useConfirmFinishModalStore = create<IUseConfirmFinishModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    requestSelected: null,
    setRequestSelected: (request) => set({ requestSelected: request }),
    isForm: true,
    setForm: () => set({ isForm: true, isSupport: false }),
    isSupport: false,
    setSupport: () => set({ isForm: false, isSupport: true }),
  }),
);

export default useConfirmFinishModalStore;
