"use server";

import { auth } from "@/auth";
import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";
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
    // 1. mise à jour de user dans la BDD via prisma
    const updateUser = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        username: data.username,
        displayName: upperFirstLetterOfAString(data.displayName),
        hasCompletedOnboarding: data.hasCompletedOnboarding,
      },
    });

    // 2. Comme on vient de modifier les data de la session on refait une vérification de session au cas où
    const session = await auth();
    if (!session) {
      return {
        success: false,
        error: "No session found",
      };
    }
    return {
      success: true,
      user: updateUser,
    };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'utilisateur:" + error.message
    );
  }
};
