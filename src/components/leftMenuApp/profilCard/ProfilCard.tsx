"use client";
import { useStore } from "@/lib/store/index.store";
import { PenLine } from "lucide-react";
import Image from "next/image";
import BentoContainer from "../../bentoContainer/BentoContainer";

const ProfilCard = () => {
  const username = useStore((state) => state.username);
  const displayName = useStore((state) => state.displayName);
  const profilImage = useStore((state) => state.image);

  return (
    <BentoContainer className=" flex flex-col items-center w-full h-full min-h-16 rounded-lg">
      {/* Container de l'image de couverture qui s'adapte */}

      <div className="relative w-full h-16">
        <Image
          className="object-cover rounded-t-lg"
          src="/defaultCoverProfil/grainy_gradient_cover.jpg"
          fill
          alt="cover_image"
          priority
        />
      </div>
      {/* Avatar qui s'adapte avec des proportions */}
      <div className="absolute top-10 xl:top-9 mx-auto w-1/4 min-w-14 max-w-20 aspect-square  ">
        <Image
          className="rounded-full object-cover z-10"
          src={profilImage || "/default_avatar/default_avatar.png"}
          fill
          alt="profile_image"
        />
      </div>

      <div className=" relative w-full flex flex-col justify-center items-center pt-9 pb-5 px-2 ">
        {/* Bouton edit */}
        <button className="absolute w-fit top-0 right-0 py-1 px-3">
          <PenLine className="text-textGrey w-4" />
        </button>

        {/* Texte */}
        <div className=" flex flex-col gap-2 ">
          {/* identitité */}

          <div className="flex flex-col items-center -space-y-1">
            <p className="text-lg font-bold">{displayName}</p>
            <p className="text-xs text-textGrey ">{username}</p>
          </div>

          {/* Profil description */}

          <div>
            <p className="text-xs text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </BentoContainer>
  );
};

export default ProfilCard;
