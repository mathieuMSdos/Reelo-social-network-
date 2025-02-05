"use server";

import { calculatePostScore } from "@/lib/utils/validation/feedScoreAlgorythm/calculatePostScore";
import { userAlreadyLikeThisPost } from "@/lib/utils/validation/like/userAlreadyLikeThisPost";
import { prisma } from "@/prisma";

export const getGeneralFeedPostsAction = async (
  userId: string,
  pageParam: number
) => {
  const postsPerUser = 15;
  const limit = 10;
  const skip = pageParam * limit;

  try {
    // Vérifier si l'utilisateur suit quelqu'un
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { followingCount: true }
    });

    if (user?.followingCount === 0) {
      // Récupérer les posts les plus likés
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

      const hasMore = topPosts.length === limit;

      return {
        posts: postsWithLikeStatus,
        hasMore,
        nextPage: hasMore ? pageParam + 1 : undefined,
      };
    }

    // Logic existante pour les utilisateurs qui suivent des gens
    const followedUsers = await prisma.user.findMany({
      where: { id: userId },
      select: {
        following: {
          select: {
            id: true,
            posts: {
              take: postsPerUser,
              skip: skip,
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

    const highScoredPostFirst = postsWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const postsWithLikeStatus = await Promise.all(
      highScoredPostFirst.map(async (post) => {
        const likeStatus = await userAlreadyLikeThisPost(userId, post.id);
        return {
          ...post,
          userAlreadyLikeThisPost: likeStatus.data.isAlreadyLikeThisPost,
        };
      })
    );

    const hasMore = postsWithScores.length > limit;

    return {
      posts: postsWithLikeStatus,
      hasMore,
      nextPage: hasMore ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch feed posts");
  }
};