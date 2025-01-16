"use server";
import { v2 as cloudinary } from "cloudinary";

//On utilise Coudinary comme service de stockage image

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload image

export const uploadImageAction = async (formdata: FormData) => {
  const file = formdata.get("image") as File;

  if (!file) {
    throw new Error("aucun fichier");
  }

  try {
    // Conversion du fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload vers Cloudinary avec le format correct
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`
    );
    return {
      success: true,
      imageUrl: result.secure_url,
      imageId: result.public_id,
    };
  } catch (error) {
    console.error("Erreur d'upload:", error);
    throw new Error("Échec de l'upload de l'image");
  }
};

