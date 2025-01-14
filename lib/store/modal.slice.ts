import { StateCreator } from "zustand";

export interface CreatePostModalSliceType {
  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: (data:boolean) => void;
}

export const createPostModalSlice: StateCreator<CreatePostModalSliceType> = (
  set
) => ({
  isCreatePostModalOpen: false,
  setIsCreatePostModalOpen: (data) =>
    set((state) => ({ ...state, isCreatePostModalOpen: data })),
});
