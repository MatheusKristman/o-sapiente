import { create } from "zustand";

interface useUserInter {
  user:
    | {
        address: string;
        addressNumber: string;
        birth: string;
        cep: string;
        city: string;
        complement: string;
        district: string;
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        password: string;
        profilePhoto: string;
        state: string;
        tel: string;
      }
    | {};
  setUser: (userData: { user: useUserInter["user"] }) => void;
}

const useUserStore = create<useUserInter>((set) => ({
  user: {},
  setUser: (userData) => set(() => ({ user: userData })),
}));

export default useUserStore;
