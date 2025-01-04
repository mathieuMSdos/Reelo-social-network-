import { StateCreator } from "zustand";
import { boolean } from 'zod';

export interface BurgerMenuSliceType {
  isOpen: boolean;
  setIsOpen: (boolean:boolean) => void;
}

export const burgerMenuSlice: StateCreator<BurgerMenuSliceType> = (set) => ({
  // Gérer l'ouverture/fermeture de menu burger
  isOpen: false,
  setIsOpen: (boolean) => set((state) => ({ isOpen: boolean })),
});
