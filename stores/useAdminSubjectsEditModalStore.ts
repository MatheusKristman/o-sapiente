import { Subject } from "@prisma/client";
import { create } from "zustand";

interface IUseAdminSubjectsEditModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  subjectSelected: Subject | null;
  setSubjectSelected: (subject: Subject | null) => void;
  main: string;
  setMain: (value: string) => void;
  subs: string[];
  setSubs: (value: string[]) => void;
  addSubs: (value: string) => void;
  removeSubs: (value: string) => void;
  resetSubs: () => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

const useAdminSubjectsEditModalStore = create<IUseAdminSubjectsEditModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    subjectSelected: null,
    setSubjectSelected: (subject) => set({ subjectSelected: subject }),
    main: "",
    setMain: (value) => set({ main: value }),
    subs: [],
    setSubs: (value) => set({ subs: value }),
    addSubs: (value) =>
      set((state) => {
        const newSubs = [...state.subs, value];

        return { subs: newSubs };
      }),
    removeSubs: (value) =>
      set((state) => {
        const newSubs = state.subs.filter((sub) => sub !== value);

        return { subs: newSubs };
      }),
    resetSubs: () => set({ subs: [] }),
    isLoading: false,
    setLoading: (value) => set({ isLoading: value }),
  }),
);

export default useAdminSubjectsEditModalStore;
