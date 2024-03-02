import { create } from "zustand";

export const useAiModel = create((set) => ({
  isOpenAiModel: false,
  closeAiModel: () => set(() => ({ isOpenAiModel: false })),
  openAiModel: () => set(() => ({ isOpenAiModel: true })),
  toggleAiModel: () =>
    set((state) => ({ isOpenAiModel: !state.isOpenAiModel })),
}));
