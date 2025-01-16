import { uploadImageAction } from "@/app/actions/crudPostActions/uploadImageActions/uploadImage.action";
import { useStore } from "@/lib/store/index.store";
import React, { useRef } from "react";

interface UploadImageButtonProps {
  className?: string;
  text?: string;
  children: React.ReactNode;
}

const UploadImageButton = ({
  className,
  text,
  children,
}: UploadImageButtonProps) => {
  //ZUSTAND state
  const setUploadedImage = useStore((state) => state.setUploadedImage);

  // astuce pour déclenché le click sur l'input file sans le voir (hidden)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // action à partir de l'upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      // on appel le server action pour pousser l'image vers cloudinary
      const response = await uploadImageAction(formData);

      // mise à jour du store ZUSTAND pour stocker les infos sur l'image en cours
      setUploadedImage(response.imageUrl, response.imageId);
    }
  };

  return (
    <button
      className={`${className} flex items-center justify-center gap-1 border rounded-full border-purpleBtn text-purpleBtn font-semibold px-3 py-1 text-xs`}
      onClick={handleClick}
    >
      <input
        className="hidden"
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        onChange={handleUpload}
        ref={fileInputRef}
      />
      {children}
      <p>{text}</p>
    </button>
  );
};

export default UploadImageButton;
