import { create } from "zustand";

interface useLoginModalInter {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isRegister: boolean;
  setToRegister: () => void;
  setToNotRegister: () => void;
  isRequest: boolean;
  setToRequest: () => void;
  setToNotRequest: () => void;
  isLogin: boolean;
  setToLogin: () => void;
  setToNotLogin: () => void;
  forgotPassword: boolean;
  setToRecoverPassword: () => void;
  setToNotRecoverPassword: () => void;
  isRecoverPasswordMessage: boolean;
  setToRecoverPasswordMessage: () => void;
  setToNotRecoverPasswordMessage: () => void;
  subject: string;
  setSubject: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  isBackBtnActive: boolean;
  activateBackBtn: () => void;
  deactivateBackBtn: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const useLoginModalStore = create<useLoginModalInter>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  isRegister: false,
  setToRegister: () => set(() => ({ isRegister: true })),
  setToNotRegister: () => set(() => ({ isRegister: false })),
  isRequest: false,
  setToRequest: () => set(() => ({ isRequest: true })),
  setToNotRequest: () => set(() => ({ isRequest: false })),
  isLogin: false,
  setToLogin: () => set(() => ({ isLogin: true })),
  setToNotLogin: () => set(() => ({ isLogin: false })),
  forgotPassword: false,
  setToRecoverPassword: () => set(() => ({ forgotPassword: true })),
  setToNotRecoverPassword: () => set(() => ({ forgotPassword: false })),
  isRecoverPasswordMessage: false,
  setToRecoverPasswordMessage: () => set(() => ({ isRecoverPasswordMessage: true })),
  setToNotRecoverPasswordMessage: () => set(() => ({ isRecoverPasswordMessage: false })),
  subject: "",
  setSubject: (value) => set(() => ({ subject: value })),
  description: "",
  setDescription: (value) => set(() => ({ description: value })),
  isBackBtnActive: false,
  activateBackBtn: () => set(() => ({ isBackBtnActive: true })),
  deactivateBackBtn: () => set(() => ({ isBackBtnActive: false })),
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
  isSubmitting: false,
  setIsSubmitting: (value) => set({ isSubmitting: value }),
}));

export default useLoginModalStore;
