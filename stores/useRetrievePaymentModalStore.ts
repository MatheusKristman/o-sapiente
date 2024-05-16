import { create } from "zustand";

interface IUseRetrievePaymentModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isForm: boolean;
  setIsForm: (value: boolean) => void;
  isMessage: boolean;
  setIsMessage: (value: boolean) => void;
  pixCode: string | null;
  setPixCode: (pix: string | null) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const useRetrievePaymentModalStore = create<IUseRetrievePaymentModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    isForm: true,
    setIsForm: (value) => set({ isForm: value }),
    isMessage: false,
    setIsMessage: (value) => set({ isMessage: value }),
    pixCode: null,
    setPixCode: (pix) => set({ pixCode: pix }),
    isEditing: false,
    setIsEditing: (value) => set({ isEditing: value }),
    isSubmitting: false,
    setIsSubmitting: (value) => set({ isSubmitting: value }),
  })
);

export default useRetrievePaymentModalStore;
