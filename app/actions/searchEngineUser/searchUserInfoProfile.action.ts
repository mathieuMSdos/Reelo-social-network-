"use server";

import { prisma } from "@/prisma";

export const searchUserInfoProfileAction = async (
  userId: string,
  searchedUserID?: string,
  usernameProfile?: string
) => {
  try {
    const userSearched = await prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameProfile || undefined },
          { id: searchedUserID || undefined }
        ]
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        image: true,
        name: true,
        followedByCount: true,
        followingCount: true,
        createdAt: true,
        updatedAt: true,
        followedBy: {
          where: { id: userId },
          select: { id: true },
        },
      },
    });

    // on ajoute l'info : est ce que je follow déjà cette personne ou non au return
    //  on gère le cas où userSearched n'aurait rien donné
    if (userSearched) {
      const userProfileCompleted = {
        ...userSearched,
        alreadyFollowed: userSearched.followedBy.length > 0,
        followedBy: undefined,
      };
      return {
        success: true,
        data: userProfileCompleted,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
