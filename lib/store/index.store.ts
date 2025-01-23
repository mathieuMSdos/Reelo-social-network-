// index.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { burgerMenuSlice, BurgerMenuSliceType } from "./burgerMenu.slice";
import {
  createFormOnBoardingSlice,
  FormOnBoardingSliceType,
} from "./formOnboarding.slice";
import { createPostModalSlice, CreatePostModalSliceType } from "./modal.slice";
import {
  profilInfosInAppSlice,
  ProfilInfosInAppType,
} from "./profilInfosInApp.slice";
import {
  searchProfileSlice,
  SearchProfileSliceProps,
} from "./searchProfile.slice";
import {
  uploadedImageSlice,
  UploadedImageSliceType,
} from "./uploadedImage.slice";

// ------------ TYPAGE ------------
// Combinaison des slices
type Store = FormOnBoardingSliceType &
  BurgerMenuSliceType &
  ProfilInfosInAppType &
  CreatePostModalSliceType &
  UploadedImageSliceType &
  SearchProfileSliceProps; // Ajoute d'autres slices ici si besoin

export const useStore = create<Store>()(
  persist(
    devtools((...args) => ({
      ...createFormOnBoardingSlice(...args),
      ...burgerMenuSlice(...args),
      ...profilInfosInAppSlice(...args),
      ...createPostModalSlice(...args),
      ...uploadedImageSlice(...args),
      ...searchProfileSlice(...args),
    })),
    {
      name: "main-store",
    }
  )
);
