import { RequestWithUsers } from "@/types";
import { create } from "zustand";

interface IUseAdminRequestsModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDeleteConfirmation: boolean;
  setDeleteConfirmation: (value: boolean) => void;
  requestSelected: RequestWithUsers | null;
  setRequestSelected: (request: RequestWithUsers | null) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  requestId: string | null;
  setRequestId: (id: string | null) => void;
}

const useAdminRequestsModalStore = create<IUseAdminRequestsModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    isDeleteConfirmation: false,
    setDeleteConfirmation: (value) => set({ isDeleteConfirmation: value }),
    requestSelected: null,
    setRequestSelected: (request) => set({ requestSelected: request }),
    isLoading: false,
    setLoading: (value) => set({ isLoading: value }),
    requestId: null,
    setRequestId: (id) =>
      set({
        requestId: id,
      }),
  }),
);

export default useAdminRequestsModalStore;
