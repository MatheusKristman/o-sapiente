import { create } from "zustand";
import { RequestWithUsersAndOffers } from "../types/index";

interface IUseCurrentLessonModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  lesson: RequestWithUsersAndOffers | null;
  setLesson: (lesson: RequestWithUsersAndOffers) => void;
  isBtns: boolean;
  setBtns: () => void;
  isSupport: boolean;
  setSupport: () => void;
}

const useCurrentLessonModalStore = create<IUseCurrentLessonModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    lesson: null,
    setLesson: (lesson) => set({ lesson }),
    isBtns: true,
    setBtns: () => set({ isBtns: true, isSupport: false }),
    isSupport: false,
    setSupport: () => set({ isBtns: false, isSupport: true }),
  }),
);

export default useCurrentLessonModalStore;
