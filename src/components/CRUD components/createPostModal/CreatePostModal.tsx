"use client";

import { useStore } from "@/lib/store/index.store";
import Image from "next/image";
import CloseButton from "../../UI/CloseButton/CloseButton";
import TextArea from "../../UI/textArea/TextArea";

const CreatePostModal = () => {
  const profilImage = useStore((state) => state.image);

  return (
    // le background gradient etc;; sera à mettre ici
    <div className="fixed inset-0 w-full min-h-screen flex justify-center items-center bg-white/30 backdrop-blur-sm text-backGroundDark">
      {/* contour */}
      <div className=" h-fit  w-2/5  bg-white/20 backdrop-blur-md rounded-md border p-3">
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
              <div className="w-full overflow-auto">
                  <TextArea />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
