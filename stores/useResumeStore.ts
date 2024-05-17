import { RequestWithUsersAndOffers } from "@/types";
import { Offer } from "@prisma/client";
import { create } from "zustand";

interface IUseResumeStore {
  profilePhoto: string;
  setProfilePhoto: (url: string) => void;
  name: string;
  setName: (newName: string) => void;
  themes: string[];
  setThemes: (newThemes: string[]) => void;
  requests: RequestWithUsersAndOffers[] | null;
  setRequests: (newRequests: RequestWithUsersAndOffers[]) => void;
  plan: string;
  setPlan: (newPlan: string) => void;
  paymentRetrievable: number | null;
  setPaymentRetrievable: (value: number) => void;
  offers: Offer[];
  setOffers: (newOffer: Offer[]) => void;
  currentLesson: RequestWithUsersAndOffers[] | null;
  setCurrentLesson: (newCurrentLesson: RequestWithUsersAndOffers[]) => void;
  finishedLessons: number | null;
  setFinishedLessons: (quant: number) => void;
}

const useResumeStore = create<IUseResumeStore>((set) => ({
  profilePhoto: "",
  setProfilePhoto: (url) => set({ profilePhoto: url }),
  name: "",
  setName: (newName) => set({ name: newName }),
  themes: [],
  setThemes: (newThemes) => set({ themes: newThemes }),
  requests: null,
  setRequests: (newRequests) => set({ requests: newRequests }),
  plan: "",
  setPlan: (newPlan) => set({ plan: newPlan }),
  paymentRetrievable: null,
  setPaymentRetrievable: (value) => set({ paymentRetrievable: value }),
  offers: [],
  setOffers: (newOffer) => set({ offers: newOffer }),
  currentLesson: null,
  setCurrentLesson: (newCurrentLesson) =>
    set({ currentLesson: newCurrentLesson }),
  finishedLessons: null,
  setFinishedLessons: (quant) => set({ finishedLessons: quant }),
}));

export default useResumeStore;
