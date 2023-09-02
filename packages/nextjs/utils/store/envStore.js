import { create } from "zustand";

export default create(set => ({
  selectedGame: undefined,
  setGame: v => set({ selectedGame: v }),

  characterTBAArr: undefined,
  setCharacterTBAArr: v => set({ characterTBAArr: v }),

  characterTokenURIArr: [],
  setCharacterTokenURIArr: v => set({ characterTokenURIArr: v }),

  currentGameInfo: undefined,
  setCurrentGameInfo: v => set({ currentGameInfo: v }),
  transferItem: undefined,
  setTransferItem: v => set({ transferItem: v }),
  clear: () =>
    set({
      selectedGame: undefined,
      characterTBAArr: undefined,
      characterTokenURIArr: [],
      currentGameInfo: undefined,
      transferItem: undefined,
    }),
}));
