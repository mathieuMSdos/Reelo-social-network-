"use server";
import { prisma } from "../../../../prisma";
import { GetProfilPostsShema } from '../../../../lib/schema/post.schema';

export const getProfilPosts = async (authorId: string, page: number) => {
  const limit = 10;
  const skip = page * limit;

  try {
    const posts = await prisma.post.findMany({
      where: { authorId },
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include:{
        author: true
      }
    });

    // permet de savoir si il reste des post à charger
    // si posts.length est différent de limit ça veux dire qu'on a pas fetch 10 post on a reçu moins.
    // si on a reçu moins c'est qu'il n'y a plus de post à fetch donc qu'on a atteind la fin des posts
    const hasMore = posts.length === limit;
    

    return { posts, hasMore }


  } catch (error) {
    console.log(error);
  }
};
