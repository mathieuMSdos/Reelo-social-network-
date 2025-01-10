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
    <BentoContainer className="relative flex flex-col items-center w-full h-full min-h-16 rounded-xl">
      {/* Container de l'image de couverture qui s'adapte */}
      <div className="relative w-full h-1/3 min-h-16">
        <Image
          className="object-cover rounded-t-xl"
          src="/defaultCoverProfil/grainy_gradient_cover.jpg"
          fill
          alt="cover_image"
          priority
        />
      </div>

      {/* Avatar qui s'adapte avec des proportions */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/5 min-w-10 max-w-16 aspect-square">
        <Image
          className="rounded-full object-cover"
          src={profilImage || "/default_avatar/default_avatar.png"}
          fill
          alt="profile_image"
        />
      </div>

      {/* Contenu qui s'adapte */}
      <div className="bg-red-500 w-full flex-1 p-3 sm:p-4">
        {/* Bouton edit qui s'adapte */}
        <button className="flex justify-end w-full">
          <PenLine className="text-textGrey w-5 sm:w-6" />
        </button>

        {/* Texte qui s'adapte */}
        <div className="flex flex-col items-center pt-2">
          <div className="flex flex-col items-center space-y-0.5">
            <p className="text-sm sm:text-base md:text-lg font-bold truncate max-w-[90%]">
              {displayName}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-textGrey truncate max-w-[90%]">
              {username}
            </p>
          </div>
        </div>
      </div>
    </BentoContainer>
  );
};

export default ProfilCard;