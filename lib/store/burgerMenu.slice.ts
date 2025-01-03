import { StateCreator } from "zustand";

export interface BurgerMenuSliceType {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const burgerMenuSlice: StateCreator<BurgerMenuSliceType> = (set) => ({
  // Gérer l'ouverture/fermeture de menu burger
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
});
