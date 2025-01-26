"use client"
import { followAction } from "@/app/actions/socialActions/following.actions";
import { useStore } from "@/lib/store/index.store";
import { UserPublicDataType } from "@/src/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { UserRoundPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import BentoContainer from "../bentoContainer/BentoContainer";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";

interface ProfileBannerProps {
  data: UserPublicDataType & { alreadyFollowed: boolean };
}

interface DataFollowType {
  userId: string;
  userFollowedID: string;
}

const ProfileBanner = ({ data }: ProfileBannerProps) => {
  //ZUSTAND info du profil user connecté
  const userId = useStore((state) => state.userId);
  // Infos du profil consulté
  const {
    createdAt: profileCreatedAt,
    displayName: profileDisplayName,
    followedByCount: profileFollowedByCount,
    followingCount: profileFollowingCount,
    id: userFollowedID,
    image: profileImage,
    name: profileName,
    username: profileUsername,
    alreadyFollowed,
  } = data;

  // TANSTACK follow action
  const {
    mutate: followMutation,
    isPending: followIsPending,
    error: followError,
  } = useMutation({
    mutationFn: ({ userId, userFollowedID }: DataFollowType) =>
      followAction(userId, userFollowedID),
    onMutate: () => {
      console.log("en cours");
    },
    onSuccess: (response) => {
      console.log("réussi");
      console.log(response);
      setToggle(true);
    },
    onError: (error) => console.log(error),
  });

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center gap-2">
      <BentoContainer className="w-full h-auto flex justify-between items-center p-4 overflow-hidden">
        <div className="flex justify-between items-center w-full gap-3">
          <div className="flex justify-center items-center flex-shrink-0 gap-3">
            <Image
              className="rounded-full"
              src={profileImage || "/default_avatar/default_avatar.png"}
              width={50}
              height={50}
              alt="profil-picture"
            />
            <div className=" flex-col justify-center ">
              <p className="font-bold">{profileDisplayName}</p>
              <p className="text-xs text-textGrey">{profileUsername}</p>
            </div>
          </div>
          {/* sépration */}
          <span className="mx-2 my-1 w-px self-stretch bg-skeletonGrey"></span>
          {/* sépration */}

          <div className="flex justify-center items-center flex-grow ">
            <p className="text-sm text-center">
              15 years • Founder & Designer at @ http://chocho.agency 💫
              Creation of landing page & Website for SaaS/Agency
            </p>
          </div>
          {/* sépration */}
          <span className="mx-2 my-1 w-px self-stretch bg-skeletonGrey"></span>
          {/* sépration */}

          <div className="flex justify-center items-center min-w-24 ">
            <PrimaryButton
              text="Follow"
              disabled={alreadyFollowed}
              onClick={() => followMutation({ userId, userFollowedID })}
            >
              <UserRoundPlus size={20} />
            </PrimaryButton>
          </div>
        </div>
      </BentoContainer>
      <div className="w-full h-auto flex justify-start">badge</div>
    </div>
  );
};

export default ProfileBanner;
