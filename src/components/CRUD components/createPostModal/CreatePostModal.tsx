"use client";

import { createPost } from "@/app/actions/crudPostActions/post.action";
import { deleteImageOnCloudinary } from "@/app/actions/crudPostActions/uploadImageActions/deleteImageOnCloudinary.action";
import { uploadImageAction } from "@/app/actions/crudPostActions/uploadImageActions/uploadImage.action";
import { PostSchema, PostSchemaZod } from "@/lib/schema/post.schema";
import { useStore } from "@/lib/store/index.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Clock, Image as ImageIcon, NotebookPen } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import BadgeButton from "../../UI/badgeButton/BadgeButton";
import CloseButton from "../../UI/CloseButton/CloseButton";
import LoadingUi from "../../UI/loadingUI/LoadingUi";
import PrimaryButton from "../../UI/primaryButton/PrimaryButton";
import PreviewImageUploaded from "../previewImageUploaded/PreviewImageUploaded";
import UploadImageButton from "../uploadImageButton/UploadImageButton";

// TYPE

const CreatePostModal = () => {
  // STORE ZUSTAND
  const userId = useStore((state) => state.userId);
  const username = useStore((state) => state.username); // Ajoutez cette ligne
  const profilImage = useStore((state) => state.image);
  const setIsCreatePostModalOpen = useStore(
    (state) => state.setIsCreatePostModalOpen
  );

  // state local
  const [postContent, setPostContent] = useState("");
  const [controlRules, setcontrolRules] = useState({ isContent: false });
  const [imageData, setImageData] = useState({ imageUrl: "", imageId: "" });

  // invalider les data post du user pour délenché un refetch et faire apparaître le nouveau post dans son feed grâçe à tanstack
  const queryClient = useQueryClient();

  //  Gérer la fermeture de la modale si on clique à l'extérieur
  const handleClickOutsideCloseModal = async (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      //Modif du state zustand pour fermer la modal
      setIsCreatePostModalOpen(false);
      // suppression de l'image sur cloudinary
      await deleteImageOnCloudinary(imageData.imageId);

    }
  };

  // TANSTACK action poster le post

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
      // on vide le state pour vider les infos preview de l'image
      setImageData({ imageUrl: "", imageId: "" });

      // déclenché un refetch du feed post de l'utilisateur dans sa sectino profil
      queryClient.invalidateQueries({ queryKey: ["posts", username] });
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
        imageUrl: `${imageData.imageUrl}`,
        imageId: `${imageData.imageId}`,
        published: true,
      };
      const validateData = PostSchema.parse(data);

      createPostMutation(validateData);
    }
  };

  // TANSTACK pour l'upload de l'image

  const { mutate: uploadImageMutation, isPending: isPendingUploadImage } =
    useMutation({
      mutationFn: async (formData: FormData) => {
        // on vide le state de l'image au cas ou l'user upload une 2ème fois pour nettoyer la previex image
        setImageData({ imageUrl: "", imageId: "" });

        // on appel le server action pour pousser l'image vers cloudinary
        const response = await uploadImageAction(formData);
        //on stock l'url et l'id de l'image dans le state pour pouvoir faire une preview
        setImageData({
          imageUrl: response.imageUrl,
          imageId: response.imageId,
        });
        // on invalide les data post du profil pour déclencher un nouveau fetch
        queryClient.invalidateQueries({ queryKey: ["posts", username] });
      },
    });

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
      className="fixed inset-0 w-full min-h-screen flex justify-center items-center bg-white/30 backdrop-blur-md text-textBlack "
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
                  placeholder="What's happening?"
                ></TextareaAutosize>

                {/* badges */}
                <ul className="flex justify-start gap-3">
                  <li>
                    <BadgeButton text="Schedule">
                      <Clock size={18} />
                    </BadgeButton>
                  </li>
                  <li>
                    <UploadImageButton
                      text="Image"
                      onImageUpload={uploadImageMutation}
                    >
                      <ImageIcon size={18} />
                    </UploadImageButton>
                  </li>
                </ul>
                {/* Preview uploaded image */}
                {isPendingUploadImage && (
                  <div className="h-52 w-52 flex items-center justify-center bg-skeletonGrey animate-pulse rounded-lg mt-2">
                    <LoadingUi text="Processing..." />
                  </div>
                )}

                {imageData.imageUrl && imageData.imageId && (
                  <div className="w-full h-full flex justify-start items-center mt-2">
                    <PreviewImageUploaded
                      imageUrl={imageData.imageUrl}
                      imageId={imageData.imageId}
                      onImageDelete={() =>
                        setImageData({ imageUrl: "", imageId: "" })
                      }
                    />
                  </div>
                )}
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
