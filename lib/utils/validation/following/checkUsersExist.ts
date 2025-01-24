import { prisma } from "@/prisma";

// permet de vérifier si l'utilisateur qui veux follow et l'utilisateur à follow exist bien en BDD

export const checkUsersExist = async (
  userID: string,
  userFollowedID: string
) => {
  const [user, userFollowed] = await prisma.$transaction([
    prisma.user.findUnique({ where: { id: userID } }),
    prisma.user.findUnique({ where: { id: userFollowedID } }),
  ]);

  if (user || userFollowed) { 
    return {
      success: true,
      message: "Users exist",
      data: { user, userFollowed }
     
    };
  }
  return {
    success: false,
    message: "Users don't exist",
    data: null
  };
};
