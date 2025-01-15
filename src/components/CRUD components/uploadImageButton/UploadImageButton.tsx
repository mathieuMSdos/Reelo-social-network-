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
  const handleUpload = ()=>{
    console.log("hello")
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
