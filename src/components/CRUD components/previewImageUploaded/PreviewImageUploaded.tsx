import { deleteImageOnCloudinary } from "@/app/actions/crudPostActions/uploadImageActions/deleteImageOnCloudinary.action";
import Image from "next/image";
import CloseButton from "../../UI/CloseButton/CloseButton";

interface PreviewImageUploadedProps {
  imageUrl: string;
  imageId: string;
  onImageDelete: () => void;
}

const PreviewImageUploaded = ({
  imageUrl,
  imageId,
  onImageDelete,
}: PreviewImageUploadedProps) => {
  const handleDeleteImageOnCloudinary = async () => {
    await deleteImageOnCloudinary(imageId);
    onImageDelete();
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
      <button className="absolute top-0 right-0 text-slate-50">
        <CloseButton onClick={handleDeleteImageOnCloudinary} />
      </button>
    </div>
  );
};

export default PreviewImageUploaded;