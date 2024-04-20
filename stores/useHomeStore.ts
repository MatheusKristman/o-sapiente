import { RequestWithUsersAndOffers } from "@/types";
import { create } from "zustand";

interface IUseHomeStore {
    recentsRequests: RequestWithUsersAndOffers[];
    setRecentsRequests: (requests: RequestWithUsersAndOffers[]) => void;
}

const useHomeStore = create<IUseHomeStore>((set) => ({
    recentsRequests: [],
    setRecentsRequests: (requests) => set({ recentsRequests: requests }),
}));

export default useHomeStore;
