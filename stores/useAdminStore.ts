import { RequestWithUsers, UsersWithRequests } from "@/types";
import { create } from "zustand";

interface IUseAdminStore {
  users: UsersWithRequests[] | null;
  setUsers: (users: UsersWithRequests[]) => void;
  requests: RequestWithUsers[] | null;
  setRequests: (requests: RequestWithUsers[]) => void;
}

const useAdminStore = create<IUseAdminStore>((set) => ({
  users: null,
  setUsers: (users) => set({ users }),
  requests: null,
  setRequests: (requests) => set({ requests }),
}));

export default useAdminStore;
