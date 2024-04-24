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
    requests: RequestWithUsersAndOffers[];
    setRequests: (newRequests: RequestWithUsersAndOffers[]) => void;
    plan: string;
    setPlan: (newPlan: string) => void;
    paymentRetrievable: number;
    setPaymentRetrievable: (value: number) => void;
    offers: Offer[];
    setOffers: (newOffer: Offer[]) => void;
    currentLesson: RequestWithUsersAndOffers[];
    setCurrentLesson: (newCurrentLesson: RequestWithUsersAndOffers[]) => void;
    finishedLessons: number;
    setFinishedLessons: (quant: number) => void;
}

const useResumeStore = create<IUseResumeStore>((set) => ({
    profilePhoto: "",
    setProfilePhoto: (url) => set({ profilePhoto: url }),
    name: "",
    setName: (newName) => set({ name: newName }),
    themes: [],
    setThemes: (newThemes) => set({ themes: newThemes }),
    requests: [],
    setRequests: (newRequests) => set({ requests: newRequests }),
    plan: "",
    setPlan: (newPlan) => set({ plan: newPlan }),
    paymentRetrievable: 0,
    setPaymentRetrievable: (value) => set({ paymentRetrievable: value }),
    offers: [],
    setOffers: (newOffer) => set({ offers: newOffer }),
    currentLesson: [],
    setCurrentLesson: (newCurrentLesson) =>
        set({ currentLesson: newCurrentLesson }),
    finishedLessons: 0,
    setFinishedLessons: (quant) => set({ finishedLessons: quant }),
}));

export default useResumeStore;
