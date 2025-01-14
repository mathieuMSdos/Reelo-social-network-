"use client";

import { useStore } from "@/lib/store/index.store";
import { Clock, Image as ImageIcon, NotebookPen } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import BadgeButton from "../../UI/badgeButton/BadgeButton";
import CloseButton from "../../UI/CloseButton/CloseButton";
import PrimaryButton from "../../UI/primaryButton/PrimaryButton";
import TextArea from "../../UI/textArea/TextArea";

const CreatePostModal = () => {
  // STORE ZUSTAND
  const profilImage = useStore((state) => state.image);
  const setIsCreatePostModalOpen = useStore(
    (state) => state.setIsCreatePostModalOpen
  );

//  Gérer la fermeture de la modale si on clique à l'extérieur
const handleBackclick = (e)=> {
if(e.target === e.currentTarget) {
  setIsCreatePostModalOpen(false)
}
}

  const badgeContent = [
    { icon: <ImageIcon size={18} />, text: "Image" },
    { icon: <Clock size={18} />, text: "Schedule" },
  ];

  return (
    // le background gradient etc;; sera à mettre ici
    <div className="fixed inset-0 w-full min-h-screen flex justify-center items-center bg-white/30 backdrop-blur-sm text-textBlack " onClick={handleBackclick}>
      {/* contour */}
      <div
        className=" h-fit w-2/5 bg-white/20 backdrop-blur-md rounded-md border p-3 "
      >
        {/* card */}
        <div className=" h-fit w-full flex flex-col gap-4 items-center px-4 py-4 bg-white border rounded-md ">
          {/* close button */}
          <div className="flex justify-end w-full   ">
            <CloseButton />
          </div>
          {/* photo + input */}
          <div className="w-full">
            {/* photo */}
            <div className="flex h-auto w-full items-start gap-4 ">
              <Image
                className="rounded-full object-cover"
                src={profilImage || "/default_avatar/default_avatar.png"}
                height={50}
                width={50}
                alt="profile_image"
              />
              <div className="w-full flex flex-col gap-2 overflow-auto">
                {/* text area */}
                <TextArea />
                {/* badges */}

                <ul className="flex justify-start gap-2">
                  {badgeContent.map((item) => (
                    <li key={item.text}>
                      <BadgeButton text={item.text}>{item.icon}</BadgeButton>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className=" h-auto w-full flex items-center justify-end">
            <PrimaryButton className=" font-semibold" text="Post">
              <NotebookPen size={15} strokeWidth={2.5} />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
