"use server";

import { calculatePostScore } from "@/lib/utils/validation/feedScoreAlgorythm/calculatePostScore";
import { userAlreadyLikeThisPost } from "@/lib/utils/validation/like/userAlreadyLikeThisPost";
import { prisma } from "@/prisma";

export const getGeneralFeedPostsAction = async (
 userId: string,
 pageParam: number
) => {
 const limit = 10;
 const skip = pageParam * limit;

 try {
   const user = await prisma.user.findUnique({
     where: { id: userId },
     select: { followingCount: true }
   });

   if (user?.followingCount === 0) {
     const topPosts = await prisma.post.findMany({
       skip,
       take: limit,
       orderBy: {
         likeCount: 'desc'
       },
       include: {
         author: true,
         likedBy: true,
       }
     });

     const postsWithLikeStatus = await Promise.all(
       topPosts.map(async (post) => {
         const likeStatus = await userAlreadyLikeThisPost(userId, post.id);
         return {
           ...post,
           userAlreadyLikeThisPost: likeStatus.data.isAlreadyLikeThisPost,
         };
       })
     );

     return {
       posts: postsWithLikeStatus,
       hasMore: topPosts.length === limit,
       nextPage: topPosts.length === limit ? pageParam + 1 : undefined,
     };
   }

   const followedUsers = await prisma.user.findMany({
     where: { id: userId },
     select: {
       following: {
         select: {
           id: true,
           posts: {
             orderBy: {
               createdAt: "desc",
             },
             include: {
               author: true,
               likedBy: true,
             },
           },
         },
       },
     },
   });

   const allPosts = followedUsers
     .flatMap((user) => user.following)
     .flatMap((posts) => posts.posts);

   const postsWithScores = allPosts.map((post) => ({
     ...post,
     score: calculatePostScore(post),
   }));

   const sortedPosts = postsWithScores.sort((a, b) => b.score - a.score);
   const paginatedPosts = sortedPosts.slice(skip, skip + limit);

   const postsWithLikeStatus = await Promise.all(
     paginatedPosts.map(async (post) => {
       const likeStatus = await userAlreadyLikeThisPost(userId, post.id);
       return {
         ...post,
         userAlreadyLikeThisPost: likeStatus.data.isAlreadyLikeThisPost,
       };
     })
   );

   return {
     posts: postsWithLikeStatus,
     hasMore: sortedPosts.length > skip + limit,
     nextPage: sortedPosts.length > skip + limit ? pageParam + 1 : undefined,
   };

 } catch (error) {
   console.error(error);
   throw new Error("Failed to fetch feed posts");
 }
};