"use client";
import { useStore } from "@/lib/store/index.store";
import { X } from "lucide-react";

const CloseButton = () => {
   const setIsCreatePostModalOpen = useStore(
      (state) => state.setIsCreatePostModalOpen
    );
  return (
    <div className="text-textGrey hover:bg-inputLightBG p-1 rounded-md transition-all duration-100 cursor-pointer" onClick={()=>setIsCreatePostModalOpen(false)}>
      <X />
    </div>
  );
};

export default CloseButton;
