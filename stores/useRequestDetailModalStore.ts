import { create } from "zustand";

interface useRequestDetailsModalStoreProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  requestId: string;
  setRequestId: (id: string) => void;
  studentId: string;
  setStudentId: (id: string) => void;
  studentImage: string | null;
  setStudentImage: (url: string | null) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  studentCel: string | null;
  setStudentCel: (cel: string | null) => void;
  subject: string;
  setSubject: (sub: string) => void;
  message: string;
  setMessage: (msg: string) => void;
  reset: () => void;
}

const useRequestDetailsModalStore = create<useRequestDetailsModalStoreProps>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set(() => ({ isModalOpen: true })),
    closeModal: () => set(() => ({ isModalOpen: false })),
    requestId: "",
    setRequestId: (id) => set({ requestId: id }),
    studentId: "",
    setStudentId: (id) => set({ studentId: id }),
    studentImage: null,
    setStudentImage: (url) => set({ studentImage: url }),
    studentName: "",
    setStudentName: (name) => set({ studentName: name }),
    studentCel: "",
    setStudentCel: (cel) => set({ studentCel: cel }),
    subject: "",
    setSubject: (sub) => set({ subject: sub }),
    message: "",
    setMessage: (msg) => set({ message: msg }),
    reset: () =>
      set((state) => ({
        ...state,
        requestId: "",
        studentImage: null,
        studentName: "",
        subject: "",
        message: "",
      })),
  }),
);

export default useRequestDetailsModalStore;
