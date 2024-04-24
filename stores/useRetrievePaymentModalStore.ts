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
    }),
);

export default useRetrievePaymentModalStore;
