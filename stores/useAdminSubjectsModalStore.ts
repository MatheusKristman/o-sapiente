import { create } from "zustand";

interface IUseAdminSubjectsModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  main: string;
  setMain: (value: string) => void;
  subs: string[];
  addSubs: (value: string) => void;
  removeSubs: (value: string) => void;
  resetSubs: () => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

const useAdminSubjectsModalStore = create<IUseAdminSubjectsModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    main: "",
    setMain: (value) => set({ main: value }),
    subs: [],
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

export default useAdminSubjectsModalStore;
