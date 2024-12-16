// form.slice.ts

import { StateCreator } from "zustand";

// ------------Typage de la slice ------------
export interface StepFormSlice {
  step: number;
  username: string;
  setNextStep: () => void;
  setPreviousStep: () => void;
}

// STATE pour stocker les étapes d'avancement du formulaire

export const createFormOnBoardingSlice: StateCreator<StepFormSlice> = (
  set
) => ({
  // Gestion des étapes
  step: 1,
  setNextStep: () => set((state) => ({ step: state.step + 1 })),
  setPreviousStep: () =>
    set((state) => ({ step: Math.max(0, state.step - 1) })),

  // Gestion de la data venant de form
  username: "",
  setUsername: (data: string) => set((state) => ({ username: data })),
});
