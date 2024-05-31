import { RequestWithUsers, UsersWithRequests } from "@/types";
import { Subject } from "@prisma/client";
import { create } from "zustand";

interface IUseAdminStore {
  users: UsersWithRequests[] | null;
  setUsers: (users: UsersWithRequests[]) => void;
  requests: RequestWithUsers[] | null;
  setRequests: (requests: RequestWithUsers[]) => void;
  subjects: Subject[] | null;
  setSubjects: (subjects: Subject[]) => void;
}

const useAdminStore = create<IUseAdminStore>((set) => ({
  users: null,
  setUsers: (users) => set({ users }),
  requests: null,
  setRequests: (requests) => set({ requests }),
  subjects: null,
  setSubjects: (subjects) => set({ subjects }),
}));

export default useAdminStore;
