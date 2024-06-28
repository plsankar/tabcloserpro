import { create } from "zustand";

export type Filter = {
    pinned: boolean;
    currentWindow: boolean;
    sort: "name" | "count";
    search: string;
};

type AppStore = {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
    filter: Filter;
    setFilter: (filter: Partial<Filter>) => void;
};

export const useAppStore = create<AppStore>()((set) => ({
    isMenuOpen: false,
    setIsMenuOpen: (value) => set((state) => ({ ...state, isMenuOpen: value })),
    filter: {
        pinned: false,
        currentWindow: true,
        sort: "name",
        search: "",
    },
    setFilter: (filter) => set((state) => ({ ...state, filter: { ...state.filter, ...filter } })),
}));
