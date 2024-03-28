import { create } from "zustand";

interface IUseConversationStore {
  isImageModalOpen: boolean;
  openImageModal: () => void;
  closeImageModal: () => void;
  isVideoModalOpen: boolean;
  openVideoModal: () => void;
  closeVideoModal: () => void;
  isMessageImageModalOpen: boolean;
  openMessageImageModal: () => void;
  closeMessageImageModal: () => void;
  messageImageUrl: string;
  setMessageImageUrl: (url: string) => void;
}

const useConversationStore = create<IUseConversationStore>((set) => ({
  isImageModalOpen: false,
  openImageModal: () => set(() => ({ isImageModalOpen: true })),
  closeImageModal: () => set(() => ({ isImageModalOpen: false })),
  isVideoModalOpen: false,
  openVideoModal: () => set(() => ({ isVideoModalOpen: true })),
  closeVideoModal: () => set(() => ({ isVideoModalOpen: false })),
  isMessageImageModalOpen: false,
  openMessageImageModal: () => set(() => ({ isMessageImageModalOpen: true })),
  closeMessageImageModal: () =>
    set(() => ({ isMessageImageModalOpen: false })),
  messageImageUrl: "",
  setMessageImageUrl: (url) => set(() => ({ messageImageUrl: url })),
}));

export default useConversationStore;
