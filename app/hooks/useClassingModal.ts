import { create } from "zustand";

interface ClassingModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useClassingModal = create<ClassingModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useClassingModal;