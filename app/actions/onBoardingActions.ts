"use server";

import { prisma } from "@/prisma";

// --------------------------------------------------

interface isExistObject {
  isExist: boolean;
  username: string | false;
}

export const isUsernameAlreadyExistAction = async (
  userToFind: string
): Promise<isExistObject> => {
  const isExist = await prisma.user.findUnique({
    where: { username: userToFind },
  });

  return {
    isExist: isExist != null,
    username: isExist?.username ? isExist?.username : false,
  };
};

// --------------------------------------------------

interface updateUserParams {
  userId: string;
  username: string;
  displayName: string;
  hasCompletedOnboarding: boolean;
}

export const updateUserAction = async (data: updateUserParams) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        username: data.username,
        displayName: data.displayName,
        hasCompletedOnboarding: data.hasCompletedOnboarding,
      },
    });

    return updateUser
    
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur:" + error.message)
  }
};
