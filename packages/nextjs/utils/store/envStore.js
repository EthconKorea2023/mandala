import { create } from "zustand";

export default create(set => ({
  selectedGame: undefined,
  setGame: v => set({ selectedGame: v }),

  characterTBAArr: [],
  setCharacterTBAArr: v => set({ characterTBAArr: v }),

  characterTokenURIArr: [],
  setCharacterTokenURIArr: v => set({ characterTokenURIArr: v }),
}));
