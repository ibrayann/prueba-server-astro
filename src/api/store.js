import { create } from "zustand";

export const useStore = create((set) => ({
  id: 1,
  setId: (id) => set({ id }),
}));
