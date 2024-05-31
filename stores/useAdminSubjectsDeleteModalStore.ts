import { Subject } from "@prisma/client";
import { create } from "zustand";

interface IUseAdminSubjectsDeleteModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  subjectId: string;
  setSubjectId: (id: string) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

const useAdminSubjectsDeleteModalStore =
  create<IUseAdminSubjectsDeleteModalStore>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    subjectId: "",
    setSubjectId: (id) => set({ subjectId: id }),
    isLoading: false,
    setLoading: (value) => set({ isLoading: value }),
  }));

export default useAdminSubjectsDeleteModalStore;
