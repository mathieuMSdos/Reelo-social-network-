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
      .slice(0, limit); // On prend seulement pageSize posts

    // ajouter l'info est ce que l'utilisateur connecté à liké ce post ou non
    const postsWithLikeStatus = await Promise.all(
      highScoredPostFirst.map(async (post) => {
        const likeStatus = await userAlreadyLikeThisPost(userId, post.id);
        return {
          ...post,
          userAlreadyLikeThisPost: likeStatus.data.isAlreadyLikeThisPost,
        };
      })
    );

    // Vérifier s'il y a plus de posts à charger
    const hasMore = postsWithScores.length > limit;

    // console.log(JSON.stringify(postsWithLikeStatus, null, 2));

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
