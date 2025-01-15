import { uploadImageAction } from "@/app/actions/crudPostActions/uploadImage.action";
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

  // astuce pour déclenché le click sur l'input file sans le voir

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // action à partir de l'upload
  const handleUpload = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.files)

    if(e.target.files) {

      const formData = new FormData()
      formData.append("image", e.target.files[0])

      // on appel le server action pour pousser l'image vers cloudinary
      const response = await uploadImageAction(formData)
      console.log(response)
    }

  }

  return (
    <button className={`${className}`} onClick={handleClick}>
      <input className="hidden" type="file" accept=".png,.jpg,.jpeg,.webp" onChange={handleUpload} ref={fileInputRef} />
      {children}
      <p>{text}</p>
    </button>
  );
};

export default UploadImageButton;
