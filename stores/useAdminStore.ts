import { RequestWithUsers, UsersWithRequests } from "@/types";
import { Subject, Course } from "@prisma/client";
import { create } from "zustand";

interface IUseAdminStore {
  users: UsersWithRequests[] | null;
  setUsers: (users: UsersWithRequests[]) => void;
  requests: RequestWithUsers[] | null;
  setRequests: (requests: RequestWithUsers[]) => void;
  subjects: Subject[] | null;
  setSubjects: (subjects: Subject[]) => void;
  courses: Course[] | null;
  setCourses: (courses: Course[]) => void;
}

const useAdminStore = create<IUseAdminStore>((set) => ({
  users: null,
  setUsers: (users) => set({ users }),
  requests: null,
  setRequests: (requests) => set({ requests }),
  subjects: null,
  setSubjects: (subjects) => set({ subjects }),
  courses: null,
  setCourses: (courses) => set({ courses }),
}));

export default useAdminStore;
