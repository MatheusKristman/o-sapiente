import { create } from "zustand";

interface useProfessorModalInter {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isLogin: boolean;
  setToLogin: () => void;
  setToNotLogin: () => void;
  forgotPassword: boolean;
  setToRecoverPassword: () => void;
  setToNotRecoverPassword: () => void;
  isRecoverPasswordMessage: boolean;
  setToRecoverPasswordMessage: () => void;
  setToNotRecoverPasswordMessage: () => void;
}

const useProfessorModalStore = create<useProfessorModalInter>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  isLogin: false,
  setToLogin: () => set({ isLogin: true }),
  setToNotLogin: () => set({ isLogin: false }),
  forgotPassword: false,
  setToRecoverPassword: () => set({ forgotPassword: true }),
  setToNotRecoverPassword: () => set({ forgotPassword: false }),
  isRecoverPasswordMessage: false,
  setToRecoverPasswordMessage: () => set({ isRecoverPasswordMessage: true }),
  setToNotRecoverPasswordMessage: () =>
    set({ isRecoverPasswordMessage: false }),
}));

export default useProfessorModalStore;
