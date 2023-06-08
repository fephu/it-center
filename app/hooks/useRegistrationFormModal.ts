import { create } from "zustand";

interface RegistrationFormModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegistrationFormModal = create<RegistrationFormModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useRegistrationFormModal;