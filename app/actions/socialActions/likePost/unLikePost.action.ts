"use server";

import { isUserExist } from "@/lib/utils/validation/generic/isUserExist";
import { userAlreadyLikeThisPost } from "@/lib/utils/validation/like/userAlreadyLikeThisPost";
import { prisma } from "@/prisma";

export const unlikePostAction = async (userId, idPost, authorId) => {
  try {
    // on vérifie si l'utilisateur qui veux unlike existe
    const checkUser = await isUserExist(userId);
    if (!checkUser.data.isUserExist) {
      console.log(checkUser);
      throw new Error("user doesn't exist");
    }


    // Un utilisateur ne peux unlike qu'un post qu'il a déjà liké donc on vérifie si il a déjà liké
    const checkAlreadyLikeThisPost = await userAlreadyLikeThisPost(
      userId,
      idPost
    );
    if (!checkAlreadyLikeThisPost.data.isAlreadyLikeThisPost) {
      throw new Error("User never like this post");
    }

    // Si tout est ok on lance l'écriture en BDD via prisma

    const result = await prisma.post.update({
      where: { id: idPost },
      data: {
        likeCount: { decrement: 1 },
        likedBy: { disconnect: { id: userId } },
      },
    });

    return {
      success: true,
      message: "unlike successful",
      data: {
        likeCount: {
          incrementLike: true,
          likedBy: true,
          info: result,
        },
      },
    };
  } catch (error) {
    throw new Error(`Failed to unlike post: ${error.message}`);
  }
};
