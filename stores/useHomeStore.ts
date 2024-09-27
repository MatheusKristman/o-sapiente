import { RequestWithUsersAndOffers } from "@/types";
import { Course } from "@prisma/client";
import { create } from "zustand";

interface IUseHomeStore {
  recentsRequests: RequestWithUsersAndOffers[];
  setRecentsRequests: (requests: RequestWithUsersAndOffers[]) => void;
  recentsCourses: Course[];
  setRecentsCourses: (courses: Course[]) => void;
}

const useHomeStore = create<IUseHomeStore>((set) => ({
  recentsRequests: [],
  setRecentsRequests: (requests) => set({ recentsRequests: requests }),
  recentsCourses: [],
  setRecentsCourses: (courses) => set({ recentsCourses: courses }),
}));

export default useHomeStore;
