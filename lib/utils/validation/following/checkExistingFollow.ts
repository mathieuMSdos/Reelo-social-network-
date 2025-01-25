import { prisma } from "@/prisma";

export const checkExistingFollow = async (
  userID: string,
  userFollowedID: string
) => {
  const existingFollow = await prisma.user.findFirst({
    where: {
      id: userID,
      following: { some: { id: userFollowedID } },
    },
  });

  if (!existingFollow) {
    return {
      message: "Not already follow",
      data: {
        existingFollow: false,
      },
    };
  } else {
    return {
      message: "Already following this user",

      data: { existingFollow: true },
    };
  }
};
