import { deleteImageOnCloudinary } from "@/app/actions/crudPostActions/uploadImageActions/deleteImageOnCloudinary.action";
import { useStore } from "@/lib/store/index.store";
import Image from "next/image";
import CloseButton from "../../UI/CloseButton/CloseButton";

interface PreviewImageUploadedProps {
  imageUrl: string;
  imageId: string;
}

const PreviewImageUploaded = ({
  imageUrl,
  imageId,
}: PreviewImageUploadedProps) => {
  const resetUploadedImage = useStore((state) => state.resetUploadedImage);

  // Gestion de la suppression du preview (ui + sur cloudinary)
  const handleDeleteImageOnCloudinary = async () => {
    // suppression de l'image sur cloudinary
    deleteImageOnCloudinary(imageId);
    //suppression de l'image dans le store zustand
    resetUploadedImage();
  };

  return (
    <div className="relative">
      <Image
        className="rounded-md object-cover border"
        src={imageUrl}
        height={200}
        width={200}
        alt="preview_post_image"
      />
      <div className="absolute top-0 right-0 text-slate-50">
        <CloseButton onClick={handleDeleteImageOnCloudinary} />
      </div>
    </div>
  );
};

export default PreviewImageUploaded;
