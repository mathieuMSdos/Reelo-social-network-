import { StateCreator } from "zustand";

export interface BurgerMenuSliceType {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}

export const burgerMenuSlice: StateCreator<BurgerMenuSliceType> = (set) => ({
  // Gérer l'ouverture/fermeture de menu burger
  isOpen: false,
  setIsOpen: (data) => set((state) => ({ ...state, isOpen: data })),
});
