"use client";
import { useStore } from "@/lib/store/index.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getProfilPosts } from "../../../../app/actions/crudPostActions/crudGetPost/getProfilPosts.action";
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

  // useEffect(() => {
  //   if (data) {
  //     // const validateData = GetPostSchemaArray.parse(data.pages[0].posts);
  //     console.log(data);
  //   }
  // }, [data]);

  return (
    <div className="flex flex-col gap-1 items-center justify-start w-full h-auto min-h-screen ">
      {/* header */}
      <div className="flex justify-between w-full">
        <h3 className="text-left">Your Post</h3>
      </div>
      <ul className="w-full min-h-screen flex flex-col gap-2 ">
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
    </div>
  );
};

export default FeedPostColumn;
