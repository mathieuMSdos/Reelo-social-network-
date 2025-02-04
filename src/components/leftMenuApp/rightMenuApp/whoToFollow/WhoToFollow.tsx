"use client";
import { suggestUsersAction } from "@/app/actions/whoToFollow/suggestUsers.action";
import { useStore } from "@/lib/store/index.store";
import BentoContainer from "@/src/components/bentoContainer/BentoContainer";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import SkeletonWhoToFollow from "./SkeletonWhoToFollow";

const WhoToFollow = () => {
  //ZUSTAND
  const userId = useStore((state) => state.userId);

  // TANSTACK pour récupérer suggestion de personnes à suivre
  const { data, isPending } = useQuery({
    queryKey: ["whoToFollow"],
    queryFn: async () => suggestUsersAction(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  return (
    <BentoContainer className=" flex flex-col w-full p-4 gap-4 text-darkLine">
      <h3 className="text-lg font-bold">Who to follow</h3>
      {/* 3 suggestions */}
      <div>
        <ul>
          {isPending ? (
            <div className="flex flex-col gap-2 px-3">
              <SkeletonWhoToFollow />
              <SkeletonWhoToFollow />
              <SkeletonWhoToFollow />
            </div>
          ) : (
            data &&
            data.suggestions.map((profileSuggested) => (
              <li
                className="w-full flex justify-between hover:bg-greyPurple py-2 px-2 rounded-lg  transition-all duration-150"
                key={profileSuggested.id}
              >
                <div className="flex gap-2">
                  <Image
                    className="rounded-full"
                    src={
                      profileSuggested.image ||
                      "/default_avatar/default_avatar.png"
                    }
                    width={38}
                    height={38}
                    alt="profil-picture"
                  />

                  <div className="hidden md:flex justify-center flex-col cursor-pointer">
                    <Link
                      key={profileSuggested.username}
                      href={`/protected/${profileSuggested.username}`}
                    >
                      <p className="text-sm font-bold">
                        {profileSuggested.displayName}
                      </p>

                      <p className="text-xs text-textGrey">
                        {profileSuggested.username}
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </BentoContainer>
  );
};

export default WhoToFollow;
