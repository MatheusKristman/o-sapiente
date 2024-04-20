import { create } from "zustand";

interface useUserInter {
    userId: string;
    setUserId: (id: string) => void;
    accountType: string | null;
    setAccountType: (value: string) => void;
}

const useUserStore = create<useUserInter>((set) => ({
    userId: "",
    setUserId: (id) => set(() => ({ userId: id })),
    accountType: null,
    setAccountType: (type) => set(() => ({ accountType: type })),
}));

export default useUserStore;
