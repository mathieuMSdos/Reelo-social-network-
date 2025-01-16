import { StateCreator } from "zustand";

export interface UploadedImageSliceType {
  imageUrl: string;
  imageId: string;
  setUploadedImage: (imageUrl: string, imageId: string) => void;
  resetUploadedImage: () => void;
}

export const uploadedImageSlice: StateCreator<UploadedImageSliceType> = (
  set
) => ({
  imageUrl: "",
  imageId: "",

  setUploadedImage: (imageUrl, imageId) => set({ imageUrl, imageId }),

  resetUploadedImage: () => set({ imageUrl: "", imageId: "" }),
});

// faire le state zustand
// mettre à jour le fonctionnement de preview component, close button
