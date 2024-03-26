import { create } from "zustand";

interface IUseConversationStore {
  isImageModalOpen: boolean;
  openImageModal: () => void;
  closeImageModal: () => void;
  isVideoModalOpen: boolean;
  openVideoModal: () => void;
  closeVideoModal: () => void;
}

const useConversationStore = create<IUseConversationStore>((set) => ({
  isImageModalOpen: false,
  openImageModal: () => set(() => ({ isImageModalOpen: true })),
  closeImageModal: () => set(() => ({ isImageModalOpen: false })),
  isVideoModalOpen: false,
  openVideoModal: () => set(() => ({ isVideoModalOpen: true })),
  closeVideoModal: () => set(() => ({ isVideoModalOpen: false })),
}));

export default useConversationStore;
