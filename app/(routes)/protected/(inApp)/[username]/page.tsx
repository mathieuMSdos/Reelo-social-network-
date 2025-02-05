"use client";
import { searchUserInfoProfileAction } from "@/app/actions/searchEngineUser/searchUserInfoProfile.action";
import { useStore } from "@/lib/store/index.store";
import FeedProfileColumn from "@/src/components/CRUD components/feedProfile/FeedProfileColumn";
import SkeletonPost from "@/src/components/CRUD components/feedProfile/postProfileItem/SkeletonPost";
import RightMenuApp from "@/src/components/leftMenuApp/rightMenuApp/RightMenuApp";
import ProfileBanner from "@/src/components/profileBanner/ProfileBanner";
import { UserPublicDataType } from "@/src/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect, useMemo, useState } from "react";
import SkeletonProfilBanner from "../../../../../src/components/profileBanner/SkeletonProfilBanner";

interface PageParamsType {
  params: Promise<{
    username: string;
  }>;
}

const Page = ({ params }: PageParamsType) => {
  // StateLocal

  const [isMyOwnProfile, setIsMyOwnProfile] = useState(false);

  // on récupère le username en paramètre de l'url
  const { username } = use(params);

  // ZUSTAND : on récupère l'username de l'utilisateur connecté
  const userId = useStore((state) => state.userId);
  const myUserName = useStore((state) => state.username);

  // UseMemo pour decoder l'uri et faire réapparaître le @ devant username
  const decodedProfileUsername = useMemo(() => {
    return decodeURIComponent(username);
  }, [username]);

  // TANSTACK Récupération du profil de l'utilisateur consulté dans le cache de tanstack
  // on fait une query: si les données sont pas en cache, le fetch aura lieu, si les données ont été prefetch ça récupère le contenu dans le cache pour un affichage rapide
  const { data, isPending } = useQuery({
    queryKey: ["userProfile", decodedProfileUsername],
    queryFn: () => {
      if (!userId || !decodedProfileUsername)
        throw new Error("Required parameters missing");
      return searchUserInfoProfileAction(userId, decodedProfileUsername);
    },
    enabled: !!userId && !!decodedProfileUsername,
    staleTime: 1 * 1000 * 60,
  });

  useEffect(() => {
    if (decodedProfileUsername === myUserName) {
      setIsMyOwnProfile(true);
    }
  }, [decodedProfileUsername, myUserName]);

  return (
    <div className="w-full flex gap-20 justify-between min-h-screen  ">
      <div className=" flex flex-col gap-10 w-full min-w-56 max-w-screen-xl ">
        {isPending ? (
          <>
            <SkeletonProfilBanner />
            {Array.from({ length: 10 }, (_, index) => {
              return <SkeletonPost key={index} />;
            })}
          </>
        ) : (
          !isPending && data?.data &&(
            <>
              <ProfileBanner
                data={
                  data.data as UserPublicDataType & { alreadyFollowed: boolean }
                }
                isMyOwnProfile={isMyOwnProfile}
              />
              <FeedProfileColumn
                profileData={
                  data.data as UserPublicDataType & { alreadyFollowed: boolean }
                }
                isMyOwnProfile={isMyOwnProfile}
              />
            </>
          )
        )}
      </div>
      <div className="sticky top-0 shrink-0 w-full max-w-72 flex flex-col">
        <div className="w-full sticky top-0">
          <RightMenuApp />
        </div>
      </div>
    </div>
  );
};

export default Page;
