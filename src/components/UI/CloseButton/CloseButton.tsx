"use client";
import { X } from "lucide-react";

const CloseButton = () => {
  return (
    <div className="text-textGrey hover:bg-inputLightBG p-1 rounded-md transition-all duration-100 cursor-pointer">
      <X />
    </div>
  );
};

export default CloseButton;
