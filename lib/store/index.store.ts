// index.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { burgerMenuSlice, BurgerMenuSliceType } from "./burgerMenu.slice";
import {
  createFormOnBoardingSlice,
  FormOnBoardingSliceType,
} from "./formOnboarding.slice";

// ------------ TYPAGE ------------
// Combinaison des slices
type Store = FormOnBoardingSliceType & BurgerMenuSliceType; // Ajoute d'autres slices ici si besoin

export const useStore = create<Store>()(
  devtools(
    persist(
      (...args) => ({
        ...createFormOnBoardingSlice(...args),
        ...burgerMenuSlice(...args),
      }),
      {
        name: "main-store",
      }
    )
  )
);
