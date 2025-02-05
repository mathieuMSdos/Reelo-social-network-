import { UserPublicDataType } from "@/src/types/user.types";
import { StateCreator } from "zustand";

export interface SearchProfileSliceProps {
  resultProfile: UserPublicDataType;
  updateResultProfile: (
    data: Partial<SearchProfileSliceProps["resultProfile"]>
  ) => void;
}

export const searchProfileSlice: StateCreator<SearchProfileSliceProps> = (
  set
) => ({
  resultProfile: {
    id: "",
    name: null,
    image: null,
    username: null,
    displayName: "",
    createdAt: new Date(),
    posts: [],
    followedBy: [],
    following: [],
    followedByCount: 0,
    followingCount: 0,
  },

  updateResultProfile: (data) =>
    set((state) => ({
      resultProfile: { ...state.resultProfile, ...data },
    })),
});
