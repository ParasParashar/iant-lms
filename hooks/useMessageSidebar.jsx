import { create } from "zustand";
export const useConRefresh = create((set) => ({
  isRefresh: false,
  toggleRefresh: () => set((state) => ({ isRefresh: !state.isRefresh })),
}));

export const useGroupRefresh = create((set) => ({
  isGRefresh: false,
  toggleGRefresh: () => set((state) => ({ isGRefresh: !state.isGRefresh })),
}));

export const useGroupSideOpen = create((set) => ({
  isOpen: false,
  closeSide: () => set(() => ({ isOpen: false })),
  openSide: () => set(() => ({ isOpen: true })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
