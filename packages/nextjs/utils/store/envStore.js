import { create } from "zustand";

export default create(set => ({
  selectedGame: undefined,
  setGame: v => set({ selectedGame: v }),
}));
