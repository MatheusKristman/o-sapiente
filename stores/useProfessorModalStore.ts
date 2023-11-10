import { create } from "zustand";

interface useProfessorModalInter {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useProfessorModalStore = create<useProfessorModalInter>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
}));

export default useProfessorModalStore;
