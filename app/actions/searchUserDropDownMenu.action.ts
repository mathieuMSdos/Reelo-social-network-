"use server";
import { prisma } from "@/prisma";

export const searchUserDropDownMenu = async (
  searchQuery: string,
  userId: string
) => {
  const limit = 10;

  try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { startsWith: searchQuery, mode: "insensitive" } },
            { displayName: { startsWith: searchQuery, mode: "insensitive" } },
          ],
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
        take: limit,
      })

    // on ajoute l'info : est ce que je follow déjà cette personne ou non au return

    const userProfileCompleted = users.map((user) => ({
      ...user,
      alreadyFollowed: user.followedBy.length > 0,
      followedBy: undefined
    }));

    return userProfileCompleted;

  } catch (error) {
    console.log(error);
    return [];
  }
};
