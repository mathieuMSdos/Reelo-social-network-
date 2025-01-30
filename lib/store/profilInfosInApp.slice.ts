import { StateCreator } from "zustand";

export interface ProfilInfosInAppType {
  userId: string | null;
  username: string | null;
  displayName: string | null;
  image: string | null;
  followedByCount: number;
  followingCount: number;
  updateProfile: (
    data: Partial<Omit<ProfilInfosInAppType, "updateProfile">>
  ) => void;
}

export const profilInfosInAppSlice: StateCreator<ProfilInfosInAppType> = (
  set
) => ({
  userId: null,
  username: null,
  displayName: null,
  image: null,
  followedByCount: 0,
  followingCount: 0,

  updateProfile: (data) => {
    set((state) => ({ ...state, ...data }));
  },
});
