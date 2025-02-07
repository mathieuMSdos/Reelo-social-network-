"use client";
import { X } from "lucide-react";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }:CloseButtonProps) => {

  
  return (
    
    <div
      className="text-textGrey hover:bg-inputLightBG/70 p-1 rounded-md transition-all duration-100 cursor-pointer"
      onClick={onClick}
    >
      <X />
    </div>
  );
};

export default CloseButton;
