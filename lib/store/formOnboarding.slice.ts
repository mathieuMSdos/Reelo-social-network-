import { StateCreator } from "zustand";

// ------------Typage de la slice ------------
export interface FormOnBoardingSliceType {
  step: number;
  newUserName: string;
  newDisplayName: string;

  setNextStep: () => void;
  setPreviousStep: () => void;
  setResetStep: () => void; // Nouvelle fonction pour reset
  setNewUsername: (data: string) => void;
  setNewDisplayName: (data: string) => void;
}

// STATE pour stocker les éléments nécessaire au multi steps form
export const createFormOnBoardingSlice: StateCreator<
  FormOnBoardingSliceType
> = (set) => ({
  // Gestion des étapes
  step: 1,
  setNextStep: () => set((state) => ({ step: state.step + 1 })),
  setPreviousStep: () =>
  set((state) => ({ step: Math.max(0, state.step - 1) })),
  setResetStep: () => set(() => ({ step: 1 })),

  // Gestion de la data venant de form
  newUserName: "",
  newDisplayName: "",
  setNewUsername: (data: string) => set(() => ({ newUserName: data })),
  setNewDisplayName: (data: string) => set(() => ({ newDisplayName: data })),
});
