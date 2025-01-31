"use server";
import { userAlreadyLikeThisPost } from "@/lib/utils/validation/like/userAlreadyLikeThisPost";
import { prisma } from "../../../../prisma";

export const getProfilPostsAction = async (
  authorId: string,
  page: number,
  userId: string
) => {
  const limit = 10;
  const skip = page * limit;

  try {
    const posts = await prisma.post.findMany({
      where: { authorId },
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        likedBy: true,
      },
    });

    // permet de savoir si il reste des post à charger
    // si posts.length est différent de limit ça veux dire qu'on a pas fetch 10 post on a reçu moins.
    // si on a reçu moins c'est qu'il n'y a plus de post à fetch donc qu'on a atteind la fin des posts
    const hasMore = posts.length === limit;

    // ajouter l'info est ce que l'utilisateur connecté à liké ce post ou non
    const postsWithLikeStatus = await Promise.all(
      posts.map(async (post) => {
        const likeStatus = await userAlreadyLikeThisPost(userId, post.id);
        return {
          ...post,
          userAlreadyLikeThisPost: likeStatus.data.isAlreadyLikeThisPost,
        };
      })
    );

    // console.log(JSON.stringify(postsWithLikeStatus, null, 2));

    return {
      posts: postsWithLikeStatus,
      hasMore,
      nextPage: hasMore ? page + 1 : undefined,
    };
  } catch (error) {
    console.error("get profile post request", error);
    return {
      posts: [],
      hasMore: false,
      error: "Failed to fetch posts",
    };
  }
};
