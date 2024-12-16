// index.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  createFormOnBoardingSlice,
  StepFormSlice,
} from "./formOnboarding.slice";

// ------------ TYPAGE ------------
// Combinaison des slices
type Store = StepFormSlice; // Ajoute d'autres slices ici si besoin

export const useStore = create<Store>()(
  devtools(
    persist(
      (...args) => ({
        ...createFormOnBoardingSlice(...args),
      }),
      {
        name: "main-store",
      }
    )
  )
);
