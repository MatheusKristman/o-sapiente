import { UsersWithRequests } from "@/types";
import { Request } from "@prisma/client";
import { create } from "zustand";

interface IUseAdminStore {
  users: UsersWithRequests[] | null;
  setUsers: (users: UsersWithRequests[]) => void;
  requests: Request[] | null;
  setRequests: (requests: Request[]) => void;
}

const useAdminStore = create<IUseAdminStore>((set) => ({
  users: null,
  setUsers: (users) => set({ users }),
  requests: null,
  setRequests: (requests) => set({ requests }),
}));

export default useAdminStore;
