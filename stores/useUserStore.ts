import { create } from "zustand";

interface useUserInter {
    userId: string;
    setUserId: (id: string) => void;
    accountType: string | null;
    setAccountType: (value: string) => void;
    profilePhoto: string;
    setProfilePhoto: (url: string) => void;
}

const useUserStore = create<useUserInter>((set) => ({
    userId: "",
    setUserId: (id) => set(() => ({ userId: id })),
    accountType: null,
    setAccountType: (type) => set(() => ({ accountType: type })),
    profilePhoto: "",
    setProfilePhoto: (url) => set({ profilePhoto: url }),
}));

export default useUserStore;
