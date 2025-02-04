"use server";
import { v2 as cloudinary } from "cloudinary";

//On utilise Coudinary comme service de stockage image

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImageOnCloudinary = async (imageId: string) => {
  try {
    await cloudinary.uploader.destroy(imageId);
    return {
      success: true,
      imageId: imageId,
    };
  } catch (error) {
    throw new Error("failed", { cause: error });
  }
};
