"use server";

import { checkExistingFollow } from "@/lib/utils/validation/following/checkExistingFollow";
import { checkUsersExist } from "@/lib/utils/validation/following/checkUsersExist";
import { prisma } from "@/prisma";

export const unfollowAction = async (
  userID: string,
  userToUnfollow: string
) => {
  try {
    // permet de vérifier si l'utilisateur qui veux unfollow et l'utilisateur à unfollow exist bien en BDD
    const usersCheck = await checkUsersExist(userID, userToUnfollow);
    if (!usersCheck?.data.existingUsers) {
      return usersCheck;
    }

    // permet de vérifier si la relation follow existe. On peu unfollow que si on follow
    const existingFollowCheck = await checkExistingFollow(
      userID,
      userToUnfollow
    );
    if (!existingFollowCheck?.data.existingFollow) {
      return existingFollowCheck;
    }

    // Si tout est ok alors on lance la transaction qui contient toute les opération nécessaire à un follow

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userID },
        data: {
          followingCount: { decrement: 1 },
          following: { disconnect: { id: userToUnfollow } },
        },
      }),
      prisma.user.update({
        where: { id: userToUnfollow },
        data: {
          followedByCount: { decrement: 1 },
          followedBy: { disconnect: { id: userID } },
        },
      }),
    ]);

    return {
      success: true,
      message: "unfollow successful",
      data: {
        followCounts: {
          following: false,  
          followedBy: false 
        },
        connections: {
          following: false,
          followedBy: false
        }
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "unfollow operation failed",
      error: error,
      data: null,
    };
  }
};
