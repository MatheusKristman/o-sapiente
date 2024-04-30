import { create } from "zustand";

interface IUseRecoverPasswordModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isForm: boolean;
  setForm: () => void;
  unsetForm: () => void;
  isMessage: boolean;
  setMessage: () => void;
  unsetMessage: () => void;
  idUser: string;
  setIdUser: (id: string) => void;
}

const useRecoverPasswordModalStore = create<IUseRecoverPasswordModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    isForm: false,
    setForm: () => set({ isForm: true }),
    unsetForm: () => set({ isForm: false }),
    isMessage: false,
    setMessage: () => set({ isMessage: true }),
    unsetMessage: () => set({ isMessage: false }),
    idUser: "",
    setIdUser: (id) => set({ idUser: id }),
  }),
);

export default useRecoverPasswordModalStore;
