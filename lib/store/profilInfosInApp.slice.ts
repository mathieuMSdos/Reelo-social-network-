import { StateCreator } from "zustand";

export interface ProfilInfosInAppType {
  username: string | null;
  displayName: string | null;
  image: string | null;
  updateProfile: (data: Partial<Omit<ProfilInfosInAppType, "updateProfile">>) => void;
}

export const profilInfosInAppSlice: StateCreator<ProfilInfosInAppType> = (
  set
) => ({
    username: null,
    displayName: null,
    image: null,

  updateProfile: (data) => {
    set((state) => ({ ...state, ...data }));
  },
});
