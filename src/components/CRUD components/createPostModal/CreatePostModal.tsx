"use client";

import { createPost } from "@/app/actions/crudPostActions/post.action";
import { deleteImageOnCloudinary } from "@/app/actions/crudPostActions/uploadImageActions/deleteImageOnCloudinary.action";
import { PostSchema, PostSchemaZod } from "@/lib/schema/post.schema";
import { useStore } from "@/lib/store/index.store";
import { useMutation } from "@tanstack/react-query";
import { Clock, Image as ImageIcon, NotebookPen } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import BadgeButton from "../../UI/badgeButton/BadgeButton";
import CloseButton from "../../UI/CloseButton/CloseButton";
import PrimaryButton from "../../UI/primaryButton/PrimaryButton";
import PreviewImageUploaded from "../previewImageUploaded/PreviewImageUploaded";
import UploadImageButton from "../uploadImageButton/UploadImageButton";

// TYPE

const CreatePostModal = () => {
  // STORE ZUSTAND
  const userId = useStore((state) => state.userId);
  const profilImage = useStore((state) => state.image);
  const setIsCreatePostModalOpen = useStore(
    (state) => state.setIsCreatePostModalOpen
  );
  const imageUrl = useStore((state) => state.imageUrl);
  const imageId = useStore((state) => state.imageId);
  const resetUploadedImage = useStore((state) => state.resetUploadedImage);

  // state local
  const [postContent, setPostContent] = useState("");
  const [controlRules, setcontrolRules] = useState({ isContent: false });

  //  Gérer la fermeture de la modale si on clique à l'extérieur
  const handleClickOutsideCloseModal = async (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      //Modif du state zustand pour fermer la modal
      setIsCreatePostModalOpen(false);
      // suppression de l'image sur cloudinary
      await deleteImageOnCloudinary(imageId);
      //suppression de l'image dans le store zustand
      resetUploadedImage();
    }
  };

  // TANSTACK gestion du create post

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: (data: PostSchemaZod) => createPost(data),
    onMutate: () => {
      toast.dismiss();
      toast.loading("Posting...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Posted successfully !");
      setIsCreatePostModalOpen(false);
      resetUploadedImage()
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed !");
    },
  });

  const handleClickPost = () => {
    if (controlRules.isContent) {
      const data = {
        authorId: `${userId}`,
        content: `${postContent}`,
        imageUrl: `${imageUrl}`,
        imageId: `${imageId}`,
        published: true,
      };
      const validateData = PostSchema.parse(data);

      createPostMutation(validateData);
    }
  };

  // Controle avant le post (post non vide)
  useEffect(() => {
    setcontrolRules({
      isContent: postContent !== "",
    });
  }, [postContent]);

  // GESTION DES TOUCHES CLAVIER
  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCreatePostModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleCloseModal);

    return () => {
      window.removeEventListener("keydown", handleCloseModal);
    };
  }, [setIsCreatePostModalOpen]);

  return (
    // le background gradient etc sera à mettre ici
    <div
      className="fixed inset-0 w-full min-h-screen flex justify-center items-center bg-white/30 backdrop-blur-sm text-textBlack "
      onClick={handleClickOutsideCloseModal}
    >
      {/* contour */}
      <div className=" h-fit w-2/5 bg-white/20 backdrop-blur-md rounded-md border p-3 ">
        {/* card */}
        <div className=" h-fit w-full flex flex-col gap-4 items-center px-4 py-4 bg-white border rounded-md ">
          {/* close button */}
          <div className="flex justify-end w-full   ">
            <CloseButton onClick={() => setIsCreatePostModalOpen(false)} />
          </div>
          {/* photo profil + input */}
          <div className="w-full">
            {/* photo profil */}
            <div className="flex fleco h-auto w-full items-start gap-4 ">
              <Image
                className="rounded-full object-cover"
                src={profilImage || "/default_avatar/default_avatar.png"}
                height={50}
                width={50}
                alt="profile_image"
              />
              <div className="w-full flex flex-col gap-2 overflow-auto">
                {/* text area */}
                <TextareaAutosize
                  className=" resize-none border-none w-full text-md focus:outline-none py-2 px-4 bg-inputLightBG rounded-md"
                  maxLength={280}
                  autoFocus
                  value={postContent}
                  onChange={(e) => {
                    setPostContent(e.target.value);
                  }}
                ></TextareaAutosize>

                {/* badges */}
                <ul className="flex justify-start gap-3">
                  <li>
                    <BadgeButton text="Schedule">
                      <Clock size={18} />
                    </BadgeButton>
                  </li>
                  <li>
                    <UploadImageButton text="Image">
                      <ImageIcon size={18} />
                    </UploadImageButton>
                  </li>
                </ul>
                {/* Preview uploaded image */}
                <div className="w-full flex justify-start items-center">
                  {imageUrl && imageId ? (
                    <PreviewImageUploaded
                      imageUrl={imageUrl}
                      imageId={imageId}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" h-auto w-full flex items-center justify-end">
            <PrimaryButton
              className=" font-semibold"
              text="Post"
              disabled={isPending || !controlRules.isContent}
              onClick={() => handleClickPost()}
            >
              <NotebookPen size={15} strokeWidth={2.5} />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
