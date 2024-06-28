import { create } from "zustand";

export type Filter = {
    pinned: boolean;
    currentWindow: boolean;
    sort: "name" | "count";
};

type AppStore = {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
    filter: Filter;
    setFilter: (filter: Filter) => void;
};

export const useAppStore = create<AppStore>()((set) => ({
    isMenuOpen: false,
    setIsMenuOpen: (value) => set((state) => ({ ...state, isMenuOpen: value })),
    filter: {
        pinned: false,
        currentWindow: true,
        sort: "name",
    },
    setFilter: (filter) => set((state) => ({ ...state, filter })),
}));
