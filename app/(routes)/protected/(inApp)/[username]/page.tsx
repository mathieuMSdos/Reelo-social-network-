"use client";
import { searchUserInfoProfileAction } from "@/app/actions/searchEngineUser/searchUserInfoProfile.action";
import { useStore } from "@/lib/store/index.store";
import FeedPostColumn from "@/src/components/CRUD components/feedPostColumn/feedPostColumn";
import RightMenuApp from "@/src/components/leftMenuApp/rightMenuApp/RightMenuApp";
import ProfileBanner from "@/src/components/profileBanner/ProfileBanner";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect, useMemo } from "react";

interface PageParamsType {
  params: Promise<{
    username: string;
  }>;
}

const Page = ({ params }: PageParamsType) => {
  // on récupère le username en paramètre de l'url
  const { username } = use(params);

  // UseMemo pour decoder l'uri et faire réapparaître le @ devant username
  const decodeUsername = useMemo(() => {
    return decodeURIComponent(username);
  }, [username]);

  //
  const userId = useStore((state) => state.userId);

  // TANSTACK Récupération du profil de l'utilisateur consulté dans le cache de tanstack
  // on fait une query: si les données sont pas en cache, le fetch aura lieu, si les données ont été prefetch ça récupère le contenu dans le cache pour un affichage rapide
  const { data, isPending, error } = useQuery({
    queryKey: ["userProfile", decodeUsername],
    queryFn: () => searchUserInfoProfileAction(userId, decodeUsername),
    enabled: !!userId, //déclenche le fetch que si userID est true
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log("isPending:", isPending);
  }, [isPending, decodeUsername]);

  return (
    <>
      {isPending
        ? "pending"
        : data && (
            <div className="w-full flex gap-20 justify-between min-h-screen ">
              <div className=" w-full min-w-56 max-w-screen-xl">
                <ProfileBanner data={data?.data} />
                <FeedPostColumn profilId={data.data.id} />
              </div>
              <div className="w-full max-w-64 bg-purple-100">
                <RightMenuApp />
              </div>
            </div>
          )}
    </>
  );
};

export default Page;
