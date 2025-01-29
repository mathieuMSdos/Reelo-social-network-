"use server";

import { isUserExist } from "@/lib/utils/validation/generic/isUserExist";
import { prisma } from "@/prisma";
import { isTryingToAutoLike } from "../../../lib/utils/validation/like/isTryingToAutoLike";

export const likePostAction = async (userId, idPost, authorId) => {
  try {
    // on vérifie si l'utilisateur qui veux like existe
    const checkUser = await isUserExist(userId);
    if (!checkUser.data.isUserExist) {
      console.log(checkUser);
      throw new Error("user doesn't exist");
    }

    // on vérifie que l'utilisateur n'essaye pas de liker un de ses propres post
    const checkAutoLike = await isTryingToAutoLike(userId, authorId);
    if (checkAutoLike.data.isTryingToAutoLike) {
      console.log(checkAutoLike);
      throw new Error("trying to autolike error");
    }

    // Si tout est ok on lance l'écriture en BDD via prisma

    const result = await prisma.post.update({
      where: { id: idPost },
      data: {
        likeCount: { increment: 1 },
        likedBy: { connect: { id: userId } },
      },
    });

    return {
      success: true,
      message: "like successful",
      data: {
        likeCount: {
          incrementLike: true,
          likedBy: true,
          info: result,
        },
      },
    };
  } catch (error) {
    throw new Error("message", error);
  }
};
