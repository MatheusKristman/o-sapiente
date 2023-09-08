import { create } from "zustand";

interface useStudentModalInter {
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
  theme: string;
  setTheme: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  isBackBtnActive: boolean;
  activateBackBtn: () => void;
  deactivateBackBtn: () => void;
}

const useStudentModalStore = create<useStudentModalInter>((set) => ({
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
  theme: "",
  setTheme: (value) => set(() => ({ theme: value })),
  message: "",
  setMessage: (value) => set(() => ({ message: value })),
  isBackBtnActive: false,
  activateBackBtn: () => set(() => ({ isBackBtnActive: true })),
  deactivateBackBtn: () => set(() => ({ isBackBtnActive: false })),
}));

export default useStudentModalStore;
