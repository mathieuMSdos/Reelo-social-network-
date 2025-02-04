import { prisma } from "@/prisma";

export const userAlreadyLikeThisPost = async (
  userId: string,
  idPost: string
) => {
  try {
    const response = await prisma.post.findFirst({
      where: {
        id: idPost,
        likedBy: {
          some: {
            id: userId,
          },
        },
      },
    });
// si la réponse contient quelque chose c'est que l'user à déjà liké ce post.
// Si il n'a jamais liké, prisma renvoie "null" donc falsy
    if (response) {
      return {
        message: "user already like this post",
        data: { isAlreadyLikeThisPost: true, postData: response },
      };
    
    } else {
      return {
        message: "user never like this post",
        data: { isAlreadyLikeThisPost: false, postData: response },
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("error:", { cause: error });
  }
};
