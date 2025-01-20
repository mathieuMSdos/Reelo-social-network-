"use client";
import { useStore } from "@/lib/store/index.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getProfilPosts } from "../../../../app/actions/crudPostActions/crudGetPost/getProfilPosts.action";
import BentoContainer from "../../bentoContainer/BentoContainer";
import PostProfileItem from "./postProfileItem/PostProfileItem";

const FeedPostColumn = () => {
  // zustand state
  const userId = useStore((state) => state.userId);

  // Setup Tanstack query infinite scroll pour le getPost
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", userId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getProfilPosts(userId, pageParam),
    enabled: !!userId,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage?.hasMore) return null;
      return lastPageParam + 1;
    },
  });

  // Utilisation react-intersection-observer pour gérer le déclenchement des fetch post dans l'infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px", //permet de déclencher le nextpagefetch légérement avant d'tteindre l'observer
    triggerOnce: false, // false car on veut que ça se déclenche plusieurs fois jusqu'à ce qu'il n'y est plus de post
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center justify-start w-full h-auto min-h-screen ">
      {/* header */}
      <div className="flex justify-between w-full py-3">
        <h3 className="text-left  font-bold text-darkLine ">Your Posts</h3>
      </div>
      <ul className="w-full min-h-screen flex flex-col gap-3 ">
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
      <BentoContainer className=" mt-6 ">
        <div className="w-full py-3 px-10 flex justify-center items-center " ref={ref}>
          {isFetchingNextPage && <p>Chargement...</p>}
          {!hasNextPage && data?.pages[0]?.posts.length > 0 && (
            <p className="text-left font-bold text-darkLine">That's all for now!</p>
          )}
        </div>
      </BentoContainer>
    </div>
  );
};

export default FeedPostColumn;
