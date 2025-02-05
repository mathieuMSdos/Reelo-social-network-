"use client";
import { useStore } from "@/lib/store/index.store";
import loadingIconLord from "@/src/assets/icons/system-solid-716-spinner-three-dots-hover-trapdoor.json";
import {
  QueryKeyOfFeedContext,
  QueryKeyType,
} from "@/src/contexts/QueryKeyOfFeedContext";
import { UserPublicDataType } from "@/src/types/user.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getProfilPostsAction } from "../../../../app/actions/crudPostActions/crudGetPost/getProfilPosts.action";
import GenericIcon from "../../UI/lordIcons/GenericIcon";
import PostProfileItem from "./postProfileItem/PostProfileItem";
import SkeletonPost from "./postProfileItem/SkeletonPost";

interface FeedPostColumnProps {
  profileData: UserPublicDataType & { alreadyFollowed: boolean };
  isMyOwnProfile: boolean;
}

const FeedProfileColumn = ({
  profileData,
  isMyOwnProfile,
}: FeedPostColumnProps) => {
  // État Zustand
  const userId = useStore((state) => state.userId);

  // CONTEXT : Clé dynamique pour optimistic update
  const queryKey: QueryKeyType = ["posts", profileData.username || ""];

  // Query infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getProfilPostsAction(profileData.id, pageParam, userId ?? ""),
    enabled: !!userId,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage?.hasMore) return null;
      return lastPageParam + 1;
    },
    staleTime: 1 * 1000 * 60, // Pas de rechargement sauf nouveau post
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Config intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px", // Déclenche le fetch avant d'atteindre l'observer
    triggerOnce: false, // Multiple déclenchements jusqu'à fin des posts
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  return (
    <QueryKeyOfFeedContext.Provider value={queryKey}>
      <div className="flex flex-col items-center justify-start w-full h-auto min-h-screen gap-1  ">
        {/* En-tête */}
        <div className="flex justify-between w-full mb-3">
          <h3 className="text-left text-xl font-bold text-darkLine ">
            {isMyOwnProfile ? "My Posts" : "Posts"}
          </h3>
        </div>
        <ul className="w-full min-h-screen flex flex-col gap-3">
          {/* Skeletons pendant le chargement */}
          {isPending ||
            (isFetching && (
              <>
                {Array.from({ length: 10 }, (_, index) => {
                  return <SkeletonPost key={index} />;
                })}
              </>
            ))}

          {/* États vides */}
          {!isPending && !isFetching && data?.pages[0]?.posts.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full mt-10 text-textGrey">
              {isMyOwnProfile ? (
                <>
                  <h2 className="text-xl font-bold mb-2">
                    You haven&apos;t posted anything yet
                  </h2>
                  <p className="text-sm">
                    When you post, it&apos;ll show up here.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2">
                    @{profileData.displayName} hasn&apos;t posted
                  </h2>
                  <p className="text-sm">
                    When they do, their posts will show up here.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Liste des posts */}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.posts.map((post) => (
                <li key={post.id}>
                  <PostProfileItem postData={post} />
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
        {/* Observer infinite scroll */}
        <div
          className="w-full h-20 py-3 px-10 flex justify-center items-center "
          ref={ref}
        >
          {isFetchingNextPage && (
            <GenericIcon icon={loadingIconLord} loop={true} />
          )}
          {!hasNextPage && data && data?.pages[0]?.posts?.length > 0 && (
            <p className="text-left font-bold text-textGrey">
              That&apos;s all for now!
            </p>
          )}
        </div>
      </div>
    </QueryKeyOfFeedContext.Provider>
  );
};

export default FeedProfileColumn;
