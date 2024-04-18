import { create } from "zustand";
import { subDays } from "date-fns";

import { RequestWithUsersAndOffers } from "@/types";

type StatsType = {
    finished: number;
    current: number;
    total: number;
};

interface IUseHistoryStore {
    requests: RequestWithUsersAndOffers[];
    setRequests: (newRequests: RequestWithUsersAndOffers[]) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    filterDateNumber: number;
    setFilterDateNumber: (num: number) => void;
    filterDate: Date;
    setFilterDate: (date: Date) => void;
}

const useHistoryStore = create<IUseHistoryStore>((set) => ({
    requests: [],
    setRequests: (newRequests) => set({ requests: newRequests }),
    searchValue: "",
    setSearchValue: (value) => set({ searchValue: value }),
    filterDateNumber: 30,
    setFilterDateNumber: (num) => set({ filterDateNumber: num }),
    filterDate: new Date(subDays(new Date(), 30)),
    setFilterDate: (date) => set({ filterDate: date }),
}));

export default useHistoryStore;
