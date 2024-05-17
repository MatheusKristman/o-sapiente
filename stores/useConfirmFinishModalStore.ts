import { create } from "zustand";

import { RequestWithUsersAndOffers } from "@/types";

interface IUseConfirmFinishModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  requestSelected: RequestWithUsersAndOffers | null;
  setRequestSelected: (request: RequestWithUsersAndOffers | null) => void;
}

const useConfirmFinishModalStore = create<IUseConfirmFinishModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    requestSelected: null,
    setRequestSelected: (request) => set({ requestSelected: request }),
  })
);

export default useConfirmFinishModalStore;
