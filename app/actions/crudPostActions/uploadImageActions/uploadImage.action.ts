"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageAction = async (formdata: FormData) => {
  const file = formdata.get("image") as File;

  if (!file) {
    throw new Error("aucun fichier");
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        transformation: [
          // Si ratio proche de 1 (carré) -> 1080x1080
          {
            aspect_ratio: "1.0",
            width: 1080,
            height: 1080,
            crop: "fit",
            if: "ar_eq_1.0"
          },
          // Si ratio > 1 (paysage) -> 16:9
          {
            aspect_ratio: "16:9",
            width: 1200,
            crop: "fit",
            if: "ar_gt_1.0"
          },
          // Si ratio < 1 (portrait) -> format portrait
          {
            width: 1080,
            height: 1200,
            crop: "fit",
            if: "ar_lt_1.0"
          }
        ],
        quality: "auto",
        fetch_format: "auto"
      }
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