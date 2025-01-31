"use client";
import { useStore } from "@/lib/store/index.store";
import loadingIconLord from "@/src/assets/icons/system-solid-716-spinner-three-dots-hover-trapdoor.json";
import { QueryKeyOfFeedContext } from "@/src/contexts/QueryKeyOfFeedContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getProfilPostsAction } from "../../../../app/actions/crudPostActions/crudGetPost/getProfilPosts.action";
import GenericIcon from "../../UI/lordIcons/GenericIcon";
import PostProfileItem from "./postProfileItem/PostProfileItem";
import SkeletonPost from "./postProfileItem/SkeletonPost";

interface FeedPostColumnProps {
  profilId: string;
  isMyOwnProfile: boolean;
}

const FeedProfileColumn = ({
  profilId,
  isMyOwnProfile,
}: FeedPostColumnProps) => {
  // zustand state
  const userId = useStore((state) => state.userId);

  // CONTEXT : Valeur à passer au context
  // Ca va nous permettre de rendre la clé dynamique et de la passer au sous composant like button qui doit faire des optimistic update avec le bon nom de clé
  const queryKey = ["posts", profilId];

  // TANSTACK  query infinite scroll pour le getPost
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
      getProfilPostsAction(profilId, pageParam, userId),
    enabled: !!userId,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage?.hasMore) return null;
      return lastPageParam + 1;
    },
    staleTime: Infinity // pas besoin de recharger ses propres post sauf qu'en l'user publie un post 

  });

  // Utilisation react-intersection-observer pour gérer le déclenchement des fetch post dans l'infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px", //permet de déclencher le nextpagefetch  avant d'atteindre l'observer
    triggerOnce: false, // false car on veut que ça se déclenche plusieurs fois jusqu'à ce qu'il n'y est plus de post
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <QueryKeyOfFeedContext.Provider value={queryKey}>
      <div className="flex flex-col items-center justify-start w-full h-auto min-h-screen gap-1  ">
        {/* header */}
        <div className="flex justify-between w-full mb-3">
          <h3 className="text-left text-xl font-bold text-darkLine ">
            {isMyOwnProfile ? "My Posts" : "Posts"}
          </h3>
        </div>
        <ul className="w-full min-h-screen flex flex-col gap-3 ">
          {/* afficher autant de skeleton post que ceux qu'on est en trian de fetch */}
          {isPending || isFetching && (
            <>
              {Array.from({ length: 10 }, (_, index) => {
                return <SkeletonPost key={index} />;
              })}
            </>
          )}
          {data &&
            data.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.posts.map((post) => (
                  <li key={post.id}>
                    <PostProfileItem postData={post} />
                  </li>
                ))}
              </React.Fragment>
            ))}
        </ul>
        {/* Obeserver pour délcencher le fetch des nouveaux post et créé l'effet infinite scroll */}
        {/* <BentoContainer className="w-full mt-3 "> */}
        <div
          className="w-full h-20 py-3 px-10 flex justify-center items-center "
          ref={ref}
        >
          {isFetchingNextPage && (
            <GenericIcon icon={loadingIconLord} loop={true} />
          )}
          {!hasNextPage && data?.pages[0]?.posts.length > 0 && (
            <p className="text-left font-bold text-textGrey">
              That's all for now!
            </p>
          )}
        </div>
      </div>
    </QueryKeyOfFeedContext.Provider>
  );
};

export default FeedProfileColumn;
