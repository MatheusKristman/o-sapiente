import { create } from "zustand";

interface useHeaderInter {
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  accountType: string | null;
  setAccountType: (value: string) => void;
  userId: string;
  setUserId: (id: string) => void;
}

const useHeaderStore = create<useHeaderInter>((set) => ({
  isMobileMenuOpen: false,
  openMobileMenu: () => set(() => ({ isMobileMenuOpen: true })),
  closeMobileMenu: () => set(() => ({ isMobileMenuOpen: false })),
  accountType: null,
  setAccountType: (type) => set(() => ({ accountType: type })),
  userId: "",
  setUserId: (id) => set(() => ({ userId: id })),
}));

export default useHeaderStore;
