"use server";

import { checkExistingFollow } from "@/lib/utils/validation/following/checkExistingFollow";
import { checkUsersExist } from "@/lib/utils/validation/following/checkUsersExist";
import { checkSelfFollow } from "@/lib/utils/validation/following/checkSelfFollow";
import { prisma } from "@/prisma";

export const followAction = async (userID: string, userFollowedID: string) => {
  try {
    // permet de vérifier si l'utilisateur qui veux follow et l'utilisateur à follow exist bien en BDD
    const usersCheck = await checkUsersExist(userID, userFollowedID);
    if(!usersCheck?.data.existingUsers){return usersCheck }

    // Permet d'empêcher qu'un utilisateur s'autofollow
    const selfFollowCheck  = await checkSelfFollow(userID, userFollowedID);
    if (selfFollowCheck?.data.isSameUser) {
      return selfFollowCheck ;
    }

    // permet de vérifier si la relation follow existe déjà. pour empêcher qu'un user follow un autre user plus d'1 fois.
    const existingFollowCheck = await checkExistingFollow(userID, userFollowedID)
    if(existingFollowCheck?.data.existingFollow) {return existingFollowCheck }

    // Si tout est ok alors on lance la transaction qui cotnient toute les opération nécessaire à un follow

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userID, },
        data: {
          followingCount: { increment: 1 },
          following: { connect: { id: userFollowedID } },
          
        },
      }),
      prisma.user.update({
        where: { id: userFollowedID },
        data: {
          followedByCount: { increment: 1 },
          followedBy: { connect: { id: userID } },
        },
      }),
    ]);

    return {
      success: true,
      message: "Follow successful",
      data: {
        followCounts: {
          following: true,
          followedBy: true,
        },
        connections: {
          following: true,
          followedBy: true,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Follow operation failed",
      error: error,
      data: null,
    };
  }
};
