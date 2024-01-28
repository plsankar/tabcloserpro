import { create } from "zustand";

type AppStore = {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
};

export const useAppStore = create<AppStore>()((set) => ({
    isMenuOpen: false,
    setIsMenuOpen: (value) => set((state) => ({ ...state, isMenuOpen: value })),
}));
