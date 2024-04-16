import { create } from "zustand";

import { RequestWithUsersAndOffers } from "@/types";

interface IUseFinishModalStore {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    requestSelected: RequestWithUsersAndOffers | null;
    setRequestSelected: (request: RequestWithUsersAndOffers) => void;
}

const useFinishModalStore = create<IUseFinishModalStore>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    requestSelected: null,
    setRequestSelected: (request) => set({ requestSelected: request }),
}));

export default useFinishModalStore;
