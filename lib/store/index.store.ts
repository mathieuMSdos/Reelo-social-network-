// index.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { burgerMenuSlice, BurgerMenuSliceType } from "./burgerMenu.slice";
import {
  createFormOnBoardingSlice,
  FormOnBoardingSliceType,
} from "./formOnboarding.slice";
import {
  profilInfosInAppSlice,
  ProfilInfosInAppType,
} from "./profilInfosInApp.slice";
import { createPostModalSlice, CreatePostModalSliceType } from "./modal.slice";

// ------------ TYPAGE ------------
// Combinaison des slices
type Store = FormOnBoardingSliceType &
  BurgerMenuSliceType &
  ProfilInfosInAppType & CreatePostModalSliceType ; // Ajoute d'autres slices ici si besoin

export const useStore = create<Store>()(
  persist(
    devtools(
      (...args) => ({
        ...createFormOnBoardingSlice(...args),
        ...burgerMenuSlice(...args),
        ...profilInfosInAppSlice(...args),
        ...createPostModalSlice(...args),
      })
    ),
    {
      name: "main-store",
    }
  )
);
